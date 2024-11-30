import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IUnaryUseCase from "src/core/usecases/unary.usecase";
import { Repository } from "typeorm";
import User from "../user.entity";

interface Input {
    userId: number;
    fullName: string;
    document: string;
    imageUrl?: string;
}

export default class UpdateUserProfileUseCase implements IUnaryUseCase<Input> {

    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {}
    async execute({ userId, ...record }: Input): Promise<void> {
        const user = await this.repository.findOne({ where: { id: userId }});
        if (!user) {
            throw new NotFoundException(`Usuário com ${userId} não encontrado.`);
        }
        
        await this.repository.update({
            id: userId,
        }, { 
            ...record,
        });
    }
}