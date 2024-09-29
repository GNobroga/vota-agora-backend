import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import { Repository } from "typeorm";
import User from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import isNull from "src/core/utils/is-null";
import { RoleType } from "src/modules/auth/role-type.enum";
import cleanTextToNumbers from "src/core/utils/clean-text-to-numbers";

export type CreateNewUserInput = {
    fullName: string;
    document: string;
    password: string;
}

export type CreateNewUserOutput = {
    id: number;
    fullName: string;
    document: string;
    accountAddress: string;
    privateKey: string;
}

@Injectable()
export default class CreateNewUserUseCase implements IDefaultUseCase<CreateNewUserInput, CreateNewUserOutput> {

    private _logger = new Logger(CreateNewUserUseCase.name);

    constructor(
        private _blockchainService: BlockchainService,
        @InjectRepository(User)
        private _userRepository: Repository<User>
    ) {}

    async execute(input: CreateNewUserInput): Promise<CreateNewUserOutput> {
        input.document = cleanTextToNumbers(input.document);

        const entity = await this._userRepository.findOneBy({ document: input.document });

        if (!isNull(entity)) {
            throw new BadRequestException(`O documento ${input.document} não está disponível.`);
        }

        const accountInfo = await this._blockchainService.createNewAccount();
        
        const user = await this._userRepository.save({
            ...input,
            password: await bcrypt.hash(input.password, 10),
            accountAddress: accountInfo.accountAddress,
            privateKey: accountInfo.privateKey,
            role: RoleType.ADMIN,
        });

        await this._blockchainService.transferEther(accountInfo.accountAddress);

        this._logger.log(`Usuário com carteira ${accountInfo.accountAddress} foi criado com sucesso.`);

        return {
            id: user.id,
            fullName: user.fullName,
            document: user.document,
            accountAddress: user.accountAddress,
            privateKey: user.privateKey,
        };
    }
}