import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import VotesCreatedByMonthProjection from "../projections/votes-created-by-month.projection";

interface Input {
    loggedUserId: number;
}

@Injectable()
export default class GetVotesCreatedByMonthUseCase {
    constructor(
        @InjectDataSource()
        readonly dataSource: DataSource,
    ) {}

    async execute({ loggedUserId }: Input) {
        return this.dataSource.getRepository(VotesCreatedByMonthProjection).find({
            where: {
                ownerId: loggedUserId,
            },
        });
    }
}