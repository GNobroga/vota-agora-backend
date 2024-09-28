import { Injectable, OnModuleInit } from "@nestjs/common";
import Web3 from "web3";
import AppConfig from "./modules/shared/app.config";

@Injectable()
export default class Web3Service implements OnModuleInit {

    private _web3: Web3;
    
    constructor(private readonly _appConfig: AppConfig) {}

    async onModuleInit() {
        // const blockChainUrl = this._appConfig.getBlockchainURL();
        // this._web3 = new Web3(new Web3.providers.HttpProvider(blockChainUrl));
        // const accounts = await this._web3.eth.getAccounts();
        // if (!accounts.length) return;
        // const account = accounts[0];
        // const INITIAL_SUPPLY = 1000000000000000000000000n;
        // const { abi, evm } = tokenCompile as any;
        // const result = await new this._web3.eth.Contract(abi)
        //     .deploy({ data: evm.bytecode.object, arguments: [INITIAL_SUPPLY] })
        //     .send({
        //         from: account,
        //         gas: '1500000',
        //         gasPrice: '30000000000',
        //     });

        // const tokenAddress = result.options.address; // Endereço do token
         
        // permite interagir com o contrato
        // const tokenContract = new this._web3.eth.Contract(abi, tokenAddress).methods.name().call();
            
        // ver o saldo
        // tokenContract.methods.balanceOf(account).call().then(console.log)

        // const newAccount = this._web3.eth.accounts.create();

        // console.log(newAccount.address)
        // console.log(newAccount.privateKey) // pegar essa chave e enviar pro usuario

    //     console.log("Token", tokenAddress)

    //     tokenContract.methods.
    //     transfer("0xcDb938BDc7B6954859097CdAb87cf21B4AA5076A", this._web3.utils.toWei('1000000', 'ether'))
    //     .send({ from: account })
    //     .then(console.log)
    //     .catch(console.log)

    //    setTimeout(() => {
    //     tokenContract.methods.balanceOf(account).call().then(console.log);
    //    }, 2000)


            // Ao executar a aplicação salvar o id do token e verificar se ele existe, se não existir criar.
    }
}