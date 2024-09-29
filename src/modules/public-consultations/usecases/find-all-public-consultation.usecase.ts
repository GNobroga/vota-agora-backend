import { InjectRepository } from "@nestjs/typeorm";
import PageRequest from "src/core/models/page-request";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import isNull from "src/core/utils/is-null";
import { Repository } from "typeorm";
import PublicConsultationVote from "../entities/public-consultation-vote.entity";
import PublicConsultation from "../entities/public-consultation.entity";
import { Injectable } from "@nestjs/common";

export type FindAllPublicConsultationInput = {
    loggedUserId: number;
    pageRequest: PageRequest;
}

export type FindAllPublicConsultationOutput = {
    id: number;
    title: string;
    imageUrl?: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    voted?: boolean;
}

@Injectable()
export default class FindAllPublicConsultationUseCase implements IDefaultUseCase<FindAllPublicConsultationInput,  FindAllPublicConsultationOutput[]> {

    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>,
        @InjectRepository(PublicConsultationVote)
        private _publicConsultationVoteRepository: Repository<PublicConsultationVote>,
    ) {}


    async execute({ loggedUserId, pageRequest }: FindAllPublicConsultationInput): Promise<FindAllPublicConsultationOutput[]> {
        const outputs: FindAllPublicConsultationOutput[] = [];
        const entities = await this._publicConsultationRepository.find({
            skip: (pageRequest.page - 1) * pageRequest.size,
            take: pageRequest.size,
            order: {
                id: pageRequest.sort,
            }
        });

        for (const entity of entities) {
            const output = this.mapEntityToOutput(entity)
            output.voted = await this.loggedUserHasVoted(entity.id, loggedUserId);
            outputs.push(this.mapEntityToOutput(entity))
        }

        return outputs;
    }

    private mapEntityToOutput(entity: PublicConsultation): FindAllPublicConsultationOutput {
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            endDate: entity.endDate,
            initialDate: entity.initialDate,
            imageUrl: entity.imageUrl,
        };
    }

    private async loggedUserHasVoted(publicConsultationVoteId: number, userId: number) {
        const entity = await this._publicConsultationVoteRepository.findOneBy({ 
            user: {
                id: userId,
            },
            publicConsultation: {
                id: publicConsultationVoteId,
            }
        });
        return !isNull(entity);
    }
}