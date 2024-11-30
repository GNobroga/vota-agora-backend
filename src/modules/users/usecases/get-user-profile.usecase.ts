import { InjectRepository } from "@nestjs/typeorm";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import User from "../user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

interface Input {
    id: number;
}

export interface Output {
    userId: number;
    fullName: string;
    imageUrl: string;
    document: string;
}

export default class GetUserProfileUseCase implements IDefaultUseCase<Input, Output>{

    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {}
    async execute({ id }: Input): Promise<Output> {
        const user = await this.repository.findOne({ where: { id }});
        if (!user) {
            throw new NotFoundException(`Usuário com ${id} não encontrado.`);
        }
        return {
            userId: id,
            fullName: user.fullName,
            imageUrl: user.imageUrl,
            document: user.document,
        };
    }

}