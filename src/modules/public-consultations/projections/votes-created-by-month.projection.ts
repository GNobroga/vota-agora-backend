import { ViewColumn, ViewEntity } from "typeorm";
import Vote from "../entities/vote.entity";

@ViewEntity({
    expression: dataSource => {
        return dataSource.createQueryBuilder()
            .select("strftime('%Y', vote.created_at) AS year")
            .addSelect("strftime('%m', vote.created_at) AS month")  
            .addSelect("strftime('%d', vote.created_at) AS day")  
            .addSelect("COUNT(*) AS totalCreated") 
            .addSelect("vote.user_id", "ownerId")
            .from(Vote, 'vote')
            .where("strftime('%Y', vote.created_at) = strftime('%Y', 'now')")  
            .groupBy("vote.user_id, strftime('%Y', vote.created_at), strftime('%m', vote.created_at)") 
            .orderBy("year", "ASC")
            .addOrderBy("month", "ASC");
    },
})
export default class VotesCreatedByMonthProjection {
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