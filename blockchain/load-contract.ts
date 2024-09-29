import { compile } from 'solc';
import TOKEN_CONTRACT from './token-contract';

export default async () => {
    const FILE_NAME = 'glt_token.sol';
    const CONTRACT_NAME = 'GLTToken';

    const input = {
            language: 'Solidity',
            sources: { [FILE_NAME]: { content: TOKEN_CONTRACT } },
            settings: {
            outputSelection: {
                '*': {
                '*': ['*']
                }
            }
        }
    };

    const { contracts } = JSON.parse(compile(JSON.stringify(input)));

    return contracts[FILE_NAME][CONTRACT_NAME];
}
