"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return FindAllPublicConsultationUseCase;
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
let FindAllPublicConsultationUseCase = class FindAllPublicConsultationUseCase {
    async execute(input) {
        return (await this._publicConsultationRepository.findAll(input)).map((src)=>{
            return {
                id: src['_id'],
                title: src.title,
                description: src.description,
                initialDate: src.initialDate,
                endDate: src.endDate,
                imageUrl: src.imageUrl
            };
        });
    }
    constructor(_publicConsultationRepository){
        this._publicConsultationRepository = _publicConsultationRepository;
    }
};
FindAllPublicConsultationUseCase = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicconsultationrepositoryinterface.IPublicConsultationRepository === "undefined" ? Object : _publicconsultationrepositoryinterface.IPublicConsultationRepository
    ])
], FindAllPublicConsultationUseCase);

//# sourceMappingURL=find-all-public-consultation.usecase.js.map