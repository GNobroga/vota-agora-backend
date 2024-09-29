"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return UserResponseDTO;
    }
});
let UserResponseDTO = class UserResponseDTO {
    constructor(props){
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.accountAddress = props.accountAddress;
        this.rewardToken = props.balance.toString();
    }
};

//# sourceMappingURL=user-response.dto.js.map