"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return UserController;
    }
});
const _common = require("@nestjs/common");
const _createuserrequestdto = /*#__PURE__*/ _interop_require_default(require("./dtos/request/create-user-request.dto"));
const _userrepository = /*#__PURE__*/ _interop_require_default(require("./user.repository"));
const _userschema = require("./user.schema");
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
let UserController = class UserController {
    create(request) {
        this._userRepository.create(new _userschema.User(request));
    }
    constructor(_userRepository){
        this._userRepository = _userRepository;
    }
};
_ts_decorate([
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createuserrequestdto.default === "undefined" ? Object : _createuserrequestdto.default
    ]),
    _ts_metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
UserController = _ts_decorate([
    (0, _common.Controller)({
        version: '1'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userrepository.default === "undefined" ? Object : _userrepository.default
    ])
], UserController);

//# sourceMappingURL=user.controller.js.map