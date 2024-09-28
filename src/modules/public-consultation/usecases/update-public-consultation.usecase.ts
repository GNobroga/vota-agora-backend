import { Inject, NotFoundException } from "@nestjs/common";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import UpdatePublicConsultationRequestDTO from "../dtos/request/update-public-consultation-request.dto";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";

export default class UpdatePublicConsultationUseCase implements IUnaryUseCase<UpdatePublicConsultationRequestDTO> {
    
    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository
    ) {}
    
    async execute(input: UpdatePublicConsultationRequestDTO) {

        const data = await this._publicConsultationRepository.findById(input.id);

        if (!data) {
            throw new NotFoundException(`Não há nenhuma consulta pública com a identificação ${input.id}`);
        }

        data.title = input.title;
        data.description = input.description;
        data.imageUrl ||= data.imageUrl; 
      
        await this._publicConsultationRepository.save(data);
    }
}