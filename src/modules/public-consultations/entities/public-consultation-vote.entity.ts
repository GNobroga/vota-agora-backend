import AbstractEntity from "src/infrastructure/entities/abstract-entity.entity";
import User from "src/modules/users/user.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import PublicConsultation from "./public-consultation.entity";

@Entity({ name: 'tb_public_consultation_vote' })
export default class PublicConsultationVote extends AbstractEntity {

    @ManyToOne(() => PublicConsultation, { eager: true })
    @JoinColumn({ name: 'public_consultation_id' })
    publicConsultation: PublicConsultation;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}