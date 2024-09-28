import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import LoginRequestDTO from "./dtos/request/login-request.dto";
import AuthService from "./auth.service";

@Controller({ path: 'auth', version: '1' })
export default class AuthController {

    constructor(
        private readonly _authService: AuthService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async signIn(@Body() request: LoginRequestDTO) {
        return this._authService.signIn(request); 
    }
} 