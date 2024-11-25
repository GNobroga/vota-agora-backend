import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import VotesCreatedByMonthProjection from "../projections/votes-created-by-month.projection";

@Injectable()
export default class GetVotesCreatedByMonthUseCase {
    constructor(
        @InjectDataSource()
        readonly dataSource: DataSource,
    ) {}

    async execute() {
        return this.dataSource.getRepository(VotesCreatedByMonthProjection).find();
    }
}