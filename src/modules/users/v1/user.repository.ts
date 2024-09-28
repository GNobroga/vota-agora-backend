import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRepository } from "src/core/repositories/repository";
import { User } from "./user.schema";

@Injectable()
export default class UserRepository implements IRepository<User> {

    constructor(
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async create(record: User): Promise<User> {
       const createdUser = await this._userModel.create(record);
        return await createdUser.save();
    }

}