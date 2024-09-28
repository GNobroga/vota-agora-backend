import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export default class UpdatePublicConsultationRequestDTO {
    
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    description: string;

    @IsUrl()
    @IsOptional()
    imageUrl: string;
}