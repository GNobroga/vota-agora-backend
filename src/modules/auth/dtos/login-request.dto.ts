import { IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "src/core/validators/cpf.validator";

export default class LoginRequestDTO {

    @IsString()
    @IsCpf()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}