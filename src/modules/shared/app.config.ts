import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class AppConfig {

    constructor(private readonly _configService: ConfigService) {}

    public get blockchainURL() {
        return this._configService.get('BLOCKCHAIN_URL');
    }

    public get databaseURL() {
        return this._configService.get('DATABASE_URL');
    }

    public get port() {
        return this._configService.get('SERVER_PORT');
    }

    public get jwtSecret() {
        return this._configService.get('JWT_SECRET');
    }

}