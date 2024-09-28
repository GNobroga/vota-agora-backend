import { ConflictException, Inject, Injectable } from "@nestjs/common";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "../user.repository";
import { User } from "../user.schema";
import { BLOCKCHAIN_SERVICE_TOKEN, IBlockchainTokenService } from "src/modules/admin/services/blockchain-token.service";
import UserWithAccountTokenResponseDTO from "../dtos/response/user-with-account-token-response.dto";

@Injectable()
export default class CreateUserUseCase implements IDefaultUseCase<User, UserWithAccountTokenResponseDTO> {
    
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: IUserRepository,
        @Inject(BLOCKCHAIN_SERVICE_TOKEN)
        private readonly _blockchainTokenService: IBlockchainTokenService
    ) {}
    
    async execute(input: User): Promise<UserWithAccountTokenResponseDTO> {
        input.document = input.document.replace(/\D/g, '');

        if ((await this._userRepository.findByDocument(input.document)) != null) {
            throw new ConflictException("O documento não está disponível.");
        }

        const { tokenAddress, accountAddress, privateKey } = await this._blockchainTokenService.createAccount();
        input.accountAddress = accountAddress;
        input.privateKey = privateKey;
   
        input = await this._userRepository.create(input);

        const response = new UserWithAccountTokenResponseDTO({
            id: input['_id'],
            fullName: input.fullName,
            document: input.document,
            tokenAddress,
            accessKey: privateKey,
        })
        return response;
    }

}