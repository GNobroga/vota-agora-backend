import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PageRequest from "src/core/models/page-request";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import User from "src/modules/users/user.entity";
import { Raw, Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

export type FindAllPublicConsultationInput = {
    loggedUserId: number;
    accountAddress: string;
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
    createdAt: Date;
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


    async execute({ loggedUserId, pageRequest: { q, page, size, sort }, accountAddress, }: FindAllPublicConsultationInput): Promise<FindAllPublicConsultationOutput[]> {
        const outputs: FindAllPublicConsultationOutput[] = [];
        const likeQueries = [
            {
                title: Raw((alias) => `LOWER(${alias}) LIKE :q`, { q: `%${q.toLowerCase()}%` }),
            },
            {
                description: Raw((alias) => `LOWER(${alias}) LIKE :q`, { q: `%${q.toLowerCase()}%` }),
            },
        ];
        const where = (q && q.trim() !== '') ? likeQueries : undefined;
        const entities = await this._publicConsultationRepository.find({
            skip: (page - 1) * size,
            take: size,
            order: {
                id: sort,
            },
            relations: ['owner'],
            where,
        });


        for (const entity of entities) {
            const output = this.mapEntityToOutput(entity)
            output.owner = entity.owner.id === loggedUserId;
            if (!output.owner) {
                output.voted = await this.loggedUserHasVoted(accountAddress, entity.id);
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
            createdAt: entity.createdAt,
        };
    }

    private async loggedUserHasVoted(accountAddress: string, publicConsultationId: number) {
       return await this._blockchainService.hasVoted(accountAddress, publicConsultationId);
    }
}