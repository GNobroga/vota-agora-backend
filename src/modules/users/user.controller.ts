import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { PaginatorDecorator } from "src/core/decorators/pagination.decorator";
import PageRequest from "src/core/models/page-request";
import { Authorize } from "../auth/decorators/authorize.decorator";
import AuthGuard from "../auth/guards/auth.guard";
import RoleGuard from "../auth/guards/role.guard";
import { RoleType } from "../auth/role-type.enum";
import CreateNewUserRequestDTO from "./dtos/create-new-user-request.dto";
import CreateNewUserUseCase from "./usecases/create-new-user.usecase";
import FindAllUsersUseCase from "./usecases/find-all-users.usecase";

@Controller({
    path: 'users',
    version: '1',
})
export default class UserController {

    constructor(
        private _createNewUserUseCase: CreateNewUserUseCase,
        private _findAllUsersUseCase: FindAllUsersUseCase,
    ) {}

    @UseGuards(AuthGuard, RoleGuard)
    @Authorize(RoleType.ADMIN)
    @Get()
    async findAll(@PaginatorDecorator() pageRequest: PageRequest) {
        return await this._findAllUsersUseCase.execute(pageRequest);
    }


    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() request: CreateNewUserRequestDTO) {
        return await this._createNewUserUseCase.execute(request);
    }

}