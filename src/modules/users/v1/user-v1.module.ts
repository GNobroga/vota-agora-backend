import { Module } from "@nestjs/common";
import UserRepository, { USER_REPOSITORY_TOKEN } from "./user.repository";
import CreateUserUseCase from "./usecases/create-user.usecase";
import UserController from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import FindAllUsersUseCase from "./usecases/find-all-users.usecase";
import AdminV1Module from "src/modules/admin/v1/admin-v1.module";

@Module({
    controllers: [
        UserController
    ],
    imports: [
        AdminV1Module,
        MongooseModule.forFeature(
            [
                { name: User.name, schema: UserSchema, },
            ]
        )
    ],
    providers: [
        CreateUserUseCase,
        FindAllUsersUseCase,
        {
            provide: USER_REPOSITORY_TOKEN,
            useClass: UserRepository,
        }
    ],
})
export default class UserV1Module {}