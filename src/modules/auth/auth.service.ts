import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import User from "../users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import isNull from "src/core/utils/is-null";
import { AuthUserInfo } from "./decorators/auth-user-info.decorator";

export type SignIn = {
    document: string;
    password: string;
}

export type TokenOuput = {
    access_token: string;
}

@Injectable()
export default class AuthService {

    constructor(
        @InjectRepository(User)
        private _userRepository: Repository<User>,
        private _jwtService: JwtService
    ) {}

    async signIn({ document, password }: SignIn) {
        const user = await this._userRepository.findOne({ where: { document }});

        if (isNull(user)) {
            throw new UnauthorizedException('Usuário ou senha incorretos.');
        }
        
        const  isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Usuário ou senha incorretos.');
        }

        const payload: AuthUserInfo = {
            sub: user.id,
            document: user.document,
            accountAddress: user.accountAddress,
            role: user.role,
        }

        return {
            access_token: await this._jwtService.signAsync(payload),
        } as TokenOuput;
    }
}