import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import CreateNewPublicConsultationUseCase, { CreateNewPublicConsultationInput } from "src/modules/public-consultations/usecases/create-new-public-consultation.usecase";

@Injectable()
export default class UserDataSeed {

    constructor(
        readonly createNewPublicConsultationUseCase: CreateNewPublicConsultationUseCase,
    ) {}

    async populate(userId: number) {
        const tomorrow = moment().add(1, "day").toDate(); 

        const initialDates = [
            moment().subtract(10, "days").toDate(),
            moment().subtract(20, "days").toDate(), 
            moment().subtract(15, "days").toDate(), 
            moment().subtract(30, "days").toDate()  
        ];

        const consultations: CreateNewPublicConsultationInput[] = [
            {
                loggedUserId: userId,
                title: "Consulta Pública sobre Mobilidade Urbana",
                description: "Convidamos todos os cidadãos a contribuir com sugestões para melhorar a mobilidade urbana na cidade.",
                imageUrl: "https://localizafrotas-prd.azurewebsites.net/wp-content/uploads/mobilidade-urbana-de-pessoas-em-automoveis-e-bicicletas.jpg.webp",
                endDate: tomorrow,
                initialDate: initialDates[0],
                category: "Mobilidade Urbana"
            },
            {
                loggedUserId: userId,
                title: "Plano Diretor para Habitação",
                description: "Ajude a moldar o novo plano diretor para habitação, garantindo moradias acessíveis para todos.",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqzaM_IghiiAWH2YT68jN59k_pHrdul3Ymw&s",
                endDate: tomorrow,
                initialDate: initialDates[1],
                category: "Habitação"
            },
            {
                loggedUserId: userId,
                title: "Consulta sobre Preservação Ambiental",
                description: "Buscamos opiniões para definir as próximas áreas prioritárias de preservação ambiental.",
                imageUrl: "https://meiosustentavel.com.br/wp-content/uploads/2024/05/top-view-people-caring-mother-nature-scaled.jpg",
                endDate: tomorrow,
                initialDate: initialDates[2],
                category: "Meio Ambiente"
            },
            {
                loggedUserId: userId,
                title: "Revisão da Lei Orgânica Municipal",
                description: "Participe na revisão da lei orgânica, compartilhando suas opiniões sobre governança local.",
                imageUrl: "https://blog-static.infra.grancursosonline.com.br/wp-content/uploads/2020/11/04123933/QUICK-WINS-Lei-Org%C3%A2nica.jpg",
                endDate: tomorrow,
                initialDate: initialDates[3],
                category: "Legislação"
            },
        ];
    
        for (const consultation of consultations) {
            await this.createNewPublicConsultationUseCase.execute(consultation);
        }
    }
}