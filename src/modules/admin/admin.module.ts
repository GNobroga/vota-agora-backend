import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import SharedModule from "../shared/shared.module";
import BlockchainTokenRepository from "./repositories/blockchain-token.repository";
import { BlockchainToken, TokenAddressSchema } from "./schemas/blockchain-token.schema";
import BlockchainTokenService from "./services/blockchain-token.service";
import { BLOCKCHAIN_SERVICE_TOKEN } from "./interfaces/blockchain-token-service.interface";
import { BLOCKCHAIN_REPOSITORY_TOKEN } from "./interfaces/blockchain-token-repository.interface";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: BlockchainToken.name, schema: TokenAddressSchema }
        ]),
        SharedModule,
    ],
    providers: [
        {
            provide: BLOCKCHAIN_SERVICE_TOKEN,
            useClass: BlockchainTokenService,
        },
        {
            provide: BLOCKCHAIN_REPOSITORY_TOKEN,
            useClass: BlockchainTokenRepository,
        }
    ],
    exports: [
        BLOCKCHAIN_SERVICE_TOKEN,
        BLOCKCHAIN_REPOSITORY_TOKEN
    ]
})

export default class AdminModule {}