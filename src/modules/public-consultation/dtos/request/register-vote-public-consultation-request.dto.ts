import { IsNotEmpty, IsString } from "class-validator";

export default class RegisterVotePublicConsultationRequestDTO {
    
    @IsNotEmpty()
    @IsString()
    publicConsultationId: string;
}