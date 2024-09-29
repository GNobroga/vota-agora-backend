"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return AdminModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _sharedmodule = /*#__PURE__*/ _interop_require_default(require("../shared/shared.module"));
const _blockchaintokenrepositoryinterface = require("./interfaces/blockchain-token-repository.interface");
const _blockchaintokenserviceinterface = require("./interfaces/blockchain-token-service.interface");
const _blockchaintokenrepository = /*#__PURE__*/ _interop_require_default(require("./repositories/blockchain-token.repository"));
const _blockchaintokenschema = require("./schemas/blockchain-token.schema");
const _blockchaintokenservice = /*#__PURE__*/ _interop_require_default(require("./services/blockchain-token.service"));
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
let AdminModule = class AdminModule {
};
AdminModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _mongoose.MongooseModule.forFeature([
                {
                    name: _blockchaintokenschema.BlockchainToken.name,
                    schema: _blockchaintokenschema.TokenAddressSchema
                }
            ]),
            _sharedmodule.default
        ],
        providers: [
            {
                provide: _blockchaintokenserviceinterface.BLOCKCHAIN_SERVICE_TOKEN,
                useClass: _blockchaintokenservice.default
            },
            {
                provide: _blockchaintokenrepositoryinterface.BLOCKCHAIN_REPOSITORY_TOKEN,
                useClass: _blockchaintokenrepository.default
            }
        ],
        exports: [
            _blockchaintokenserviceinterface.BLOCKCHAIN_SERVICE_TOKEN,
            _blockchaintokenrepositoryinterface.BLOCKCHAIN_REPOSITORY_TOKEN
        ]
    })
], AdminModule);

//# sourceMappingURL=admin.module.js.map