import { Inject, Injectable } from "@nestjs/common";
import Paginator from "src/core/models/Paginator";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import { User } from "src/modules/users/user.schema";
import PublicConsultationResponseDTO from "../dtos/response/public-consultation-response.dto";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import PublicConsultationVote from "../schemas/public-consultation-vote.schema";
import { Model } from "mongoose";

@Injectable()
export default class FindAllPublicConsultationUseCase implements IDefaultUseCase<Paginator, PublicConsultationResponseDTO[]> {

    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository,
        @InjectModel(PublicConsultationVote.name)
        private readonly _publicConsultationVoteModel: Model<PublicConsultationVote>

    ) {}

    async execute(input: Paginator): Promise<PublicConsultationResponseDTO[]> {
        const result = (await this._publicConsultationRepository.findAll(input)).map(async src => {
            const owner = src.owner as User;
            
            return {
                id: src['_id'],
                title: src.title,
                description: src.description,
                initialDate: src.initialDate,
                endDate: src.endDate,
                imageUrl: src.imageUrl,
                voted: await this.hasVoted(owner['_id'], src['_id']),
                owner: {
                    id: owner['_id'],
                    fullName: owner.fullName,
                    document: owner.document,
                },
            };
        });

        return await Promise.all(result);
    }

    private async hasVoted(userId: string, publicConsultationId: string) {
        try {
           const result = this._publicConsultationVoteModel.findOne({
                publicConsultation: publicConsultationId,
                user: userId
            }).exec();
            (await result).toObject();
            return true;
        } catch {
            return false;
        }
    }
}