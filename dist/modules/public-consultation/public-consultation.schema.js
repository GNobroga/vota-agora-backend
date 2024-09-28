"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PublicConsultationSchema: function() {
        return PublicConsultationSchema;
    },
    default: function() {
        return PublicConsultation;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _mongoose1 = require("mongoose");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PublicConsultation = class PublicConsultation {
    static create(owner, title, description, initialDate, endDate) {
        return new PublicConsultation({
            title,
            description,
            initialDate,
            endDate,
            owner
        });
    }
    static update(title, description, imageUrl = undefined) {
        return new PublicConsultation({
            title,
            description,
            imageUrl
        });
    }
    constructor(props){
        this.title = props?.title ?? this.title;
        this.description = props?.description ?? this.description;
        this.initialDate = props?.initialDate ?? this.initialDate;
        this.endDate = props?.endDate ?? this.endDate;
        this.imageUrl = props?.imageUrl ?? this.imageUrl;
        this.owner = props?.owner ?? this.owner;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], PublicConsultation.prototype, "title", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], PublicConsultation.prototype, "description", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], PublicConsultation.prototype, "imageUrl", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicConsultation.prototype, "initialDate", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _mongoose1.Types.ObjectId,
        ref: 'User'
    }),
    _ts_metadata("design:type", Object)
], PublicConsultation.prototype, "owner", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicConsultation.prototype, "endDate", void 0);
PublicConsultation = _ts_decorate([
    (0, _mongoose.Schema)({
        collection: 'public_consultation'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ])
], PublicConsultation);
const PublicConsultationSchema = _mongoose.SchemaFactory.createForClass(PublicConsultation);

//# sourceMappingURL=public-consultation.schema.js.map