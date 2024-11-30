import { ViewColumn, ViewEntity } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

@ViewEntity({
    expression: dataSource => {
        return dataSource.createQueryBuilder()
            .select("strftime('%Y', consultation.created_at) AS year") 
            .addSelect("strftime('%m', consultation.created_at) AS month")  
            .addSelect("strftime('%d', consultation.created_at) AS day")
            .addSelect("COUNT(*) AS totalCreated") 
            .addSelect("consultation.owner_id", "ownerId")
            .from(PublicConsultation, "consultation")
            .where("strftime('%Y', consultation.created_at) = strftime('%Y', 'now')")  
            .groupBy("consultation.owner_id, strftime('%Y', consultation.created_at), strftime('%m', consultation.created_at)") 
            .orderBy("year", "ASC")
            .addOrderBy("month", "ASC");
    }
})
export class PublicConsultationCreatedByMonthProjection {
    @ViewColumn()
    year: number;
    @ViewColumn()
    month: number;
    @ViewColumn()
    day: number;
    @ViewColumn()
    totalCreated: number;
    @ViewColumn()
    ownerId: number;
}
