import { BlockchainToken } from "../schemas/blockchain-token.schema";

export const BLOCKCHAIN_REPOSITORY_TOKEN = 'IBlockchainTokenRepository';

export interface IBlockchainTokenRepository {
    findFirst(): Promise<BlockchainToken | null>;
    deleteAll(): Promise<boolean>;
    create(record: BlockchainToken): Promise<BlockchainToken>;
}