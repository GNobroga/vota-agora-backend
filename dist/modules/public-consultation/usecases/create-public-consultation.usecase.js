"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CreatePublicConsultationUseCase;
    }
});
const _common = require("@nestjs/common");
const _moment = /*#__PURE__*/ _interop_require_default(require("moment"));
const _publicconsultationrepositoryinterface = require("../interfaces/public-consultation-repository.interface");
const _publicconsultationschema = /*#__PURE__*/ _interop_require_default(require("../schemas/public-consultation.schema"));
const _userrepositoryinterface = require("../../users/interfaces/user-repository.interface");
const _mongoose = require("mongoose");
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
let CreatePublicConsultationUseCase = class CreatePublicConsultationUseCase {
    async execute(input) {
        const user = await this._userRepository.findByDocument(input.userDocument);
        if (!user) {
            throw new _common.BadRequestException(`Usuário com identificação ${input.userDocument} não encontrado.`);
        }
        const today = (0, _moment.default)().startOf('day');
        const initialDate = (0, _moment.default)(input.initialDate).startOf('day');
        const endDate = (0, _moment.default)(input.endDate).startOf('day');
        if (initialDate.isBefore(today)) {
            throw new _common.BadRequestException('A data inicial não pode ser inferior à data atual.');
        }
        if (initialDate.isAfter(endDate)) {
            throw new _common.BadRequestException('A data inicial não pode ser superior à data final.');
        }
        console.log(user['_id']);
        await this._publicConsultationRepository.save(_publicconsultationschema.default.create(new _mongoose.Types.ObjectId(user['_id']), input.title, input.description, input.initialDate, input.endDate));
    }
    constructor(_publicConsultationRepository, _userRepository){
        this._publicConsultationRepository = _publicConsultationRepository;
        this._userRepository = _userRepository;
    }
};
CreatePublicConsultationUseCase = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN)),
    _ts_param(1, (0, _common.Inject)(_userrepositoryinterface.USER_REPOSITORY_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicconsultationrepositoryinterface.IPublicConsultationRepository === "undefined" ? Object : _publicconsultationrepositoryinterface.IPublicConsultationRepository,
        typeof _userrepositoryinterface.IUserRepository === "undefined" ? Object : _userrepositoryinterface.IUserRepository
    ])
], CreatePublicConsultationUseCase);

//# sourceMappingURL=create-public-consultation.usecase.js.map