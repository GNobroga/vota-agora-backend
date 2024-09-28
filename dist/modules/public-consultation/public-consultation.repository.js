"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return PublicConsultationRepository;
    }
});
const _publicconsultationschema = /*#__PURE__*/ _interop_require_default(require("./schemas/public-consultation.schema"));
const _common = require("@nestjs/common");
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
let PublicConsultationRepository = class PublicConsultationRepository {
    async save(record) {
        try {
            if (record['_id']) {
                const id = record['_id'];
                await this._model.findByIdAndUpdate(id, record, {
                    new: true
                }).exec();
                return true;
            } else {
                await this._model.create(record);
                return true;
            }
        } catch  {
            return false;
        }
    }
    async findById(identifier) {
        try {
            const data = await this._model.findById(identifier).exec();
            return data.toObject();
        } catch  {
            return null;
        }
    }
    async deleteById(identifier) {
        try {
            this.findById(identifier);
            await this._model.findByIdAndDelete(identifier).exec();
            return true;
        } catch  {
            return false;
        }
    }
    async findAll(paginator) {
        const skip = (paginator.page - 1) * paginator.size;
        const data = await this._model.find().sort({
            '_id': paginator.sort === 'desc' ? -1 : 1
        }).skip(skip).limit(paginator.size).populate('owner');
        return data.map((doc)=>doc.toObject());
    }
    constructor(_model){
        this._model = _model;
    }
};
PublicConsultationRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose1.InjectModel)(_publicconsultationschema.default.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mongoose.Model === "undefined" ? Object : _mongoose.Model
    ])
], PublicConsultationRepository);

//# sourceMappingURL=public-consultation.repository.js.map