import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export default class CreatePublicConsultationRequestDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5000)
    description: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    initialDate: Date;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsUrl()
    @IsOptional()
    imageUrl: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endDate: Date;
}