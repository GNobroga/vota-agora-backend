"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return PublicConsultationController;
    }
});
const _common = require("@nestjs/common");
const _paginatordecorator = require("../../core/decorators/paginator.decorator");
const _roletypeenum = require("../../core/enums/role-type.enum");
const _Paginator = /*#__PURE__*/ _interop_require_default(require("../../core/models/Paginator"));
const _allowrolesdecorator = require("../auth/decorators/allow-roles.decorator");
const _authguard = /*#__PURE__*/ _interop_require_default(require("../auth/guards/auth.guard"));
const _roleguard = /*#__PURE__*/ _interop_require_default(require("../auth/guards/role.guard"));
const _createpublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/create-public-consultation.usecase"));
const _findallpublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/find-all-public-consultation.usecase"));
const _createpublicconsultationrequestdto = /*#__PURE__*/ _interop_require_default(require("./dtos/request/create-public-consultation-request.dto"));
const _authuserdecorator = require("../auth/decorators/auth-user.decorator");
const _authuserinterface = require("../auth/auth-user.interface");
const _updatepublicconsultationrequestdto = /*#__PURE__*/ _interop_require_default(require("./dtos/request/update-public-consultation-request.dto"));
const _updatepublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/update-public-consultation.usecase"));
const _deletepublicconsultationbyidusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/delete-public-consultation-by-id.usecase"));
const _registervotepublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./usecases/register-vote-public-consultation.usecase"));
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
let PublicConsultationController = class PublicConsultationController {
    async create(request, authUser) {
        console.log(authUser);
        await this._createPublicConsultationUseCase.execute({
            ...request,
            userDocument: authUser.document
        });
    }
    async update(request) {
        return await this._updatePublicConsultationUseCase.execute(request);
    }
    async deleteById(identifier) {
        return await this._deletePublicConsultationUseCase.execute(identifier);
    }
    async findAll(paginator) {
        return this._findAllPublicConsultationUsecase.execute(paginator);
    }
    async registerVote(publicConsultationId, authUser) {
        return await this._registerVotePublicConsultationUseCase.execute({
            publicConsultationId,
            userDocument: authUser.document
        });
    }
    constructor(_createPublicConsultationUseCase, _findAllPublicConsultationUsecase, _updatePublicConsultationUseCase, _deletePublicConsultationUseCase, _registerVotePublicConsultationUseCase){
        this._createPublicConsultationUseCase = _createPublicConsultationUseCase;
        this._findAllPublicConsultationUsecase = _findAllPublicConsultationUsecase;
        this._updatePublicConsultationUseCase = _updatePublicConsultationUseCase;
        this._deletePublicConsultationUseCase = _deletePublicConsultationUseCase;
        this._registerVotePublicConsultationUseCase = _registerVotePublicConsultationUseCase;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    (0, _common.UsePipes)(_common.ValidationPipe),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpublicconsultationrequestdto.default === "undefined" ? Object : _createpublicconsultationrequestdto.default,
        typeof _authuserinterface.IAuthUser === "undefined" ? Object : _authuserinterface.IAuthUser
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicConsultationController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(),
    (0, _allowrolesdecorator.AllowRoles)(_roletypeenum.RoleType.ADMIN),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    (0, _common.UsePipes)(_common.ValidationPipe),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatepublicconsultationrequestdto.default === "undefined" ? Object : _updatepublicconsultationrequestdto.default
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicConsultationController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicConsultationController.prototype, "deleteById", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _paginatordecorator.PaginatorDecorator)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _Paginator.default === "undefined" ? Object : _Paginator.default
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicConsultationController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)("register-vote/:id"),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _authuserinterface.IAuthUser === "undefined" ? Object : _authuserinterface.IAuthUser
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicConsultationController.prototype, "registerVote", null);
PublicConsultationController = _ts_decorate([
    (0, _common.UseGuards)(_authguard.default, _roleguard.default),
    (0, _allowrolesdecorator.AllowRoles)(_roletypeenum.RoleType.USER, _roletypeenum.RoleType.ADMIN),
    (0, _common.Controller)({
        path: 'public-consultations',
        version: '1'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpublicconsultationusecase.default === "undefined" ? Object : _createpublicconsultationusecase.default,
        typeof _findallpublicconsultationusecase.default === "undefined" ? Object : _findallpublicconsultationusecase.default,
        typeof _updatepublicconsultationusecase.default === "undefined" ? Object : _updatepublicconsultationusecase.default,
        typeof _deletepublicconsultationbyidusecase.default === "undefined" ? Object : _deletepublicconsultationbyidusecase.default,
        typeof _registervotepublicconsultationusecase.default === "undefined" ? Object : _registervotepublicconsultationusecase.default
    ])
], PublicConsultationController);

//# sourceMappingURL=public-consultation.controller.js.map