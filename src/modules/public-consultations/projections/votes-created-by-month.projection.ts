import { ViewColumn, ViewEntity } from "typeorm";
import Vote from "../entities/vote-count.entity";

@ViewEntity({
    expression: dataSource => {
        return dataSource.createQueryBuilder()
            .select("strftime('%Y', vote.created_at) AS year")
            .addSelect("strftime('%m', vote.created_at) AS month")  
            .addSelect("COUNT(*) AS totalCreated") 
            .from(Vote, 'vote')
            .where("strftime('%Y', vote.created_at) = strftime('%Y', 'now')")  
            .groupBy("strftime('%Y', vote.created_at), strftime('%m', vote.created_at)") 
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
    totalCreated: number;
}