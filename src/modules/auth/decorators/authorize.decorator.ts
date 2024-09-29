import { SetMetadata } from "@nestjs/common";


export const AUTHORIZE_KEY = 'authorize';

export const Authorize = function(...roles: string[]) {
    return SetMetadata(AUTHORIZE_KEY,roles);
}