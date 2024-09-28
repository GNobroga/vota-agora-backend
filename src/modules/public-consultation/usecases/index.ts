import CreatePublicConsultationUseCase from "./create-public-consultation.usecase";
import DeletePublicConsultationUseCase from "./delete-public-consultation-by-id.usecase";
import FindAllPublicConsultationUseCase from "./find-all-public-consultation.usecase";
import RegisterVotePublicConsultationUseCase from "./register-vote-public-consultation.usecase";
import UpdatePublicConsultationUseCase from "./update-public-consultation.usecase";

export default [
    CreatePublicConsultationUseCase,
    DeletePublicConsultationUseCase,
    FindAllPublicConsultationUseCase,
    UpdatePublicConsultationUseCase,
    RegisterVotePublicConsultationUseCase
];