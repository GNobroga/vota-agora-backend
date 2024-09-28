import IDefaultUseCase from "src/core/usecases/default.usecase";
import { User } from "../user.schema";
import { Injectable } from "@nestjs/common";
import { IRepository } from "src/core/repositories/repository";

@Injectable()
export default class CreateUserUseCase implements IDefaultUseCase<User> {
    
    constructor(private readonly _userRepository: IRepository<User>) {}
    
    async execute(input: User): Promise<User> {
        return await this._userRepository.create(input);
    }

}