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
    ALLOW_ROLES_KEY: function() {
        return ALLOW_ROLES_KEY;
    },
    AllowRoles: function() {
        return AllowRoles;
    }
});
const _common = require("@nestjs/common");
const ALLOW_ROLES_KEY = "roles";
const AllowRoles = (...roles)=>(0, _common.SetMetadata)(ALLOW_ROLES_KEY, roles);

//# sourceMappingURL=allow-roles.decorator.js.map