import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PublicConsultationCreatedByMonthProjection } from "../projections/public-consultation-created-by-month.projection";

interface Input {
    loggedUserId: number;
}

@Injectable()
export default class GetPublicConsultationCreatedByMonthUseCase {

    constructor(
        @InjectDataSource()
        readonly dataSource: DataSource,
    ) {}

    async execute({ loggedUserId }: Input) {
        return this.dataSource.getRepository(PublicConsultationCreatedByMonthProjection).find({
            where: {
                ownerId: loggedUserId,
            },
        });
    }
}