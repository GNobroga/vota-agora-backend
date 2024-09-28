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
const _mongoose = require("@nestjs/mongoose");
const _publicconsultationvoteschema = /*#__PURE__*/ _interop_require_default(require("../schemas/public-consultation-vote.schema"));
const _mongoose1 = require("mongoose");
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
let FindAllPublicConsultationUseCase = class FindAllPublicConsultationUseCase {
    async execute(input) {
        const result = (await this._publicConsultationRepository.findAll(input)).map(async (src)=>{
            const owner = src.owner;
            return {
                id: src['_id'],
                title: src.title,
                description: src.description,
                initialDate: src.initialDate,
                endDate: src.endDate,
                imageUrl: src.imageUrl,
                voted: await this.hasVoted(owner['_id'], src['_id']),
                owner: {
                    id: owner['_id'],
                    fullName: owner.fullName,
                    document: owner.document
                }
            };
        });
        return await Promise.all(result);
    }
    async hasVoted(userId, publicConsultationId) {
        try {
            const result = this._publicConsultationVoteModel.findOne({
                publicConsultation: publicConsultationId,
                user: userId
            }).exec();
            (await result).toObject();
            return true;
        } catch  {
            return false;
        }
    }
    constructor(_publicConsultationRepository, _publicConsultationVoteModel){
        this._publicConsultationRepository = _publicConsultationRepository;
        this._publicConsultationVoteModel = _publicConsultationVoteModel;
    }
};
FindAllPublicConsultationUseCase = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN)),
    _ts_param(1, (0, _mongoose.InjectModel)(_publicconsultationvoteschema.default.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicconsultationrepositoryinterface.IPublicConsultationRepository === "undefined" ? Object : _publicconsultationrepositoryinterface.IPublicConsultationRepository,
        typeof _mongoose1.Model === "undefined" ? Object : _mongoose1.Model
    ])
], FindAllPublicConsultationUseCase);

//# sourceMappingURL=find-all-public-consultation.usecase.js.map