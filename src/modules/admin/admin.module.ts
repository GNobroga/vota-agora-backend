import { Module } from "@nestjs/common";
import TokenAddressService from "./services/token-address.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenAddress, TokenAddressSchema } from "./schemas/token-address.schema";
import SharedModule from "../shared/shared.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TokenAddress.name, schema: TokenAddressSchema }
        ]),
        SharedModule,
    ],
    providers: [TokenAddressService]
})
export default class AdminModule {}