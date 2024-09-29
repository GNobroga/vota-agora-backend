import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import AuthService from "./auth.service";
import LoginRequestDTO from "./dtos/login-request.dto";

@Controller({
    path: 'auth',
    version: '1',
})
export default class AuthController {

    constructor(private _authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async signIn(@Body() request: LoginRequestDTO) {
        return this._authService.signIn(request);
    }
}