import { Injectable, OnModuleInit } from "@nestjs/common";
import { Model } from "mongoose";
import AppConfig from "src/modules/shared/app.config";
import { TokenAddress } from "../schemas/token-address.schema";
import { InjectModel } from "@nestjs/mongoose";
import Web3 from "web3";
import contractOutputConfig from "src/config/blockchain/contract-output.config";

@Injectable()
export default class TokenAddressService implements OnModuleInit {

    private _web3: Web3;

    get web3() {
        return this._web3;
    }

    constructor(
        @InjectModel(TokenAddress.name)
        private readonly _tokenModel: Model<TokenAddress>,
        private readonly _appConfig: AppConfig) {}
    

    async onModuleInit() {
        const blockChainUrl = this._appConfig.getBlockchainURL();
        this._web3 = new Web3(new Web3.providers.HttpProvider(blockChainUrl));
        const { abi, evm } = contractOutputConfig as any;

        const tokenAddressRecovered = (await this._tokenModel.findOne())?.toObject();
    
        if (tokenAddressRecovered?.tokenAddress && (await this.checkToken(abi, tokenAddressRecovered.tokenAddress))) {
            return;
        } 
       
        await this._tokenModel.deleteMany();
      
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

        const tokenAddress = new TokenAddress({
            tokenAddress: result.options.address,
            accountAddress: account,
        });

        (await this._tokenModel.create(tokenAddress)).save();
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