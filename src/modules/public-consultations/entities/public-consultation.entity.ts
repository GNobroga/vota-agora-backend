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

    @Column({ default: 0 })
    participationCount: number;

    @Column({ default: 'open' })
    status: 'open' | 'closed';

    @Column({ nullable: true })
    category: string;

    @Column({ type: 'datetime' })
    initialDate: Date;

    @Column({ type: 'datetime' })
    endDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

}   