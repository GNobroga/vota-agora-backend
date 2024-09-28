"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BLOCKCHAIN_SERVICE_TOKEN: function() {
        return BLOCKCHAIN_SERVICE_TOKEN;
    },
    default: function() {
        return BlockchainTokenService;
    }
});
const _common = require("@nestjs/common");
const _contractoutputconfig = /*#__PURE__*/ _interop_require_default(require("../../../../config/blockchain/contract-output.config"));
const _appconfig = /*#__PURE__*/ _interop_require_default(require("../../../shared/app.config"));
const _web3 = /*#__PURE__*/ _interop_require_default(require("web3"));
const _walletcreateddto = /*#__PURE__*/ _interop_require_default(require("../dtos/wallet-created.dto"));
const _blockchaintokenrepository = require("../repositories/blockchain-token.repository");
const _blockchaintokenschema = require("../schemas/blockchain-token.schema");
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
const BLOCKCHAIN_SERVICE_TOKEN = 'IBlockchainTokenService';
let BlockchainTokenService = class BlockchainTokenService {
    get web3() {
        return this._web3;
    }
    async findBalanceByAccountAddress(accountAddress) {
        try {
            return await this.tokenContract.methods.balanceOf(accountAddress).call();
        } catch (error) {
            return 0n;
        }
    }
    async createAccount() {
        if (!this._web3) {
            throw new _common.NotFoundException('Web3 is not configured.');
        }
        const account = this._web3.eth.accounts.create();
        const { tokenAddress } = await this._blockchainTokenRepository.findFirst();
        return new _walletcreateddto.default({
            accountAddress: account.address,
            privateKey: account.privateKey,
            tokenAddress
        });
    }
    async onModuleInit() {
        try {
            const blockChainUrl = this._appConfig.getBlockchainURL();
            this._web3 = new _web3.default(new _web3.default.providers.HttpProvider(blockChainUrl));
            const { abi, evm } = _contractoutputconfig.default;
            const tokenAddressRecovered = await this._blockchainTokenRepository.findFirst();
            if (tokenAddressRecovered?.tokenAddress && await this.checkToken(abi, tokenAddressRecovered.tokenAddress)) {
                this.tokenContract = new this._web3.eth.Contract(abi, tokenAddressRecovered.tokenAddress);
                return;
            }
            await this._blockchainTokenRepository.deleteAll();
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
            const blockchainToken = new _blockchaintokenschema.BlockchainToken({
                tokenAddress: result.options.address,
                accountAddress: account
            });
            await this._blockchainTokenRepository.create(blockchainToken);
            this.tokenContract = new this._web3.eth.Contract(abi, blockchainToken.tokenAddress);
        } catch (error) {
            console.log(error);
        }
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
    constructor(_blockchainTokenRepository, _appConfig){
        this._blockchainTokenRepository = _blockchainTokenRepository;
        this._appConfig = _appConfig;
    }
};
BlockchainTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_blockchaintokenrepository.BLOCKCHAIN_REPOSITORY_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blockchaintokenrepository.IBlockchainTokenRepository === "undefined" ? Object : _blockchaintokenrepository.IBlockchainTokenRepository,
        typeof _appconfig.default === "undefined" ? Object : _appconfig.default
    ])
], BlockchainTokenService);

//# sourceMappingURL=blockchain-token.service.js.map