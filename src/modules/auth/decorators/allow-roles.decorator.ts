import { SetMetadata } from "@nestjs/common";


export const ALLOW_ROLES_KEY = "roles";

export const AllowRoles = (...roles: string[]) => SetMetadata(ALLOW_ROLES_KEY, roles);