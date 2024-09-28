import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlockchainToken } from "../schemas/blockchain-token.schema";

export const BLOCKCHAIN_REPOSITORY_TOKEN = 'IBlockchainTokenRepository';

export interface IBlockchainTokenRepository {
    findFirst(): Promise<BlockchainToken | null>;
    deleteAll(): Promise<boolean>;
    create(record: BlockchainToken): Promise<BlockchainToken>;
}

@Injectable()
export default class BlockchainTokenRepository implements IBlockchainTokenRepository {
    
    constructor(
        @InjectModel(BlockchainToken.name)
        private readonly _tokenModel: Model<BlockchainToken>) {}


    async create(record: BlockchainToken): Promise<BlockchainToken> {
        return await (await this._tokenModel.create(record)).save();
    }

    async deleteAll(): Promise<boolean> {
        await this._tokenModel.deleteMany();
        return true;
    }
    
    async findFirst(): Promise<BlockchainToken | null> {
       try {
            const tokenAddress = (await this._tokenModel.findOne()).toObject();
            return tokenAddress;
       } catch (error) {
            return null;
       }
    }

}