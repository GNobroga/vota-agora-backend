// cpf
// nome completo
// senha
// numero da carteira
// roles

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    fullName: string;

    @Prop()
    document: string;

    @Prop()
    password: string;

    @Prop()
    walletAddress: string;

    @Prop()
    roles: string[];

    constructor(props: Partial<User>) {
        this.fullName = props.fullName ?? this.fullName;
        this.document = props.document ?? this.document;
        this.password = props.password ?? this.password;
        this.walletAddress = props.walletAddress ?? this.walletAddress;
        this.roles = props.roles ?? this.roles;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

