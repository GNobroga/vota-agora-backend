import AbstractEntity from "src/infrastructure/entities/abstract-entity.entity";
import User from "src/modules/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'tb_public_consultation' })
export default class PublicConsultation extends AbstractEntity {

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ type: 'date' })
    initialDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

}   