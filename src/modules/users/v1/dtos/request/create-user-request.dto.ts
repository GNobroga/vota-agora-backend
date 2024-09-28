import { IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "src/modules/shared/validators/cpf.validator";

export default class CreateUserRequestDTO {
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