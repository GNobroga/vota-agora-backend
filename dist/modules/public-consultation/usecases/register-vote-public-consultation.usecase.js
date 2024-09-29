"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RegisterVotePublicConsultationUseCase;
    }
});
const _common = require("@nestjs/common");
const _blockchaintokenserviceinterface = require("../../admin/interfaces/blockchain-token-service.interface");
const _publicconsultationrepositoryinterface = require("../interfaces/public-consultation-repository.interface");
const _userrepositoryinterface = require("../../users/interfaces/user-repository.interface");
const _publicconsultationvoteschema = /*#__PURE__*/ _interop_require_default(require("../schemas/public-consultation-vote.schema"));
const _mongoose = require("mongoose");
const _mongoose1 = require("@nestjs/mongoose");
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
let RegisterVotePublicConsultationUseCase = class RegisterVotePublicConsultationUseCase {
    async execute(input) {
        const user = await this._userRepositoryToken.findByDocument(input.userDocument);
        if (!user) {
            throw new _common.NotFoundException(`Usuário com documento ${input.userDocument} não foi encontrado.`);
        }
        const publicConsultation = await this._publicConsultationRepository.findById(input.publicConsultationId);
        // Se a consulta publica for do usuario em questão, ele não pode se auto votar.
        if (publicConsultation.owner.toString() == user['_id']) {
            throw new _common.BadRequestException('Não é permitido o dono da consulta publica votar nela mesmo.');
        }
        if (!publicConsultation) {
            throw new _common.NotFoundException(`Consulta pública com identificação ${input.publicConsultationId} não foi encontrada.`);
        }
        const isRegistred = await this._blockchainTokenService.registerVote(user.accountAddress, input.publicConsultationId);
        if (!isRegistred) {
            return false;
        }
        await this._blockchainTokenService.transferReward(user.accountAddress);
        await this._publicConsultationVoteModel.create({
            publicConsultation: new _mongoose.Types.ObjectId(input.publicConsultationId),
            user: new _mongoose.Types.ObjectId(user['_id'])
        });
        return true;
    }
    constructor(_publicConsultationRepository, _userRepositoryToken, _blockchainTokenService, _publicConsultationVoteModel){
        this._publicConsultationRepository = _publicConsultationRepository;
        this._userRepositoryToken = _userRepositoryToken;
        this._blockchainTokenService = _blockchainTokenService;
        this._publicConsultationVoteModel = _publicConsultationVoteModel;
    }
};
RegisterVotePublicConsultationUseCase = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN)),
    _ts_param(1, (0, _common.Inject)(_userrepositoryinterface.USER_REPOSITORY_TOKEN)),
    _ts_param(2, (0, _common.Inject)(_blockchaintokenserviceinterface.BLOCKCHAIN_SERVICE_TOKEN)),
    _ts_param(3, (0, _mongoose1.InjectModel)(_publicconsultationvoteschema.default.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicconsultationrepositoryinterface.IPublicConsultationRepository === "undefined" ? Object : _publicconsultationrepositoryinterface.IPublicConsultationRepository,
        typeof _userrepositoryinterface.IUserRepository === "undefined" ? Object : _userrepositoryinterface.IUserRepository,
        typeof _blockchaintokenserviceinterface.IBlockchainTokenService === "undefined" ? Object : _blockchaintokenserviceinterface.IBlockchainTokenService,
        typeof _mongoose.Model === "undefined" ? Object : _mongoose.Model
    ])
], RegisterVotePublicConsultationUseCase);

//# sourceMappingURL=register-vote-public-consultation.usecase.js.map