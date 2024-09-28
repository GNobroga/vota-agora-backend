// cpf
// nome completo
// senha
// numero da carteira
// roles
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
    User: function() {
        return User;
    },
    UserSchema: function() {
        return UserSchema;
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
let User = class User {
    constructor(props){
        this.fullName = props.fullName ?? this.fullName;
        this.document = props.document ?? this.document;
        this.password = props.password ?? this.password;
        this.roles = props.roles ?? this.roles;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], User.prototype, "fullName", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], User.prototype, "document", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], User.prototype, "accountAddress", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], User.prototype, "privateKey", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = _ts_decorate([
    (0, _mongoose.Schema)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ])
], User);
const UserSchema = _mongoose.SchemaFactory.createForClass(User);

//# sourceMappingURL=user.schema.js.map