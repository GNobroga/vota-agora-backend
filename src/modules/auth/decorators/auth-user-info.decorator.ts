import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export type AuthUserInfo = {
    sub: number;
    document: string;
    accountAddress: string;
    role: string;
}

export const AuthUserInfoDecorator = createParamDecorator((data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (request['user']) {
        return request['user'] as AuthUserInfo;
    }
    return {
        sub: 0,
        document: '',
        accountAddress: '',
        role: '',
    } as AuthUserInfo;
});