import { Module } from "@nestjs/common";
import UserRepository, { USER_REPOSITORY_TOKEN } from "./user.repository";
import CreateUserUseCase from "./usecases/create-user.usecase";
import UserController from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import AdminModule from "src/modules/admin/admin.module";
import FindAllUsersUseCase from "./usecases/find-all-users.usecase";

@Module({
    controllers: [
        UserController
    ],
    imports: [
        AdminModule,
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
export default class UserModule {}