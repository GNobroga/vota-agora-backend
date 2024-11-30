import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import isNull from "src/core/utils/is-null";
import User from "src/modules/users/user.entity";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

export type CreateNewPublicConsultationInput = {
    loggedUserId: number;
    title: string;
    description: string;
    imageUrl: string;
    endDate: Date;
    initialDate?: Date;
    category: string;
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

    private static readonly DATE_OFFSET = -3;

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

        const today = moment().utcOffset(CreateNewPublicConsultationUseCase.DATE_OFFSET);
        const endDate = moment(input.endDate).utcOffset(CreateNewPublicConsultationUseCase.DATE_OFFSET);

        if (!today.isValid() || !endDate.isValid()) {
            throw new BadRequestException('A data inicial e final precisam ser válidas.');
        }

        if (today.isBefore(today)) {
            throw new BadRequestException('A data inicial não pode ser inferior à data atual.');
        }

        if (today.isAfter(endDate)) {
            throw new BadRequestException('A data inicial não pode ser superior à data final.');
        }

        const entity = await this._publicConsultationRepository.save({ 
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            initialDate: input.initialDate ?? today.toDate(),
            endDate: endDate.toDate(),
            owner: user,
            category: input.category,
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