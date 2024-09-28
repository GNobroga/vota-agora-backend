import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class AppConfig {

    constructor(private readonly _configService: ConfigService) {}

    public getBlockchainURL() {
        return this._configService.get('BLOCKCHAIN_URL');
    }

    public getDatabaseURL() {
        return this._configService.get('DATABASE_URL');
    }

    public getApplicationPort() {
        return this._configService.get('SERVER_PORT');
    }

}