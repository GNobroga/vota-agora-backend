import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PageRequest from "src/core/models/page-request";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";
import User from "src/modules/users/user.entity";

export type FindAllPublicConsultationInput = {
    loggedUserId: number;
    pageRequest: PageRequest;
}

export type FindAllPublicConsultationOutput = {
    id: number;
    title: string;
    ownerName: string;
    imageUrl?: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    category: string;
    status: 'open' | 'closed';
    voted?: boolean;
    owner?: boolean;
}

@Injectable()
export default class FindAllPublicConsultationUseCase implements IDefaultUseCase<FindAllPublicConsultationInput,  FindAllPublicConsultationOutput[]> {

    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>,
        @InjectRepository(User)
        private _userRepository: Repository<User>,
        private _blockchainService: BlockchainService
    ) {}


    async execute({ loggedUserId, pageRequest }: FindAllPublicConsultationInput): Promise<FindAllPublicConsultationOutput[]> {
        const outputs: FindAllPublicConsultationOutput[] = [];
        const entities = await this._publicConsultationRepository.find({
            skip: (pageRequest.page - 1) * pageRequest.size,
            take: pageRequest.size,
            order: {
                id: pageRequest.sort,
            },
            relations: ['owner'],
        });

        const loggedUser = await this._userRepository.findOneBy({ id: loggedUserId });

        for (const entity of entities) {
            const output = this.mapEntityToOutput(entity)
            if (entity.owner.id !== loggedUserId) {
                output.voted = await this.loggedUserHasVoted(loggedUser.accountAddress, entity.id);
            } else {
                output.owner = true;
            }
            outputs.push(output);
        }

        return outputs;
    }

    private mapEntityToOutput(entity: PublicConsultation): FindAllPublicConsultationOutput {
        return {
            id: entity.id,
            title: entity.title,
            ownerName: entity.owner.fullName,
            description: entity.description,
            endDate: entity.endDate,
            initialDate: entity.initialDate,
            imageUrl: entity.imageUrl,
            category: entity.category,
            status: entity.status,
        };
    }

    private async loggedUserHasVoted(accountAddress: string, publicConsultationId: number) {
       return await this._blockchainService.hasVoted(accountAddress, publicConsultationId);
    }
}