import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PageRequest from "src/core/models/page-request";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import { Repository } from "typeorm";
import User from "../user.entity";

export type UserOutput = {
    id: number;
    fullName: string;
    document: string;
    accountAddress: string;
    privateKey: string;
    rewardToken: string;
    rewardTokenAddress?: string;
};

@Injectable()
export default class FindAllUsersUseCase implements IDefaultUseCase<PageRequest, UserOutput[]> {
    
    constructor(
        private _blockchainService: BlockchainService,
        @InjectRepository(User)
        private _userRepository: Repository<User>
    ) {}
    
    async execute(input: PageRequest): Promise<UserOutput[]> {
        const users = await this._userRepository.find({
            skip: (input.page - 1) * input.size,
            take: input.size,
            order: {
                id: input.sort,
            }
        });

        const outputs = [] as UserOutput[];

        for (const user of users) {
            const balance = await this._blockchainService.getBalanceByAddress(user.accountAddress);
            const output = this.mapUserToOutput(user, balance);
            output.rewardTokenAddress = this._blockchainService.tokenInfo.tokenAddress;
            outputs.push(output);
        }

        return outputs;
    }

    private mapUserToOutput(user: User, balance: bigint): UserOutput {
        return {
            id: user.id,
            fullName: user.fullName,
            document: user.document,
            accountAddress: user.accountAddress,
            privateKey: user.privateKey,
            rewardToken: balance.toString(),
        }
    }


}