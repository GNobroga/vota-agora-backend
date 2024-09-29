import { ConflictException, Inject, Injectable, Logger } from "@nestjs/common";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import UserWithAccountTokenResponseDTO from "../dtos/response/user-with-account-token-response.dto";
import { User } from "../user.schema";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "../interfaces/user-repository.interface";
import { BLOCKCHAIN_SERVICE_TOKEN, IBlockchainTokenService } from "src/modules/admin/interfaces/blockchain-token-service.interface";
import { RoleType } from "src/core/enums/role-type.enum";
import * as bcrypt from 'bcrypt';

@Injectable()
export default class CreateUserUseCase implements IDefaultUseCase<User, UserWithAccountTokenResponseDTO> {

    private readonly _logger = new Logger(CreateUserUseCase.name);
    
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
        input.password = await bcrypt.hash(input.password, 10);
        input.role = RoleType.USER;
        input = await this._userRepository.create(input);

        if (await this._blockchainTokenService.transferEther(accountAddress)) {
            this._logger.log(`Transferencia de Ether para ${accountAddress} realizada com sucesso!`);
        } else {
            this._logger.log(`Não foi possível transferir de Ether para ${accountAddress}.`);
        }
        
        const response = new UserWithAccountTokenResponseDTO({
            id: input['_id'],
            fullName: input.fullName,
            document: input.document,
            tokenAddress,
            privateKey,
        })
        return response;
    }

}