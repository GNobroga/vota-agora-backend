import { Inject, Injectable, NotFoundException } from "@nestjs/common";
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
        private readonly _userRepositoryToken: IUserRepository,
        @Inject(BLOCKCHAIN_SERVICE_TOKEN)
        private readonly _blockchainTokenService: IBlockchainTokenService,
        @InjectModel(PublicConsultationVote.name)
        private readonly _publicConsultationVoteModel: Model<PublicConsultationVote>
    ) {}


    async execute(input: RegisterVotePublicConsultationInput) {
        const user = await this._userRepositoryToken.findByDocument(input.userDocument);

        if (!user) {
            throw new NotFoundException(`Usuário com documento ${input.userDocument} não foi encontrado.`);
        }

        const publicConsultation = await this._publicConsultationRepository.findById(input.publicConsultationId);

        if (!publicConsultation) {
            throw new NotFoundException(`Consulta pública com identificação ${input.publicConsultationId} não foi encontrada.`);
        }
     
        const isRegistred = await this._blockchainTokenService.registerVote(user.accountAddress, input.publicConsultationId);
     
        if (!isRegistred) {
            return false;
        }
        
        await this._publicConsultationVoteModel.create({
            publicConsultation: new Types.ObjectId(input.publicConsultationId),
            user: new Types.ObjectId(user['_id'] as string), 
        });

        return true;
    }

}