import { Inject, Injectable } from "@nestjs/common";
import Paginator from "src/core/models/Paginator";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import UserResponseDTO from "../dtos/response/user-response.dto";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "../interfaces/user-repository.interface";
import { BLOCKCHAIN_SERVICE_TOKEN, IBlockchainTokenService } from "src/modules/admin/interfaces/blockchain-token-service.interface";

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
            console.log(userRest)
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