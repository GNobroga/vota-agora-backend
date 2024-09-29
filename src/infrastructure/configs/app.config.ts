import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class AppConfig {

    constructor(private _configService: ConfigService) {}

    get serverPort() {
        return this._configService.get('SERVER_PORT');
    }

    get databaseUrl() {
        return this._configService.get('DATABASE_URL');
    }

    get blockchainServerPort() {
        return this._configService.get('BLOCKCHAIN_SERVER_PORT');
    }

    get jwtSecret() {
        return this._configService.get('JWT_SECRET');
    }
    
}