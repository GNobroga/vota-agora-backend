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
    BLOCKCHAIN_REPOSITORY_TOKEN: function() {
        return BLOCKCHAIN_REPOSITORY_TOKEN;
    },
    default: function() {
        return BlockchainTokenRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _mongoose1 = require("mongoose");
const _blockchaintokenschema = require("../schemas/blockchain-token.schema");
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
const BLOCKCHAIN_REPOSITORY_TOKEN = 'IBlockchainTokenRepository';
let BlockchainTokenRepository = class BlockchainTokenRepository {
    async create(record) {
        return await (await this._tokenModel.create(record)).save();
    }
    async deleteAll() {
        await this._tokenModel.deleteMany();
        return true;
    }
    async findFirst() {
        try {
            const tokenAddress = (await this._tokenModel.findOne()).toObject();
            return tokenAddress;
        } catch (error) {
            return null;
        }
    }
    constructor(_tokenModel){
        this._tokenModel = _tokenModel;
    }
};
BlockchainTokenRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_blockchaintokenschema.BlockchainToken.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mongoose1.Model === "undefined" ? Object : _mongoose1.Model
    ])
], BlockchainTokenRepository);

//# sourceMappingURL=blockchain-token.repository.js.map