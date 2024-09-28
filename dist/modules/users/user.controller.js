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
const _createuserusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/create-user.usecase"));
const _userschema = require("./user.schema");
const _paginatordecorator = require("../../core/decorators/paginator.decorator");
const _Paginator = /*#__PURE__*/ _interop_require_default(require("../../core/models/Paginator"));
const _findallusersusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/find-all-users.usecase"));
const _authguard = /*#__PURE__*/ _interop_require_default(require("../auth/guards/auth.guard"));
const _roleguard = /*#__PURE__*/ _interop_require_default(require("../auth/guards/role.guard"));
const _allowrolesdecorator = require("../auth/decorators/allow-roles.decorator");
const _roletypeenum = require("../../core/enums/role-type.enum");
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
    async findAll(paginator) {
        return this._findAllUsersUseCase.execute(paginator);
    }
    async create(request) {
        return await this._createUserUseCase.execute(new _userschema.User(request));
    }
    constructor(_createUserUseCase, _findAllUsersUseCase){
        this._createUserUseCase = _createUserUseCase;
        this._findAllUsersUseCase = _findAllUsersUseCase;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_authguard.default, _roleguard.default),
    (0, _allowrolesdecorator.AllowRoles)(_roletypeenum.RoleType.ADMIN),
    (0, _common.Get)(),
    _ts_param(0, (0, _paginatordecorator.PaginatorDecorator)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _Paginator.default === "undefined" ? Object : _Paginator.default
    ]),
    _ts_metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.UsePipes)(_common.ValidationPipe),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createuserrequestdto.default === "undefined" ? Object : _createuserrequestdto.default
    ]),
    _ts_metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
UserController = _ts_decorate([
    (0, _common.Controller)({
        path: 'users',
        version: '1'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createuserusecase.default === "undefined" ? Object : _createuserusecase.default,
        typeof _findallusersusecase.default === "undefined" ? Object : _findallusersusecase.default
    ])
], UserController);

//# sourceMappingURL=user.controller.js.map