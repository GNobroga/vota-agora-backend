import { Module } from "@nestjs/common";
import usecases from "./usecases";
import UserModule from "../users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import PublicConsultation from "./entities/public-consultation.entity";
import PublicConsultationVote from "./entities/public-consultation-vote.entity";
import PublicConsultationController from "./public-consultation.controller";
import InfrastructureModule from "src/infrastructure/infrastructure.module";

@Module({
    imports: [
        InfrastructureModule,
        UserModule,
        TypeOrmModule.forFeature([PublicConsultation, PublicConsultationVote]),
    ],
    controllers: [PublicConsultationController],
    providers: [
        ...usecases
    ]
})
export default class PublicConsultationModule {}