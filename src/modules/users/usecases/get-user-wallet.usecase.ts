import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import User from "../user.entity";
import { Repository } from "typeorm";

interface Input {
    loggedUserId: number;
}

export interface Output {
    accountAddress: string;
    privateKey: string;
    rewardTokenAddress: string;
    rewardToken: string;
    ether: string;
}

@Injectable()
export default class GetUserWalletUseCase implements IDefaultUseCase<Input, Output>{

    constructor(
        readonly blockchainService: BlockchainService,
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {}
    async execute({ loggedUserId }: Input): Promise<Output> {
        const user = await this.repository.findOne({ where: { id: loggedUserId }});
        if (!user) {
            throw new NotFoundException(`User with id ${loggedUserId} is not found`);
        }
        const { accountAddress, privateKey, rewardTokenAddress  } = user;

        const promises = await Promise.all([
            this.blockchainService.getBalanceByAddress(accountAddress),
            this.blockchainService.getBalanceInEtherFromAccountAddress(accountAddress)
        ]);

        return {
            accountAddress,
            privateKey,
            rewardTokenAddress,
            rewardToken: promises[0].toString(),
            ether: promises[1],
        };
    }

}