import { IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "src/core/validators/cpf.validator";

export default class CreateNewUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @IsCpf()
    document: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}