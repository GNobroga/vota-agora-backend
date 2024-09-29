import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import InfrastructureModule from "src/infrastructure/infrastructure.module";
import usecases from "./usecases";
import UserController from "./user.controller";
import User from "./user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        InfrastructureModule,
    ],
    controllers: [UserController],
    providers: [
        ...usecases
    ],
    exports: [TypeOrmModule.forFeature([User])],
})
export default class UserModule {

}