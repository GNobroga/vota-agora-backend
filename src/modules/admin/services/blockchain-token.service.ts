import { Inject, Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import ganache, { EthereumProvider, ServerOptions } from "ganache";
import contractOutputConfig from "src/config/blockchain/contract-output.config";
import AppConfig from "src/modules/shared/app.config";
import Web3, { Contract } from "web3";
import WalletCreatedDTO from "../dtos/wallet-created.dto";
import { BLOCKCHAIN_REPOSITORY_TOKEN, IBlockchainTokenRepository } from "../interfaces/blockchain-token-repository.interface";
import { IBlockchainTokenService } from "../interfaces/blockchain-token-service.interface";
import { BlockchainToken } from "../schemas/blockchain-token.schema";

@Injectable()
export default class BlockchainTokenService implements OnModuleInit, IBlockchainTokenService {
    
    static readonly INITIAL_SUPPLY = 1000000000000000000000000n;
    static readonly GAS = '6721975';
    static readonly GAS_PRICE = '875000000';
    static readonly TOTAL_ACCOUNTS = 1;
    static readonly TOTAL_TOKEN_TO_SEND = 10n;

    readonly logger = new Logger(BlockchainTokenService.name);
 
    private _web3: Web3;

    private tokenContract: Contract<any>;

    get web3() {
        return this._web3;
    }

    constructor(
        @Inject(BLOCKCHAIN_REPOSITORY_TOKEN)
        private readonly _blockchainTokenRepository: IBlockchainTokenRepository,
        private readonly _appConfig: AppConfig
    ) {}

    async transferReward(toAddress: string): Promise<boolean> {
        try {
            const { accountAddress } = await this._blockchainTokenRepository.findFirst();

            await this.tokenContract.methods.transfer(toAddress, BlockchainTokenService.TOTAL_TOKEN_TO_SEND)
                .send({
                    from: accountAddress,
                });
                
            return true;
        } catch {
            return false;
        }
    }

    async transferEther(toAddress: string): Promise<boolean> {
        try {
            const { accountAddress, privateKey } = await this._blockchainTokenRepository.findFirst();
            const amountInWei = this._web3.utils.toWei(1000, 'ether');
            const tx = {
                from: accountAddress,
                to: toAddress,
                value: amountInWei,
                gas: BlockchainTokenService.GAS,
                gasPrice: BlockchainTokenService.GAS_PRICE,
            };

            const signed = await this._web3.eth.accounts.signTransaction(tx, privateKey);
            await this._web3.eth.sendSignedTransaction(signed.rawTransaction);
            return true;
        } catch {
            return false;
        }
    }


    async registerVote(address: string, publicConsultationId: string): Promise<boolean> {
       try {
            await this.tokenContract.methods.castVote(publicConsultationId)
                .send({ from: address });
            return true;
       } catch(error) {
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
            const SERVER_PORT = parseInt(this._appConfig.blockchainServerPORT);
            const options: ServerOptions = {
                wallet: {
                    defaultBalance: Number.MAX_SAFE_INTEGER,
                    totalAccounts: BlockchainTokenService.TOTAL_ACCOUNTS,
                },
            };
            const server = ganache.server(options);
            
            server.listen(SERVER_PORT, async err => {
                if (err) throw err;
                this.logger.log(`ganache listening on port ${SERVER_PORT}...`)
                const provider = server.provider;
                await this.startWeb3(provider);
            });

        } catch (error) {
            console.log(error);
        }
    }

    async startWeb3(provider: EthereumProvider) {
        this._web3 = new Web3(provider);
        const { abi, evm } = contractOutputConfig as any;
        
        await this._blockchainTokenRepository.deleteAll();
    
        let accounts: string[] = [];
        accounts = await this._web3.eth.getAccounts();

        if (!accounts.length) {
            this.logger.warn('Não há nenhuma conta padrão cadastrada.');
            return;
        }

        const account = accounts[0];
        const accountInfo = provider.getInitialAccounts()[account.toLowerCase()];
        const result = await new this._web3.eth.Contract(abi)

        .deploy({ data: evm.bytecode.object, arguments: [BlockchainTokenService.INITIAL_SUPPLY] })
        .send({
            from: account,
            gas: BlockchainTokenService.GAS,
            gasPrice: BlockchainTokenService.GAS_PRICE,
        });

        const blockchainToken = new BlockchainToken({
            tokenAddress: result.options.address,
            accountAddress: account,
            privateKey: accountInfo.secretKey,
        });

        await this._blockchainTokenRepository.create(blockchainToken);

        this.tokenContract = new this._web3.eth.Contract(abi, blockchainToken.tokenAddress);
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