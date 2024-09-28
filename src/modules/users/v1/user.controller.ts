import { Body, Controller } from "@nestjs/common";
import CreateUserRequestDTO from "./dtos/request/create-user-request.dto";
import UserRepository from "./user.repository";
import { User } from "./user.schema";

@Controller({ version: '1' })
export default class UserController {

    constructor(private readonly _userRepository: UserRepository) {}

    public create(@Body() request: CreateUserRequestDTO) {
        this._userRepository.create(new User(request));
    }

}