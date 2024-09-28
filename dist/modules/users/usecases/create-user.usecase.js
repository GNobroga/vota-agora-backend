"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CreateUserUseCase;
    }
});
const _common = require("@nestjs/common");
const _userwithaccounttokenresponsedto = /*#__PURE__*/ _interop_require_default(require("../dtos/response/user-with-account-token-response.dto"));
const _userrepositoryinterface = require("../interfaces/user-repository.interface");
const _blockchaintokenserviceinterface = require("../../admin/interfaces/blockchain-token-service.interface");
const _roletypeenum = require("../../../core/enums/role-type.enum");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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
let CreateUserUseCase = class CreateUserUseCase {
    async execute(input) {
        input.document = input.document.replace(/\D/g, '');
        if (await this._userRepository.findByDocument(input.document) != null) {
            throw new _common.ConflictException("O documento não está disponível.");
        }
        const { tokenAddress, accountAddress, privateKey } = await this._blockchainTokenService.createAccount();
        input.accountAddress = accountAddress;
        input.privateKey = privateKey;
        input.password = await _bcrypt.hash(input.password, 10);
        input.role = _roletypeenum.RoleType.USER;
        input = await this._userRepository.create(input);
        const response = new _userwithaccounttokenresponsedto.default({
            id: input['_id'],
            fullName: input.fullName,
            document: input.document,
            tokenAddress,
            accessKey: privateKey
        });
        return response;
    }
    constructor(_userRepository, _blockchainTokenService){
        this._userRepository = _userRepository;
        this._blockchainTokenService = _blockchainTokenService;
    }
};
CreateUserUseCase = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_userrepositoryinterface.USER_REPOSITORY_TOKEN)),
    _ts_param(1, (0, _common.Inject)(_blockchaintokenserviceinterface.BLOCKCHAIN_SERVICE_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userrepositoryinterface.IUserRepository === "undefined" ? Object : _userrepositoryinterface.IUserRepository,
        typeof _blockchaintokenserviceinterface.IBlockchainTokenService === "undefined" ? Object : _blockchaintokenserviceinterface.IBlockchainTokenService
    ])
], CreateUserUseCase);

//# sourceMappingURL=create-user.usecase.js.map