
export default class PublicConsultationResponseDTO {
    id: string;
    title: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    imageUrl: string;

    constructor(props: Partial<PublicConsultationResponseDTO>) {
        Object.assign(this, { ...props });
    }
}