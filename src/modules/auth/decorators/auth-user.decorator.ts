import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { IAuthUser } from "../auth-user.interface";

export const AuthUser = createParamDecorator(function(data: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if (request['user']) {
        return request['user'] as IAuthUser;
    }
    return null;
});