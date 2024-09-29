import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import PublicConsultationVote from "../entities/public-consultation-vote.entity";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";
import isNull from "src/core/utils/is-null";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import User from "src/modules/users/user.entity";

export type RegisterVotePublicConsultationInput = {
    publicConsultationId: number;
    loggedUserId: number;
};

export type RegisterVotePublicConsultationOutput = {
    result: boolean;
    message: string;
}

@Injectable()
export default class RegisterVotePublicConsultationUseCase implements IDefaultUseCase<RegisterVotePublicConsultationInput, RegisterVotePublicConsultationOutput> {
    
    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>,
        @InjectRepository(PublicConsultationVote)
        private _publicConsultationVoteRepository: Repository<PublicConsultationVote>,
        private _blockchainService: BlockchainService,
        @InjectRepository(User)
        private _userRepository: Repository<User>
    ) {}


    async execute(input: RegisterVotePublicConsultationInput): Promise<RegisterVotePublicConsultationOutput> {
        const publicConsultation = await this._publicConsultationRepository.findOne({
            where: {
                id: input.publicConsultationId,
            },
            relations: ['owner'],
        });
        
        if (isNull(publicConsultation)) {
            throw new BadRequestException('Consulta publica não encontrada.');
        }

        if (input.loggedUserId !== publicConsultation.owner.id) {
            throw new BadRequestException('Não é permitido o dono da consulta publica votar nela mesmo.');
        }

        const user = await this._userRepository.findOneBy({ id: input.loggedUserId });

        const isRegistred = await this._blockchainService.registerVote({
                accountAddress: user.accountAddress,
                privateKey: user.privateKey,
                publicConsultationId: input.publicConsultationId
        });

        if (!isRegistred) {
            return {
                result: false,
                message: 'Não foi possível registrar o voto.'
            }
        }

        await Promise.all([
            this._blockchainService.transferReward(user.accountAddress),
            this._blockchainService.transferReward(publicConsultation.owner.accountAddress)
        ]);

        await this._publicConsultationVoteRepository.save({
            publicConsultation,
            user
        });

        return {
            result: true,
            message: 'Voto registrado'
        }
    }


}