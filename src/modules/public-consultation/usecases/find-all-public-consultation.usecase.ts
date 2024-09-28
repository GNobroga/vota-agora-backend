import { Inject, Injectable } from "@nestjs/common";
import Paginator from "src/core/models/Paginator";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import { User } from "src/modules/users/user.schema";
import PublicConsultationResponseDTO from "../dtos/response/public-consultation-response.dto";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";

@Injectable()
export default class FindAllPublicConsultationUseCase implements IDefaultUseCase<Paginator, PublicConsultationResponseDTO[]> {

    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository,
    ) {}

    async execute(input: Paginator): Promise<PublicConsultationResponseDTO[]> {
        return (await this._publicConsultationRepository.findAll(input)).map(src => {
            const owner = src.owner as User;
            return {
                id: src['_id'],
                title: src.title,
                description: src.description,
                initialDate: src.initialDate,
                endDate: src.endDate,
                imageUrl: src.imageUrl,
                owner: {
                    id: owner['_id'],
                    fullName: owner.fullName,
                    document: owner.document,
                },
            }
        });
    }
}