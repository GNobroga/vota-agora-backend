import { Module } from "@nestjs/common";
import UserModule from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import SharedModule from "../shared/shared.module";
import AppConfig from "../shared/app.config";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            global: true,
            useFactory(appConfig: AppConfig) {
                return {
                    secret: appConfig.jwtSecret,
                    signOptions: { expiresIn: '24h'},
                }
            },
            imports: [SharedModule],
            inject: [AppConfig],
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export default class AuthModule {}