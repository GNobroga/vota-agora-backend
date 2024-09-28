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
    PublicConsultationVoteSchema: function() {
        return PublicConsultationVoteSchema;
    },
    default: function() {
        return PublicConsultationVote;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _mongoose1 = require("mongoose");
const _publicconsultationschema = /*#__PURE__*/ _interop_require_default(require("./public-consultation.schema"));
const _userschema = require("../../users/user.schema");
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
let PublicConsultationVote = class PublicConsultationVote {
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _mongoose1.Types.ObjectId,
        ref: _publicconsultationschema.default.name
    }),
    _ts_metadata("design:type", typeof _mongoose1.Types === "undefined" || typeof _mongoose1.Types.ObjectId === "undefined" ? Object : _mongoose1.Types.ObjectId)
], PublicConsultationVote.prototype, "publicConsultation", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _mongoose1.Types.ObjectId,
        ref: _userschema.User.name
    }),
    _ts_metadata("design:type", typeof _mongoose1.Types === "undefined" || typeof _mongoose1.Types.ObjectId === "undefined" ? Object : _mongoose1.Types.ObjectId)
], PublicConsultationVote.prototype, "user", void 0);
PublicConsultationVote = _ts_decorate([
    (0, _mongoose.Schema)({
        collection: 'public_consultation_vote'
    })
], PublicConsultationVote);
const PublicConsultationVoteSchema = _mongoose.SchemaFactory.createForClass(PublicConsultationVote);

//# sourceMappingURL=public-consultation-vote.schema.js.map