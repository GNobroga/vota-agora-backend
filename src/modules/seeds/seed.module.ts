import { Module } from "@nestjs/common";
import UserModule from "../users/user.module";
import UserDataSeed from "./user-data.seed";
import PublicConsultationModule from "../public-consultations/public-consultation.module";

export interface SeedModuleOptions {
    runScripts?: boolean;
}

@Module({
    imports: [UserModule, PublicConsultationModule],
    providers: [UserDataSeed],
    exports: [UserDataSeed],
})
export default class SeedModule {}