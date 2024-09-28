import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { PaginatorDecorator } from "src/core/decorators/paginator.decorator";
import { RoleType } from "src/core/enums/role-type.enum";
import Paginator from "src/core/models/Paginator";
import { AllowRoles } from "../auth/decorators/allow-roles.decorator";
import AuthGuard from "../auth/guards/auth.guard";
import RoleGuard from "../auth/guards/role.guard";
import CreatePublicConsultationUseCase from "./usecases/create-public-consultation.usecase";
import FindAllPublicConsultationUseCase from "./usecases/find-all-public-consultation.usecase";
import CreatePublicConsultationRequestDTO from "./dtos/request/create-public-consultation-request.dto";
import { AuthUser } from "../auth/decorators/auth-user.decorator";
import { IAuthUser } from "../auth/auth-user.interface";
import UpdatePublicConsultationRequestDTO from "./dtos/request/update-public-consultation-request.dto";
import UpdatePublicConsultationUseCase from "./usecases/update-public-consultation.usecase";
import DeletePublicConsultationUseCase from "./usecases/delete-public-consultation-by-id.usecase";


@UseGuards(AuthGuard, RoleGuard)
@AllowRoles(RoleType.USER, RoleType.ADMIN)
@Controller({ path: 'public-consultations', version: '1' })
export default class PublicConsultationController {

    constructor(
        private readonly _createPublicConsultationUseCase: CreatePublicConsultationUseCase,
        private readonly _findAllPublicConsultationUsecase: FindAllPublicConsultationUseCase,
        private readonly _updatePublicConsultationUseCase: UpdatePublicConsultationUseCase,
        private readonly _deletePublicConsultationUseCase: DeletePublicConsultationUseCase
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async create(@Body() request: CreatePublicConsultationRequestDTO, @AuthUser() authUser: IAuthUser) {
        console.log(authUser)
        await this._createPublicConsultationUseCase.execute({
            ...request,
            userDocument: authUser.document,
        });
    }

    @Put()
    @AllowRoles(RoleType.ADMIN)
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async update(@Body() request: UpdatePublicConsultationRequestDTO) {
        return await this._updatePublicConsultationUseCase.execute(request);
    }

    @Delete(":id")
    @AllowRoles(RoleType.USER)
    @HttpCode(HttpStatus.OK)
    async deleteById(@Param("id") identifier: string) {
        return await this._deletePublicConsultationUseCase.execute(identifier);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@PaginatorDecorator() paginator: Paginator) {
        return this._findAllPublicConsultationUsecase.execute(paginator);
    }

}