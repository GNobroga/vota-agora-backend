import { IsDate, IsNotEmpty, IsString, IsUrl } from "class-validator";


export default class CreatePublicConsultationRequestDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    initialDate: Date;

    @IsUrl()
    imageUrl: string;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;
}