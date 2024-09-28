import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "../users/interfaces/user-repository.interface";
import { JwtService } from "@nestjs/jwt";
import LoginRequestDTO from "./dtos/request/login-request.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export default class AuthService {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: IUserRepository,
        private jwtService: JwtService
    ) {}

    async signIn(request: LoginRequestDTO) {
        const user = await this._userRepository.findByDocument(request.document);

        if (!user) {
            throw new UnauthorizedException('Usuário ou senha inválidos.');
        }

        const isPasswordValid = await bcrypt.compare(request.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Usuário ou senha inválidos.');
        }

        const payload = { 
            sub: user['_id'],
            document: user.document, 
            walletAddress: user.accountAddress, 
            role: user.role 
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
