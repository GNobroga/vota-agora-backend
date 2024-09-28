import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import CreateUserRequestDTO from "./dtos/request/create-user-request.dto";
import CreateUserUseCase from "./usecases/create-user.usecase";
import { User } from "./user.schema";
import { PaginatorDecorator } from "src/core/decorators/paginator.decorator";
import Paginator from "src/core/models/Paginator";
import FindAllUsersUseCase from "./usecases/find-all-users.usecase";

@Controller({ path: 'users', version: '1' })
export default class UserController {

    constructor(
        private readonly _createUserUseCase: CreateUserUseCase,
        private readonly _findAllUsersUseCase: FindAllUsersUseCase
    ) {}

    @Get()
    async findAll(@PaginatorDecorator() paginator: Paginator) {
        return this._findAllUsersUseCase.execute(paginator);
    }

    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() request: CreateUserRequestDTO) {
        return await this._createUserUseCase.execute(new User(request));
    }

}