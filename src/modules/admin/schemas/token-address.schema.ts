import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'token_addresses'})
export class TokenAddress {
    @Prop()
    tokenAddress: string;

    @Prop()
    accountAddress: string;

    constructor(props: Partial<TokenAddress>) {
        this.tokenAddress = props.tokenAddress ?? this.tokenAddress;
        this.accountAddress = props.accountAddress ?? this.accountAddress;
    }
}

export const TokenAddressSchema = SchemaFactory.createForClass(TokenAddress);
