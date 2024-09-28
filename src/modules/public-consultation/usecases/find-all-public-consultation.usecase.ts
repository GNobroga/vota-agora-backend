import Paginator from "src/core/models/Paginator";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import PublicConsultationResponseDTO from "../dtos/response/public-consultation-response.dto";
import { Inject, Injectable } from "@nestjs/common";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";

@Injectable()
export default class FindAllPublicConsultationUseCase implements IDefaultUseCase<Paginator, PublicConsultationResponseDTO[]> {

    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository
    ) {}

    async execute(input: Paginator): Promise<PublicConsultationResponseDTO[]> {
        return (await this._publicConsultationRepository.findAll(input)).map(src => {
            return {
                id: src['_id'],
                title: src.title,
                description: src.description,
                initialDate: src.initialDate,
                endDate: src.endDate,
                imageUrl: src.imageUrl,
            }
        });
    }
}