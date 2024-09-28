import { IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "src/modules/shared/validators/cpf.validator";

export default class LoginRequestDTO {

    @IsString()
    @IsCpf()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}