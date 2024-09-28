import { Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import contractOutputConfig from "src/config/blockchain/contract-output.config";
import AppConfig from "src/modules/shared/app.config";
import Web3, { Contract } from "web3";
import WalletCreatedDTO from "../dtos/wallet-created.dto";
import { IBlockchainTokenService } from "../interfaces/blockchain-token-service.interface";
import { BLOCKCHAIN_REPOSITORY_TOKEN, IBlockchainTokenRepository } from "../interfaces/blockchain-token-repository.interface";
import { BlockchainToken } from "../schemas/blockchain-token.schema";

@Injectable()
export default class BlockchainTokenService implements OnModuleInit, IBlockchainTokenService {

    private _web3: Web3;

    private tokenContract: Contract<any>;

    get web3() {
        return this._web3;
    }

    constructor(
        @Inject(BLOCKCHAIN_REPOSITORY_TOKEN)
        private readonly _blockchainTokenRepository: IBlockchainTokenRepository,
        private readonly _appConfig: AppConfig) {}


    async registerVote(address: string, publicConsultationId: string): Promise<boolean> {
       try {
        console.log(address)
            await this.tokenContract.methods.castVote(publicConsultationId)
                .send({ from: address });
            return true;
       } catch(error) {
        console.log(error)
            return false;
       }
    }


    async findBalanceByAccountAddress(accountAddress: string): Promise<bigint> {
       try {
         return await this.tokenContract.methods.balanceOf(accountAddress).call();
       } catch(error) {
         return 0n;
       }
    }


    async createAccount(): Promise<WalletCreatedDTO> {
        if (!this._web3) {
            throw new NotFoundException('Web3 is not configured.');
        }
        const account = this._web3.eth.accounts.create();
        const { tokenAddress } = await this._blockchainTokenRepository.findFirst();
        
        return new WalletCreatedDTO({
            accountAddress: account.address,
            privateKey: account.privateKey,
            tokenAddress
        });
    }


    async onModuleInit() {
        try {
            const blockChainUrl = this._appConfig.blockchainURL;
            this._web3 = new Web3(new Web3.providers.HttpProvider(blockChainUrl));
            const { abi, evm } = contractOutputConfig as any;


            const tokenAddressRecovered = await this._blockchainTokenRepository.findFirst();
        
            if (tokenAddressRecovered?.tokenAddress && (await this.checkToken(abi, tokenAddressRecovered.tokenAddress))) {
                this.tokenContract = new this._web3.eth.Contract(abi, tokenAddressRecovered.tokenAddress);
                return;
            } 
        
            await this._blockchainTokenRepository.deleteAll();
        
            let accounts: string[] = [];
            accounts = await this._web3.eth.getAccounts();

            if (!accounts.length) return;
            const account = accounts[0];
            const INITIAL_SUPPLY = 1000000000000000000000000n;

            const result = await new this._web3.eth.Contract(abi)
            .deploy({ data: evm.bytecode.object, arguments: [INITIAL_SUPPLY] })
            .send({
                from: account,
                gas: '1500000',
                gasPrice: '30000000000',
            });

            const blockchainToken = new BlockchainToken({
                tokenAddress: result.options.address,
                accountAddress: account,
            });

            await this._blockchainTokenRepository.create(blockchainToken);
            this.tokenContract = new this._web3.eth.Contract(abi, blockchainToken.tokenAddress);
        } catch(error) {
            console.log(error); 
        }
    }
 
    async checkToken(abi: any, tokenAddress: string) {
        try {
            const tokenContract = new this._web3.eth.Contract(abi, tokenAddress);
            await Promise.all([tokenContract.methods.name().call(),  tokenContract.methods.symbol().call()]);
            return true;
        } catch (error) {
            return false;
        }
    }


}