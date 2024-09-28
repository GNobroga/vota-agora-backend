"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _adminmodule = /*#__PURE__*/ _interop_require_default(require("./modules/admin/admin.module"));
const _appconfig = /*#__PURE__*/ _interop_require_default(require("./modules/shared/app.config"));
const _sharedmodule = /*#__PURE__*/ _interop_require_default(require("./modules/shared/shared.module"));
const _usermodule = /*#__PURE__*/ _interop_require_default(require("./modules/users/user.module"));
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
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _sharedmodule.default,
            _mongoose.MongooseModule.forRootAsync({
                useFactory (appConfig) {
                    return {
                        uri: appConfig.getDatabaseURL()
                    };
                },
                inject: [
                    _appconfig.default
                ],
                imports: [
                    _sharedmodule.default,
                    _adminmodule.default,
                    _usermodule.default
                ]
            })
        ],
        controllers: []
    })
], AppModule);

//# sourceMappingURL=app.module.js.map