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
    TokenAddress: function() {
        return TokenAddress;
    },
    TokenAddressSchema: function() {
        return TokenAddressSchema;
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
let TokenAddress = class TokenAddress {
    constructor(props){
        this.tokenAddress = props.tokenAddress ?? this.tokenAddress;
        this.accountAddress = props.accountAddress ?? this.accountAddress;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], TokenAddress.prototype, "tokenAddress", void 0);
_ts_decorate([
    (0, _mongoose.Prop)(),
    _ts_metadata("design:type", String)
], TokenAddress.prototype, "accountAddress", void 0);
TokenAddress = _ts_decorate([
    (0, _mongoose.Schema)({
        collection: 'token_addresses'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ])
], TokenAddress);
const TokenAddressSchema = _mongoose.SchemaFactory.createForClass(TokenAddress);

//# sourceMappingURL=token-address.schema.js.map