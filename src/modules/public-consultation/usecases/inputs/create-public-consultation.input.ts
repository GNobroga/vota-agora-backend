export type CreatePublicConsultationInput = {
    userDocument: string;
    title: string;
    description: string;
    initialDate: Date;
    imageUrl?: string;
    endDate: Date;
}