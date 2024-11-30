import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { PaginatorDecorator } from "src/core/decorators/pagination.decorator";
import PageRequest from "src/core/models/page-request";
import { Authorize } from "../auth/decorators/authorize.decorator";
import AuthGuard from "../auth/guards/auth.guard";
import RoleGuard from "../auth/guards/role.guard";
import { RoleType } from "../auth/role-type.enum";
import CreateNewUserRequestDTO from "./dtos/create-new-user-request.dto";
import CreateNewUserUseCase from "./usecases/create-new-user.usecase";
import FindAllUsersUseCase from "./usecases/find-all-users.usecase";
import { AuthUserInfo, AuthUserInfoDecorator } from "../auth/decorators/auth-user-info.decorator";
import GetUserProfileUseCase from "./usecases/get-user-profile.usecase";
import UpdateUserProfileRequestDTO from "./dtos/update-user-profile-request.dto";
import UpdateUserProfileUseCase from "./usecases/update-user-profile.usecase";
import GetUserWalletUseCase from "./usecases/get-user-wallet.usecase";

@Controller({
    path: 'users',
    version: '1',
})
export default class UserController {

    constructor(
        private _createNewUserUseCase: CreateNewUserUseCase,
        private _findAllUsersUseCase: FindAllUsersUseCase,
        private _getUserProfileUseCase: GetUserProfileUseCase,
        private _updateUserProfileUseCase: UpdateUserProfileUseCase,
        private _getUserWalletUseCase: GetUserWalletUseCase,
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

    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@AuthUserInfoDecorator() { sub: id }: AuthUserInfo) {
        return this._getUserProfileUseCase.execute({ id });
    }

    @UseGuards(AuthGuard)
    @Get('wallet')
    async getWallet(@AuthUserInfoDecorator() { sub: id }: AuthUserInfo) {
        return this._getUserWalletUseCase.execute({
            loggedUserId: id,
        });
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Put("profile/update")
    async updateProfile(@AuthUserInfoDecorator() { sub: id }: AuthUserInfo, @Body() record: UpdateUserProfileRequestDTO) {
        return this._updateUserProfileUseCase.execute({
            userId: id,
            ...record,
        });
    }

}