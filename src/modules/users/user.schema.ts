// cpf
// nome completo
// senha
// numero da carteira
// roles

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'users' })
export class User {
    @Prop()
    fullName: string;

    @Prop()
    document: string;

    @Prop()
    password: string;

    @Prop()
    accountAddress: string;

    @Prop()
    privateKey: string;

    @Prop()
    role: string;

    constructor(props: Partial<User>) {
        this.fullName = props.fullName ?? this.fullName;
        this.document = props.document ?? this.document;
        this.password = props.password ?? this.password;
        this.role = props.role ?? this.role;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

