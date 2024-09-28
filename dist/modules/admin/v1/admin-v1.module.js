"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return AdminV1Module;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _sharedmodule = /*#__PURE__*/ _interop_require_default(require("../../shared/shared.module"));
const _blockchaintokenschema = require("./schemas/blockchain-token.schema");
const _blockchaintokenservice = /*#__PURE__*/ _interop_require_wildcard(require("./services/blockchain-token.service"));
const _blockchaintokenrepository = /*#__PURE__*/ _interop_require_wildcard(require("./repositories/blockchain-token.repository"));
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
let AdminV1Module = class AdminV1Module {
};
AdminV1Module = _ts_decorate([
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
                provide: _blockchaintokenservice.BLOCKCHAIN_SERVICE_TOKEN,
                useClass: _blockchaintokenservice.default
            },
            {
                provide: _blockchaintokenrepository.BLOCKCHAIN_REPOSITORY_TOKEN,
                useClass: _blockchaintokenrepository.default
            }
        ],
        exports: [
            _blockchaintokenservice.BLOCKCHAIN_SERVICE_TOKEN,
            _blockchaintokenrepository.BLOCKCHAIN_REPOSITORY_TOKEN
        ]
    })
], AdminV1Module);

//# sourceMappingURL=admin-v1.module.js.map