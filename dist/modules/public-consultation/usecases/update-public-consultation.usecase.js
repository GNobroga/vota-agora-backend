"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return UpdatePublicConsultationUseCase;
    }
});
const _common = require("@nestjs/common");
const _publicconsultationrepositoryinterface = require("../interfaces/public-consultation-repository.interface");
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
let UpdatePublicConsultationUseCase = class UpdatePublicConsultationUseCase {
    async execute(input) {
        const data = await this._publicConsultationRepository.findById(input.id);
        if (!data) {
            throw new _common.NotFoundException(`Não há nenhuma consulta pública com a identificação ${input.id}`);
        }
        data.title = input.title;
        data.description = input.description;
        data.imageUrl ||= data.imageUrl;
        await this._publicConsultationRepository.save(data);
    }
    constructor(_publicConsultationRepository){
        this._publicConsultationRepository = _publicConsultationRepository;
    }
};
UpdatePublicConsultationUseCase = _ts_decorate([
    _ts_param(0, (0, _common.Inject)(_publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicconsultationrepositoryinterface.IPublicConsultationRepository === "undefined" ? Object : _publicconsultationrepositoryinterface.IPublicConsultationRepository
    ])
], UpdatePublicConsultationUseCase);

//# sourceMappingURL=update-public-consultation.usecase.js.map