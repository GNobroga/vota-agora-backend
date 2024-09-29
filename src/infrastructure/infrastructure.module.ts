import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AppConfig from "./configs/app.config";
import BlockchainService from "./services/blockchain.service";

@Module({
    imports: [ConfigModule],
    providers: [
        AppConfig,
        BlockchainService
    ],
    exports: [
        AppConfig,
        BlockchainService
    ]
})
export default class InfrastructureModule {}