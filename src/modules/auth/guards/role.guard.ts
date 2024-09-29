import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AUTHORIZE_KEY } from "../decorators/authorize.decorator";

@Injectable()
export default class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const claimRoles: string[] = request['user']?.role ?? [];

        const classRoles = this.reflector.get<string[]>(AUTHORIZE_KEY, context.getClass()) ?? [];
        const handlerRoles = this.reflector.get<string[]>(AUTHORIZE_KEY, context.getHandler()) ?? [];

        const roles = handlerRoles.length ? handlerRoles : classRoles;

        return roles.some(role => claimRoles.includes(role));
    }
    
}