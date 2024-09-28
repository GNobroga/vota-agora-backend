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
const _createuserusecase = /*#__PURE__*/ _interop_require_default(require("./create-user.usecase"));
const _findallusersusecase = /*#__PURE__*/ _interop_require_default(require("./find-all-users.usecase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const _default = [
    _createuserusecase.default,
    _findallusersusecase.default
];

//# sourceMappingURL=index.js.map