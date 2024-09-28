import WalletCreatedDTO from "../dtos/wallet-created.dto";

export const BLOCKCHAIN_SERVICE_TOKEN = 'IBlockchainTokenService';

export interface IBlockchainTokenService {
    createAccount(): Promise<WalletCreatedDTO>;
    findBalanceByAccountAddress(accountAddress: string): Promise<bigint>;
    registerVote(address: string, publicConsultationId: string): Promise<boolean>;
}
