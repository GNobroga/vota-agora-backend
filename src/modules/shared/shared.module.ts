import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AppConfig from "./app.config";
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod'
            ],
            validationSchema: Joi.object({
                'SERVER_PORT': Joi.number().required(),
                'DATABASE_URL': Joi.string().required(),
                'BLOCKCHAIN_URL': Joi.string().required(),
            }),
        }),
    ],
    providers: [
        AppConfig
    ],
    exports: [AppConfig]
})
export default class SharedModule {}