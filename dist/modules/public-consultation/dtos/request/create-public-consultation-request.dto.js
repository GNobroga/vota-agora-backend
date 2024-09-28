"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CreatePublicConsultationRequestDTO;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatePublicConsultationRequestDTO = class CreatePublicConsultationRequestDTO {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePublicConsultationRequestDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePublicConsultationRequestDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>Date),
    (0, _classvalidator.IsDate)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreatePublicConsultationRequestDTO.prototype, "initialDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsUrl)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreatePublicConsultationRequestDTO.prototype, "imageUrl", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>Date),
    (0, _classvalidator.IsDate)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreatePublicConsultationRequestDTO.prototype, "endDate", void 0);

//# sourceMappingURL=create-public-consultation-request.dto.js.map