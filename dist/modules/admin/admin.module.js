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
const _tokenaddressservice = /*#__PURE__*/ _interop_require_default(require("./services/token-address.service"));
const _mongoose = require("@nestjs/mongoose");
const _tokenaddressschema = require("./schemas/token-address.schema");
const _sharedmodule = /*#__PURE__*/ _interop_require_default(require("../shared/shared.module"));
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
                    name: _tokenaddressschema.TokenAddress.name,
                    schema: _tokenaddressschema.TokenAddressSchema
                }
            ]),
            _sharedmodule.default
        ],
        providers: [
            _tokenaddressservice.default
        ]
    })
], AdminModule);

//# sourceMappingURL=admin.module.js.map