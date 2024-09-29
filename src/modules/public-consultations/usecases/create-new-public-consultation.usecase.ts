import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import isNull from "src/core/utils/is-null";
import User from "src/modules/users/user.entity";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

export type CreateNewPublicConsultationInput = {
    loggedUserId: number;
    title: string;
    description: string;
    initialDate: Date;
    imageUrl?: string;
    endDate: Date;
}

export type CreateNewPublicConsultationOutput = {
    id: number;
    title: string;
    imageUrl?: string;
    description: string;
    initialDate: Date;
    endDate: Date;
}

@Injectable()
export default class CreateNewPublicConsultationUseCase implements IDefaultUseCase<CreateNewPublicConsultationInput, CreateNewPublicConsultationOutput> {

    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>,
        @InjectRepository(User)
        private _userRepository: Repository<User>
    ) {}

    async execute(input: CreateNewPublicConsultationInput): Promise<CreateNewPublicConsultationOutput> {
       
        const user = await this._userRepository.findOne({ where: { id: input.loggedUserId }});

        if (isNull(user)) {
            throw new BadRequestException('Usuario nao encontrado.'); 
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

        const entity = await this._publicConsultationRepository.save({ 
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            initialDate: input.initialDate,
            endDate: input.endDate,
            user: {
                id: user.id,
            }
        });

        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            imageUrl: entity.imageUrl,
            initialDate: entity.initialDate,
            endDate: entity.endDate
        }
    }
}