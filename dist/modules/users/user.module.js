"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return UserModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _adminmodule = /*#__PURE__*/ _interop_require_default(require("../admin/admin.module"));
const _usecases = /*#__PURE__*/ _interop_require_default(require("./usecases"));
const _usercontroller = /*#__PURE__*/ _interop_require_default(require("./user.controller"));
const _userrepository = /*#__PURE__*/ _interop_require_default(require("./user.repository"));
const _userschema = require("./user.schema");
const _userrepositoryinterface = require("./interfaces/user-repository.interface");
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
let UserModule = class UserModule {
};
UserModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _usercontroller.default
        ],
        imports: [
            _adminmodule.default,
            _mongoose.MongooseModule.forFeature([
                {
                    name: _userschema.User.name,
                    schema: _userschema.UserSchema
                }
            ])
        ],
        providers: [
            ..._usecases.default,
            {
                provide: _userrepositoryinterface.USER_REPOSITORY_TOKEN,
                useClass: _userrepository.default
            }
        ],
        exports: [
            _userrepositoryinterface.USER_REPOSITORY_TOKEN
        ]
    })
], UserModule);

//# sourceMappingURL=user.module.js.map