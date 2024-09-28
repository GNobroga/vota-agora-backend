import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";

@Injectable()
export default class DeletePublicConsultationUseCase implements IUnaryUseCase<string> {
    
    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository
    ) {}
    
    async execute(identifier: string) {
        const data = await this._publicConsultationRepository.findById(identifier);

        if (!data) {
            throw new NotFoundException(`Não existe consulta pública com a identificação ${identifier}`);
        }

        await this._publicConsultationRepository.deleteById(identifier);
    }


}