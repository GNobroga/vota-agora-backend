import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import isNull from "src/core/utils/is-null";
import { RoleType } from "src/modules/auth/role-type.enum";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";


export type UpdatePublicConsultationInput = {
    identifier: number;
    title: string;
    description: string;
    imageUrl?: string;
    loggedUserId: number;
    loggedUserRole: RoleType;
}

@Injectable()
export default class UpdatePublicConsultationUseCase implements IUnaryUseCase<UpdatePublicConsultationInput> {
    
    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>
    ) {}

    
    async execute(input: UpdatePublicConsultationInput): Promise<void> {
        const entity = await this._publicConsultationRepository.findOne({
            where: {
                id: input.identifier,
            },
            relations: ['owner'],
         });

        if (isNull(entity)) {
            throw new NotFoundException(`Não existe uma consulta pública com a identificação ${input.identifier}`);
        }

        const hasRoleAdmin = RoleType.ADMIN === input.loggedUserRole;

        if (hasRoleAdmin || entity.owner.id === input.loggedUserId) {
            entity.title = input.title;
            entity.description = input.description;
            entity.imageUrl = input.imageUrl;
            await this._publicConsultationRepository.save(entity);
        } else {
            throw new BadRequestException('Sem permissão para atualizar esse registro.');
        }
    }
    
}