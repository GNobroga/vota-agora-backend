import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PublicConsultationCreatedByMonthProjection } from "../projections/public-consultation-created-by-month.projection";

@Injectable()
export default class GetPublicConsultationCreatedByMonthUseCase {

    constructor(
        @InjectDataSource()
        readonly dataSource: DataSource,
    ) {}

    async execute() {
        return this.dataSource.getRepository(PublicConsultationCreatedByMonthProjection).find();
    }
}