import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import isNull from "src/core/utils/is-null";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import User from "src/modules/users/user.entity";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";
import VoteCount from "../entities/vote-count.entity";
import Vote from "../entities/vote-count.entity";

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
        private _blockchainService: BlockchainService,
        @InjectRepository(User)
        private _userRepository: Repository<User>,
        @InjectRepository(VoteCount)
        private _voteRepository: Repository<Vote>,
    ) {}


    async execute(input: RegisterVotePublicConsultationInput): Promise<RegisterVotePublicConsultationOutput> {
        const publicConsultation = await this._publicConsultationRepository.findOne({
            where: {
                id: input.publicConsultationId,
            },
            relations: ['owner'],
        });

        if (publicConsultation.status === 'closed') {
            throw new BadRequestException('Não é possível votar em uma consulta pública fechada.');
        }
        
        if (isNull(publicConsultation)) {
            throw new BadRequestException('Consulta publica não encontrada.');
        }
 
        if (input.loggedUserId === publicConsultation.owner.id) {
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

        await this._voteRepository.save({
            publicConsultation,
            user: { id: input.loggedUserId, }
        });
    
        await Promise.all([
            this._blockchainService.transferReward(user.accountAddress),
            this._blockchainService.transferReward(publicConsultation.owner.accountAddress)
        ]);

        publicConsultation.participationCount++;

        await this._publicConsultationRepository.save(publicConsultation);

        return {
            result: true,
            message: 'Voto registrado'
        }
    }


}