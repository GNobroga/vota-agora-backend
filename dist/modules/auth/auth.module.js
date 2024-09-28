"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return AuthModule;
    }
});
const _common = require("@nestjs/common");
const _usermodule = /*#__PURE__*/ _interop_require_default(require("../users/user.module"));
const _jwt = require("@nestjs/jwt");
const _sharedmodule = /*#__PURE__*/ _interop_require_default(require("../shared/shared.module"));
const _appconfig = /*#__PURE__*/ _interop_require_default(require("../shared/app.config"));
const _authservice = /*#__PURE__*/ _interop_require_default(require("./auth.service"));
const _authcontroller = /*#__PURE__*/ _interop_require_default(require("./auth.controller"));
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
let AuthModule = class AuthModule {
};
AuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _usermodule.default,
            _jwt.JwtModule.registerAsync({
                global: true,
                useFactory (appConfig) {
                    return {
                        secret: appConfig.jwtSecret,
                        signOptions: {
                            expiresIn: '24h'
                        }
                    };
                },
                imports: [
                    _sharedmodule.default
                ],
                inject: [
                    _appconfig.default
                ]
            })
        ],
        controllers: [
            _authcontroller.default
        ],
        providers: [
            _authservice.default
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map