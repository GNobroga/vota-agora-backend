import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import CreatePublicConsultationRequestDTO from "../dtos/request/create-public-consultation-request.dto";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";
import moment from "moment";
import PublicConsultation from "../public-consultation.schema";

@Injectable()
export default class CreatePublicConsultationUseCase implements IUnaryUseCase<CreatePublicConsultationRequestDTO> {
    
    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository
    ) {}
    
    async execute(input: CreatePublicConsultationRequestDTO) {
        const today = moment().startOf('day');
        const initialDate = moment(input.initialDate).startOf('day');
        const endDate = moment(input.endDate).startOf('day');

        if (initialDate.isBefore(today)) {
            throw new BadRequestException('A data inicial não pode ser inferior à data atual.');
        }

        if (initialDate.isAfter(endDate)) {
            throw new BadRequestException('A data inicial não pode ser superior à data final.');
        }

        await this._publicConsultationRepository.save(PublicConsultation.create(
            input.title,
            input.description,
            input.initialDate,
            input.endDate,
        ));
    }


}