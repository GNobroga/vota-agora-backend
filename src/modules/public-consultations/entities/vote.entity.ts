import AbstractEntity from "src/infrastructure/entities/abstract-entity.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import PublicConsultation from "./public-consultation.entity";
import User from "src/modules/users/user.entity";

@Entity({ name: "tb_votes"})
export default class Vote extends AbstractEntity {
    
    @ManyToOne(() => PublicConsultation)
    @JoinColumn({ name: 'public_consultation_id'})
    publicConsultation: PublicConsultation;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text' })
    rewardTokenAcquired: string;

    @Column({ type: 'boolean', default: false, })
    received: boolean; // Pra indicar que foi recebido por meio de um voto de outra pessoa.
}