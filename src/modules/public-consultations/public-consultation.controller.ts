import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import AuthGuard from "../auth/guards/auth.guard";
import RoleGuard from "../auth/guards/role.guard";
import { Authorize } from "../auth/decorators/authorize.decorator";
import { RoleType } from "../auth/role-type.enum";
import RegisterVotePublicConsultationUseCase from "./usecases/register-vote-public-consultation.usecase";
import UpdatePublicConsultationUseCase from "./usecases/update-public-consultation.usecase";
import FindAllPublicConsultationUseCase from "./usecases/find-all-public-consultation.usecase";
import DeletePublicConsultationByIdUseCase from "./usecases/delete-public-consultation-by-id.usecase";
import CreateNewPublicConsultationUseCase from "./usecases/create-new-public-consultation.usecase";
import CreatePublicConsultationRequestDTO from "./dtos/create-public-consultation-request.dto";
import { AuthUserInfo, AuthUserInfoDecorator } from "../auth/decorators/auth-user-info.decorator";
import UpdatePublicConsultationRequestDTO from "./dtos/update-public-consultation-request.dto";
import { PaginatorDecorator } from "src/core/decorators/pagination.decorator";
import PageRequest from "src/core/models/page-request";
import GetPublicConsultationCreatedByMonthUseCase from "./usecases/get-public-consultation-created-by-month.usecase";
import GetVotesCreatedByMonthUseCase from "./usecases/get-votes-created-by-month.usecase";


@UseGuards(AuthGuard, RoleGuard)
@Authorize(RoleType.USER, RoleType.ADMIN)
@Controller({
    path: 'public-consultation',
    version: '1',
})
export default class PublicConsultationController {

    constructor(
        private _createPublicConsultationUseCase: CreateNewPublicConsultationUseCase,
        private _findAllPublicConsultationUsecase: FindAllPublicConsultationUseCase,
        private _updatePublicConsultationUseCase: UpdatePublicConsultationUseCase,
        private _deletePublicConsultationByIdUseCase: DeletePublicConsultationByIdUseCase,
        private _registerVotePublicConsultationUseCase: RegisterVotePublicConsultationUseCase,
        private _getPublicConsultationCreatedByMonthUseCase: GetPublicConsultationCreatedByMonthUseCase,
        private _getVotesCreatedByMonthUseCase: GetVotesCreatedByMonthUseCase,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async create(@Body() request: CreatePublicConsultationRequestDTO, @AuthUserInfoDecorator() authUserInfo: AuthUserInfo) {
        await this._createPublicConsultationUseCase.execute({
            loggedUserId: authUserInfo.sub,
            ...request
        });
    }

    @Put()
    @Authorize(RoleType.ADMIN)
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async update(@Body() request: UpdatePublicConsultationRequestDTO, @AuthUserInfoDecorator() authUserInfo: AuthUserInfo) {
        return await this._updatePublicConsultationUseCase.execute({
            identifier: request.id,
            loggedUserId: authUserInfo.sub,
            loggedUserRole: authUserInfo.role as RoleType,
            ...request
        });
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteById(@Param("id", ParseIntPipe) identifier: number, @AuthUserInfoDecorator() authUserInfo: AuthUserInfo) {
        return await this._deletePublicConsultationByIdUseCase.execute({
            identifier,
            loggedUserId: authUserInfo.sub,
        });
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@PaginatorDecorator() pageRequest: PageRequest, @AuthUserInfoDecorator() authUserInfo: AuthUserInfo) {
        return this._findAllPublicConsultationUsecase.execute({
            loggedUserId: authUserInfo.sub,
            pageRequest,
        });
    }

    @Get("register-vote/:id")
    @HttpCode(HttpStatus.OK)
    async registerVote(@Param("id", ParseIntPipe) publicConsultationId: number, @AuthUserInfoDecorator() authUserInfo: AuthUserInfo) {
        return await this._registerVotePublicConsultationUseCase.execute({
            publicConsultationId,
            loggedUserId: authUserInfo.sub,
        });
    }

    @Get('/stats/by-month')
    async getCreatedAndVotedConsultationsInMonth() {
        const [
            publicConsultationCreatedByMonth,
            votesCreatedByMonth,
        ] = await Promise.all([
            this._getPublicConsultationCreatedByMonthUseCase.execute(), 
            this._getVotesCreatedByMonthUseCase.execute()
        ]);

        return {
            publicConsultationCreatedByMonth,
            votesCreatedByMonth,
        };
    }
}