import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import InfrastructureModule from "src/infrastructure/infrastructure.module";
import UserModule from "../users/user.module";
import PublicConsultation from "./entities/public-consultation.entity";
import VoteCount from "./entities/vote-count.entity";
import PublicConsultationController from "./public-consultation.controller";
import PublicConsultationExpirationCheckerScheduler from "./scheduler/public-consultation-expiration-checker.scheduler";
import usecases from "./usecases";

@Module({
    imports: [
        InfrastructureModule,
        UserModule,
        TypeOrmModule.forFeature([PublicConsultation, VoteCount]),
        ScheduleModule.forRoot()
    ],
    controllers: [PublicConsultationController],
    providers: [
        ...usecases,
        PublicConsultationExpirationCheckerScheduler
    ]
})
export default class PublicConsultationModule {}