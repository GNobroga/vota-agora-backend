import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";

@Injectable()
export default class PublicConsultationExpirationCheckerScheduler {

    private static readonly STATUS_OPEN = 'open';
    private static readonly STATUS_CLOSED = 'closed';
    private _logger = new Logger(PublicConsultationExpirationCheckerScheduler.name);

    constructor(
        @InjectRepository(PublicConsultation)
        private _publicConsultationRepository: Repository<PublicConsultation>
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handle() {
        try {
            const listPublicConsultation = await this._publicConsultationRepository.find({
                where: {
                        status: PublicConsultationExpirationCheckerScheduler.STATUS_OPEN,
                        endDate: LessThanOrEqual(new Date()),
                    },
               });
        
               for (const publicConsultation of listPublicConsultation) {
                    publicConsultation.status = PublicConsultationExpirationCheckerScheduler.STATUS_CLOSED;
                    await this._publicConsultationRepository.save(publicConsultation);
                    this._logger.log(`Consulta pública "${publicConsultation.title}" foi fechada.`);
               }
        } catch (error) {
            this._logger.error('Erro ao verificar ou fechar consultas públicas expiradas', error);
        }
    }

}