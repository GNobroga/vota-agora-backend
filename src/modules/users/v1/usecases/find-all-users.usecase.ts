import { Inject, Injectable } from "@nestjs/common";
import Paginator from "src/core/models/Paginator";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import UserResponseDTO from "../dtos/response/user-response.dto";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "../user.repository";
import { BLOCKCHAIN_SERVICE_TOKEN, IBlockchainTokenService } from "src/modules/admin/v1/services/blockchain-token.service";

@Injectable()
export default class FindAllUsersUseCase implements IDefaultUseCase<Paginator, UserResponseDTO[]> {
    
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: IUserRepository,
        @Inject(BLOCKCHAIN_SERVICE_TOKEN)
        private readonly _blockchainService: IBlockchainTokenService
    ) {}
    
    async execute(input: Paginator): Promise<UserResponseDTO[]> {
        const users = await this._userRepository.findAll(input);
        const response = [] as UserResponseDTO[];

        for (const { accountAddress, fullName, document, ...userRest} of users) {
            const balance = await this._blockchainService.findBalanceByAccountAddress(accountAddress);
            const userResponseDTO = new UserResponseDTO({
                balance,
                id: userRest['_id'],
                accountAddress,
                fullName,
                document,
            });
            response.push(userResponseDTO);
        }
        
        return response;
    }

}