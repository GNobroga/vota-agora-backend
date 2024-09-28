import { compile } from 'solc';
import CONTRACT_CONTENT from './contract-content';


const FILE_NAME = 'glt_token.sol';
const CONTRACT_NAME = 'GLTToken';

const input = {
    language: 'Solidity',
    sources: {
    [FILE_NAME]: {
        content: CONTRACT_CONTENT,
    }
    },
    settings: {
    outputSelection: {
        '*': {
        '*': ['*']
        }
    }
    }
};

const output = JSON.parse(compile(JSON.stringify(input)));

export default output.contracts[FILE_NAME][CONTRACT_NAME];

