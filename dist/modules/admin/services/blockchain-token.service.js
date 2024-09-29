"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return BlockchainTokenService;
    }
});
const _common = require("@nestjs/common");
const _ganache = /*#__PURE__*/ _interop_require_default(require("ganache"));
const _contractoutputconfig = /*#__PURE__*/ _interop_require_default(require("../../../config/blockchain/contract-output.config"));
const _appconfig = /*#__PURE__*/ _interop_require_default(require("../../shared/app.config"));
const _web3 = /*#__PURE__*/ _interop_require_default(require("web3"));
const _walletcreateddto = /*#__PURE__*/ _interop_require_default(require("../dtos/wallet-created.dto"));
const _blockchaintokenrepositoryinterface = require("../interfaces/blockchain-token-repository.interface");
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
let BlockchainTokenService = class BlockchainTokenService {
    get web3() {
        return this._web3;
    }
    async transferReward(toAddress) {
        try {
            const { accountAddress } = await this._blockchainTokenRepository.findFirst();
            await this.tokenContract.methods.transfer(toAddress, BlockchainTokenService.TOTAL_TOKEN_TO_SEND).send({
                from: accountAddress
            });
            return true;
        } catch  {
            return false;
        }
    }
    async transferEther(toAddress) {
        try {
            const { accountAddress, privateKey } = await this._blockchainTokenRepository.findFirst();
            const amountInWei = this._web3.utils.toWei(1000, 'ether');
            const tx = {
                from: accountAddress,
                to: toAddress,
                value: amountInWei,
                gas: BlockchainTokenService.GAS,
                gasPrice: BlockchainTokenService.GAS_PRICE
            };
            const signed = await this._web3.eth.accounts.signTransaction(tx, privateKey);
            await this._web3.eth.sendSignedTransaction(signed.rawTransaction);
            return true;
        } catch  {
            return false;
        }
    }
    async registerVote(address, publicConsultationId) {
        try {
            await this.tokenContract.methods.castVote(publicConsultationId).send({
                from: address
            });
            return true;
        } catch (error) {
            return false;
        }
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
            const SERVER_PORT = parseInt(this._appConfig.blockchainServerPORT);
            const options = {
                wallet: {
                    defaultBalance: Number.MAX_SAFE_INTEGER,
                    totalAccounts: BlockchainTokenService.TOTAL_ACCOUNTS
                }
            };
            const server = _ganache.default.server(options);
            server.listen(SERVER_PORT, async (err)=>{
                if (err) throw err;
                this.logger.log(`ganache listening on port ${SERVER_PORT}...`);
                const provider = server.provider;
                await this.startWeb3(provider);
            });
        } catch (error) {
            console.log(error);
        }
    }
    async startWeb3(provider) {
        this._web3 = new _web3.default(provider);
        const { abi, evm } = _contractoutputconfig.default;
        await this._blockchainTokenRepository.deleteAll();
        let accounts = [];
        accounts = await this._web3.eth.getAccounts();
        if (!accounts.length) {
            this.logger.warn('Não há nenhuma conta padrão cadastrada.');
            return;
        }
        const account = accounts[0];
        const accountInfo = provider.getInitialAccounts()[account.toLowerCase()];
        const result = await new this._web3.eth.Contract(abi).deploy({
            data: evm.bytecode.object,
            arguments: [
                BlockchainTokenService.INITIAL_SUPPLY
            ]
        }).send({
            from: account,
            gas: BlockchainTokenService.GAS,
            gasPrice: BlockchainTokenService.GAS_PRICE
        });
        const blockchainToken = new _blockchaintokenschema.BlockchainToken({
            tokenAddress: result.options.address,
            accountAddress: account,
            privateKey: accountInfo.secretKey
        });
        await this._blockchainTokenRepository.create(blockchainToken);
        this.tokenContract = new this._web3.eth.Contract(abi, blockchainToken.tokenAddress);
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
        this.logger = new _common.Logger(BlockchainTokenService.name);
    }
};
BlockchainTokenService.INITIAL_SUPPLY = 1000000000000000000000000n;
BlockchainTokenService.GAS = '6721975';
BlockchainTokenService.GAS_PRICE = '875000000';
BlockchainTokenService.TOTAL_ACCOUNTS = 1;
BlockchainTokenService.TOTAL_TOKEN_TO_SEND = 10n;
BlockchainTokenService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_blockchaintokenrepositoryinterface.BLOCKCHAIN_REPOSITORY_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blockchaintokenrepositoryinterface.IBlockchainTokenRepository === "undefined" ? Object : _blockchaintokenrepositoryinterface.IBlockchainTokenRepository,
        typeof _appconfig.default === "undefined" ? Object : _appconfig.default
    ])
], BlockchainTokenService);

//# sourceMappingURL=blockchain-token.service.js.map