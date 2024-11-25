import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export default class AuthGuard implements CanActivate {

    constructor(
        private readonly _jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const http = context.switchToHttp();
            const request = http.getRequest<Request>();
            const token = this.extractTokenFromHeader(request);
            if (!token) return false;
            const payload = await this._jwtService.verifyAsync(token);
            console.log(payload);
            request['user'] = payload;
            return true;
        } catch {
            return false;
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}