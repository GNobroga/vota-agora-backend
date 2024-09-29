import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import isNull from "src/core/utils/is-null";
import { RoleType } from "src/modules/auth/role-type.enum";
import User from "src/modules/users/user.entity";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

export type DeletePublicConsultationByIdInput = {
    identifier: number;
    loggedUserId: number; // Vou receber isso do usuário logado.
}

@Injectable()
export default class DeletePublicConsultationByIdUseCase implements IUnaryUseCase<DeletePublicConsultationByIdInput> {
    
    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>,
        @InjectRepository(User)
        private _userRepository: Repository<User>
    ) {}

    async execute(input: DeletePublicConsultationByIdInput): Promise<void> {
            const entity = await this._publicConsultationRepository.findOne({
                where: {
                    id: input.identifier,
                },
                relations: ['owner'],
             });

        if (isNull(entity)) {
            throw new NotFoundException(`Não existe uma consulta pública com a identificação ${input.identifier}`);
        }

        const user = await this._userRepository.findOneBy({ id: input.loggedUserId });

        if (!user) {
            throw new BadRequestException('Usuário não encontrado.');
        }

        const hasRoleAdmin = user.role === RoleType.ADMIN;

        if (hasRoleAdmin || entity.owner.document === user.document) {
            await this._publicConsultationRepository.delete({ id: entity.id });
        } else {
            throw new BadRequestException('Sem permissão para excluir esse registro.');
        }
    }
    
}