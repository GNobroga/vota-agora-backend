import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import { BLOCKCHAIN_SERVICE_TOKEN, IBlockchainTokenService } from "src/modules/admin/interfaces/blockchain-token-service.interface";
import { IPublicConsultationRepository, PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from "../interfaces/public-consultation-repository.interface";
import { RegisterVotePublicConsultationInput } from "./inputs/register-vote-public-consultation.input";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "src/modules/users/interfaces/user-repository.interface";
import PublicConsultationVote from "../schemas/public-consultation-vote.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export default class RegisterVotePublicConsultationUseCase implements IDefaultUseCase<RegisterVotePublicConsultationInput, boolean> {

    constructor(
        @Inject(PUBLIC_CONSULTATION_REPOSITORY_TOKEN)
        private readonly _publicConsultationRepository: IPublicConsultationRepository,
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: IUserRepository,
        @Inject(BLOCKCHAIN_SERVICE_TOKEN)
        private readonly _blockchainTokenService: IBlockchainTokenService,
        @InjectModel(PublicConsultationVote.name)
        private readonly _publicConsultationVoteModel: Model<PublicConsultationVote>
    ) {}


    async execute(input: RegisterVotePublicConsultationInput) {
        const user = await this._userRepository.findByDocument(input.userDocument);

        if (!user) {
            throw new NotFoundException(`Usuário com documento ${input.userDocument} não foi encontrado.`);
        }

        const publicConsultation = await this._publicConsultationRepository.findById(input.publicConsultationId);
        const publicConsultationOwner = await this._userRepository.findById(publicConsultation.owner.toString());

        // Se a consulta publica for do usuario em questão, ele não pode se auto votar.
        if (publicConsultation.owner.toString() == user['_id']) {
            throw new BadRequestException('Não é permitido o dono da consulta publica votar nela mesmo.');
        }

        if (!publicConsultation) {
            throw new NotFoundException(`Consulta pública com identificação ${input.publicConsultationId} não foi encontrada.`);
        }
     
        const isRegistred = await this._blockchainTokenService.registerVote(user.accountAddress, user.privateKey, input.publicConsultationId);
     
        if (!isRegistred) {
            return false;
        }

        await Promise.all([
            this._blockchainTokenService.transferReward(user.accountAddress),
            this._blockchainTokenService.transferReward(publicConsultationOwner.accountAddress)
        ]);
        
        await this._publicConsultationVoteModel.create({
            publicConsultation: new Types.ObjectId(input.publicConsultationId),
            user: new Types.ObjectId(user['_id'] as string), 
        });

        return true;
    }

}