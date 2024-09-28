"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginatorDecorator", {
    enumerable: true,
    get: function() {
        return PaginatorDecorator;
    }
});
const _common = require("@nestjs/common");
const _Paginator = /*#__PURE__*/ _interop_require_default(require("../models/Paginator"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PaginatorDecorator = (0, _common.createParamDecorator)((data, context)=>{
    const http = context.switchToHttp();
    const request = http.getRequest();
    const { page = "", size = "", sort = "" } = request.query;
    return new _Paginator.default({
        page: page,
        size: size,
        sort: sort
    });
});

//# sourceMappingURL=paginator.decorator.js.map