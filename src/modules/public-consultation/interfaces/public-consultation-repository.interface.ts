import Paginator from "src/core/models/Paginator";
import PublicConsultation from "../schemas/public-consultation.schema";

export const PUBLIC_CONSULTATION_REPOSITORY_TOKEN = 'IPublicConsultationRepository';

export interface IPublicConsultationRepository {
    save(record: PublicConsultation): Promise<boolean>;
    findById(identifier: string): Promise<PublicConsultation>;
    deleteById(identifier: string): Promise<boolean>;
    findAll(paginator: Paginator): Promise<PublicConsultation[]>;
}