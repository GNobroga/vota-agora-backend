import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";


export default class CreatePublicConsultationRequestDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
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