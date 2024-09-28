import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export default class UpdatePublicConsultationRequestDTO {
    
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    description: string;

    @IsUrl()
    imageUrl: string;
}