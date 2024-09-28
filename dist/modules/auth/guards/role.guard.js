"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RoleGuard;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _allowrolesdecorator = require("../decorators/allow-roles.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RoleGuard = class RoleGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const claimRoles = request['user']?.role ?? [];
        const roles = this.reflector.getAllAndMerge(_allowrolesdecorator.ALLOW_ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        return roles.some((role)=>claimRoles.includes(role));
    }
    constructor(reflector){
        this.reflector = reflector;
    }
};
RoleGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], RoleGuard);

//# sourceMappingURL=role.guard.js.map