"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Web3Service;
    }
});
const _common = require("@nestjs/common");
const _appconfig = /*#__PURE__*/ _interop_require_default(require("./modules/shared/app.config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Web3Service = class Web3Service {
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
    constructor(_appConfig){
        this._appConfig = _appConfig;
    }
};
Web3Service = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _appconfig.default === "undefined" ? Object : _appconfig.default
    ])
], Web3Service);

//# sourceMappingURL=web3.service.js.map