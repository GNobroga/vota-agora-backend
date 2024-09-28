import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import moment from "moment";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";
import PublicConsultation from "../public-consultation.schema";
import { CreatePublicConsultationInput } from "./inputs/create-public-consultation.input";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "src/modules/users/interfaces/user-repository.interface";
import { Types } from "mongoose";

@Injectable()
export default class CreatePublicConsultationUseCase implements IUnaryUseCase<CreatePublicConsultationInput> {
    
    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository,
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: IUserRepository
    ) {}
    
    async execute(input: CreatePublicConsultationInput) {

        const user = await this._userRepository.findByDocument(input.userDocument);

        if (!user) {
            throw new BadRequestException(`Usuário com identificação ${input.userDocument} não encontrado.`);
        }

        const today = moment().startOf('day');
        const initialDate = moment(input.initialDate).startOf('day');
        const endDate = moment(input.endDate).startOf('day');

        if (initialDate.isBefore(today)) {
            throw new BadRequestException('A data inicial não pode ser inferior à data atual.');
        }

        if (initialDate.isAfter(endDate)) {
            throw new BadRequestException('A data inicial não pode ser superior à data final.');
        }
        console.log(user['_id']);
        await this._publicConsultationRepository.save(PublicConsultation.create(
            new Types.ObjectId(user['_id'] as string),
            input.title,
            input.description,
            input.initialDate,
            input.endDate,
        ));
    }


}