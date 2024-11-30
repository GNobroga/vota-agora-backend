import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export default class UpdateUserProfileRequestDTO {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsOptional()
    imageUrl: string;


}