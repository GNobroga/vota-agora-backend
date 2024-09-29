import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'blockchain_token'})
export class BlockchainToken {
    @Prop()
    tokenAddress: string;

    @Prop()
    accountAddress: string;

    @Prop()
    privateKey: string;

    constructor(props: Partial<BlockchainToken>) {
        this.tokenAddress = props?.tokenAddress ?? this.tokenAddress;
        this.accountAddress = props?.accountAddress ?? this.accountAddress;
        this.privateKey = props?.privateKey ?? this.privateKey;
    }
}

export const TokenAddressSchema = SchemaFactory.createForClass(BlockchainToken);
