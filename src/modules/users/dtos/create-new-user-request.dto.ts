import { IsNotEmpty, IsString, Validate } from "class-validator";
import { IsCpf } from "src/core/validators/cpf.validator";
import PasswordMatchValidator from "src/core/validators/password-match.validator";

export default class CreateNewUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @IsCpf()
    document: string;

    @Validate(PasswordMatchValidator, ['confirmationPassword'])
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmationPassword: string;
}