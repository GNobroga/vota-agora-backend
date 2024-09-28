"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return WalletCreatedDTO;
    }
});
let WalletCreatedDTO = class WalletCreatedDTO {
    constructor(props){
        this.accountAddress = props.accountAddress;
        this.privateKey = props.privateKey;
        this.tokenAddress = props.tokenAddress;
    }
};

//# sourceMappingURL=wallet-created.dto.js.map