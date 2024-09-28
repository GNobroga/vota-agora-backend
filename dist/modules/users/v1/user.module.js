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
const _userrepository = /*#__PURE__*/ _interop_require_wildcard(require("./user.repository"));
const _createuserusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/create-user.usecase"));
const _usercontroller = /*#__PURE__*/ _interop_require_default(require("./user.controller"));
const _mongoose = require("@nestjs/mongoose");
const _userschema = require("./user.schema");
const _adminmodule = /*#__PURE__*/ _interop_require_default(require("../../admin/admin.module"));
const _findallusersusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/find-all-users.usecase"));
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
            _createuserusecase.default,
            _findallusersusecase.default,
            {
                provide: _userrepository.USER_REPOSITORY_TOKEN,
                useClass: _userrepository.default
            }
        ]
    })
], UserModule);

//# sourceMappingURL=user.module.js.map