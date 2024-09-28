"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _createpublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./create-public-consultation.usecase"));
const _deletepublicconsultationbyidusecase = /*#__PURE__*/ _interop_require_default(require("./delete-public-consultation-by-id.usecase"));
const _findallpublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./find-all-public-consultation.usecase"));
const _updatepublicconsultationusecase = /*#__PURE__*/ _interop_require_default(require("./update-public-consultation.usecase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const _default = [
    _createpublicconsultationusecase.default,
    _deletepublicconsultationbyidusecase.default,
    _findallpublicconsultationusecase.default,
    _updatepublicconsultationusecase.default
];

//# sourceMappingURL=index.js.map