"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return TokenAddressService;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("mongoose");
const _appconfig = /*#__PURE__*/ _interop_require_default(require("../../shared/app.config"));
const _tokenaddressschema = require("../schemas/token-address.schema");
const _mongoose1 = require("@nestjs/mongoose");
const _web3 = /*#__PURE__*/ _interop_require_default(require("web3"));
const _contractoutputconfig = /*#__PURE__*/ _interop_require_default(require("../../../config/blockchain/contract-output.config"));
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let TokenAddressService = class TokenAddressService {
    get web3() {
        return this._web3;
    }
    async onModuleInit() {
        const blockChainUrl = this._appConfig.getBlockchainURL();
        this._web3 = new _web3.default(new _web3.default.providers.HttpProvider(blockChainUrl));
        const { abi, evm } = _contractoutputconfig.default;
        const tokenAddressRecovered = (await this._tokenModel.findOne())?.toObject();
        if (tokenAddressRecovered?.tokenAddress && await this.checkToken(abi, tokenAddressRecovered.tokenAddress)) {
            return;
        }
        await this._tokenModel.deleteMany();
        let accounts = [];
        accounts = await this._web3.eth.getAccounts();
        if (!accounts.length) return;
        const account = accounts[0];
        const INITIAL_SUPPLY = 1000000000000000000000000n;
        const result = await new this._web3.eth.Contract(abi).deploy({
            data: evm.bytecode.object,
            arguments: [
                INITIAL_SUPPLY
            ]
        }).send({
            from: account,
            gas: '1500000',
            gasPrice: '30000000000'
        });
        const tokenAddress = new _tokenaddressschema.TokenAddress({
            tokenAddress: result.options.address,
            accountAddress: account
        });
        (await this._tokenModel.create(tokenAddress)).save();
    }
    async checkToken(abi, tokenAddress) {
        try {
            const tokenContract = new this._web3.eth.Contract(abi, tokenAddress);
            await Promise.all([
                tokenContract.methods.name().call(),
                tokenContract.methods.symbol().call()
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }
    constructor(_tokenModel, _appConfig){
        this._tokenModel = _tokenModel;
        this._appConfig = _appConfig;
    }
};
TokenAddressService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose1.InjectModel)(_tokenaddressschema.TokenAddress.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mongoose.Model === "undefined" ? Object : _mongoose.Model,
        typeof _appconfig.default === "undefined" ? Object : _appconfig.default
    ])
], TokenAddressService);

//# sourceMappingURL=token-address.service.js.map