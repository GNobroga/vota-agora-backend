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
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicConsultation.prototype, "initialDate", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicConsultation.prototype, "endDate", void 0);
PublicConsultation = _ts_decorate([
    (0, _mongoose.Schema)({
        collection: 'public_consultation'
    })
], PublicConsultation);
const PublicConsultationSchema = _mongoose.SchemaFactory.createForClass(PublicConsultation);

//# sourceMappingURL=public-consultation.schema.js.map