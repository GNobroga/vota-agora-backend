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
const _solc = require("solc");
const _contractcontent = /*#__PURE__*/ _interop_require_default(require("./contract-content"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const FILE_NAME = 'glt_token.sol';
const CONTRACT_NAME = 'GLTToken';
const input = {
    language: 'Solidity',
    sources: {
        [FILE_NAME]: {
            content: _contractcontent.default
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [
                    '*'
                ]
            }
        }
    }
};
const output = JSON.parse((0, _solc.compile)(JSON.stringify(input)));
const _default = output.contracts[FILE_NAME][CONTRACT_NAME];

//# sourceMappingURL=contract-output.config.js.map