import { Injectable, Logger } from "@nestjs/common";
import loadContract from "blockchain/load-contract";
import ganache, { EthereumProvider, ServerOptions } from 'ganache';
import Web3, { Contract } from "web3";
import AppConfig from "../configs/app.config";

export type RegisterVote = {
    accountAddress: string;
    privateKey: string;
    publicConsultationId: number;
}

export type TokenInfo = {
    tokenAddress: string;
    accountAddress: string;
    privateKey: string;
};

export type AccountInfo = {
    accountAddress: string;
    privateKey: string;
    tokenAddress: string;
}

@Injectable()
export default class BlockchainService {

    static readonly INITIAL_SUPPLY = 1000000000000000000000000n;
    static readonly GAS = '6721975';
    static readonly GAS_PRICE = '875000000';
    static readonly ACCOUNTS = 1;
    static readonly REWARD_TOKEN_TO_SEND = BigInt(100) * BigInt(10 ** 18);
    static readonly ETHER_TO_NEW_ACCOUNT = 1000;
    static readonly DEFAULT_BALANCE = Number.MAX_SAFE_INTEGER;

    private _logger = new Logger(BlockchainService.name);
    private _web3: Web3;
    private _contract: Contract<any>;
    private _tokenInfo: TokenInfo;

    constructor(
        private _appConfig: AppConfig
    ) {}

    get tokenInfo() {
        return this._tokenInfo;
    }
    
    async createNewAccount(): Promise<AccountInfo> {
        const newAccount = this._web3.eth.accounts.create();
        const { tokenAddress } = this._tokenInfo;
        return {
            accountAddress: newAccount.address,
            privateKey: newAccount.privateKey,
            tokenAddress: tokenAddress,
        };
    }

    async getBalanceByAddress(address: string): Promise<bigint> {
        return await this._contract.methods.balanceOf(address).call();
    }

    async getBalanceInEtherFromAccountAddress(accountAddress: string): Promise<string> {
        try {
            const balanceWei = await this._web3.eth.getBalance(accountAddress);
            const balanceInEther =  this._web3.utils.fromWei(balanceWei, 'ether');
            return balanceInEther;
        } catch (error) {
            this._logger.error('Erro ao obter quantida de ethers para a conta: ', accountAddress);
        }
    }

    async hasVoted(accountAddress: string, publicConsultationId: number): Promise<boolean> {
        try {
            return await this._contract.methods.hasVoted(publicConsultationId)
                .call({ from: accountAddress });
        } catch (error) {
            this._logger.warn("Error checking vote status:", error);
           return false;
        }
    }
    
    async registerVote({ accountAddress, privateKey, publicConsultationId }: RegisterVote) {
        try {
            if (!this._web3.eth.accounts.wallet[accountAddress]) {
                this._web3.eth.accounts.wallet.add(privateKey);
            }
    
            await this._contract.methods
                .castVote(publicConsultationId)
                .send({ from: accountAddress, });
                
            this._logger.log(`Voto registrado para ${publicConsultationId} com sucesso.`);

            return true;
        } catch(error) {
            this._logger.log('Falha ao realizar voto');
            return false;
        }
    }

    async transferReward(targetAddress: string, value: bigint = BlockchainService.REWARD_TOKEN_TO_SEND): Promise<boolean> {
        try {
            const { accountAddress } = this._tokenInfo;

            await this._contract.methods
                .transfer(targetAddress, value)
                .send({ from: accountAddress });

            this._logger.log(`Transferencia de Reward para ${targetAddress} realizada com sucesso.`);
            return true;
        } catch {
            this._logger.log(`Falho o envio da Transferencia de Reward para ${targetAddress}.`);
            return false;
        }
    }

    async transferEther(targetAdress: string): Promise<boolean> {
        try {
            const { accountAddress, privateKey } = this._tokenInfo;
            const tx = {
                from: accountAddress,
                to: targetAdress,
                value: this._web3.utils.toWei(BlockchainService.ETHER_TO_NEW_ACCOUNT, 'ether'),
                gas: BlockchainService.GAS,
                gasPrice: BlockchainService.GAS_PRICE,
            };
            const signed = await this._web3.eth.accounts.signTransaction(tx, privateKey);
            await this._web3.eth.sendSignedTransaction(signed.rawTransaction);
            this._logger.log(`A carteira ${targetAdress} recebeu ethers inicias.`);
            return true;
        } catch {
            this._logger.log(`Falha ao enviar ethers inicias para ${targetAdress}.`);
            return false;
        }
    }

    async init(executeTask?: () => void) {
        const blockchainServerPort = parseInt(this._appConfig.blockchainServerPort);
        const options: ServerOptions = {
            wallet: {
                defaultBalance: BlockchainService.DEFAULT_BALANCE,
                totalAccounts: BlockchainService.ACCOUNTS,
            }
        };

        const server = ganache.server(options);

        server.listen(blockchainServerPort, async error => {
            if (error) throw error;
            this._logger.log(`Ganache server is open on port: ${blockchainServerPort}`);
            await this.startWeb3(server.provider);
            executeTask?.();
        });

    }

    async startWeb3(provider: EthereumProvider) {
        this._web3 = new Web3(provider);
        const { abi, evm } = await loadContract();
        const accounts = await this._web3.eth.getAccounts();
        if (!accounts.length) {
            throw new Error('Blockchainservice::startweb3 accounts precisa ter no mínimo uma conta.');
        }

        const accountAddress = accounts.at(0).toLowerCase();
        const accountInfo = provider.getInitialAccounts()[accountAddress];
        this._contract = new this._web3.eth.Contract(abi);

        const deployedContract = await this._contract
            .deploy({data: evm.bytecode.object, arguments: [BlockchainService.INITIAL_SUPPLY]})
            .send({ 
                from: accountAddress,
                gas: BlockchainService.GAS,
                gasPrice: BlockchainService.GAS_PRICE,
            });

        this._contract.options.address = deployedContract.options.address;

        this._tokenInfo = {
            accountAddress,
            privateKey: accountInfo.secretKey,
            tokenAddress: this._contract.options.address,
        };
    }
}