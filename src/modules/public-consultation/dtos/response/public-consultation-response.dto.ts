
export type PublicConsultationOwner = {
    id: string;
    fullName: string;
    document: string;
}

export default class PublicConsultationResponseDTO {
    id: string;
    title: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    imageUrl: string;
    owner: PublicConsultationOwner;
    voted: boolean;

    constructor(props: Partial<PublicConsultationResponseDTO>) {
        Object.assign(this, { ...props });
    }
}