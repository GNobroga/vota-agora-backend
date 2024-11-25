import CreateNewPublicConsultationUseCase from "./create-new-public-consultation.usecase";
import DeletePublicConsultationByIdUseCase from "./delete-public-consultation-by-id.usecase";
import FindAllPublicConsultationUseCase from "./find-all-public-consultation.usecase";
import GetPublicConsultationCreatedByMonthUseCase from "./get-public-consultation-created-by-month.usecase";
import GetVotesCreatedByMonthUseCase from "./get-votes-created-by-month.usecase";
import RegisterVotePublicConsultationUseCase from "./register-vote-public-consultation.usecase";
import UpdatePublicConsultationUseCase from "./update-public-consultation.usecase";

export default [
    CreateNewPublicConsultationUseCase,
    DeletePublicConsultationByIdUseCase,
    FindAllPublicConsultationUseCase,
    RegisterVotePublicConsultationUseCase,
    UpdatePublicConsultationUseCase,
    GetPublicConsultationCreatedByMonthUseCase,
    GetVotesCreatedByMonthUseCase,
];