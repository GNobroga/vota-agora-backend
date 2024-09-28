import { IsNotEmpty, IsString } from "class-validator";

export default class CreateUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}