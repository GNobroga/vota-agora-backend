import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export default class UpdatePublicConsultationRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5000)
    description: string;

    @IsUrl()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsIn(['open', 'closed'])
    status: 'open' | 'closed'; 
}