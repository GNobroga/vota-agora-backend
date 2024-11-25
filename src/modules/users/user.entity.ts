import AbstractEntity from "src/infrastructure/entities/abstract-entity.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'tb_user' })
export default class User extends AbstractEntity {

    @Column()
    fullName: string;

    @Column()
    document: string;

    @Column()
    password: string;

    @Column()
    accountAddress: string;

    @Column()
    rewardTokenAddress: string;

    @Column()
    privateKey: string;

    @Column({ default: 'ROLE_USER' })
    role: string;
}

