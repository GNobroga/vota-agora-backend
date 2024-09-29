import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AppConfig from "src/infrastructure/configs/app.config";
import InfrastructureModule from "src/infrastructure/infrastructure.module";
import UserModule from "../users/user.module";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            global: true,
            useFactory(appConfig: AppConfig) {
                return {
                    secret: appConfig.jwtSecret,
                    signOptions: { expiresIn: '24h' },
                };
            },
            inject: [AppConfig],
            imports: [InfrastructureModule],
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export default class AuthModule {}