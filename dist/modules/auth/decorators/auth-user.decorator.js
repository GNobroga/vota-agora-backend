"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthUser", {
    enumerable: true,
    get: function() {
        return AuthUser;
    }
});
const _common = require("@nestjs/common");
const AuthUser = (0, _common.createParamDecorator)(function(data, context) {
    const request = context.switchToHttp().getRequest();
    if (request['user']) {
        return request['user'];
    }
    return null;
});

//# sourceMappingURL=auth-user.decorator.js.map