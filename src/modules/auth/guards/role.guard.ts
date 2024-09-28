import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ALLOW_ROLES_KEY } from "../decorators/allow-roles.decorator";

@Injectable()
export default class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const claimRoles: string[] =  request['user']?.role ?? [];
        const classRoles = this.reflector.get<string[]>(ALLOW_ROLES_KEY, context.getClass()) ?? [];
        const handlerRoles = this.reflector.get<string[]>(ALLOW_ROLES_KEY, context.getHandler()) ?? [];
        
        const roles = [] as string[];
        
        if (!handlerRoles.length) {
            roles.push(...classRoles);
        } else {
            roles.push(...handlerRoles);
        }

        return roles.some(role => claimRoles.includes(role));
    }
    
}