import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import Paginator from "src/core/models/Paginator";

export const USER_REPOSITORY_TOKEN = 'IUserRepository';

export interface IUserRepository {
    create(record: User): Promise<User>;
    findByDocument(document: string): Promise<User | null>;
    findAll(paginator: Paginator): Promise<User[]>;
}

@Injectable()
export default class UserRepository implements IUserRepository {

    constructor(
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async findAll(paginator: Paginator): Promise<User[]> {
        const skip = (paginator.page - 1) * paginator.size; 
        const users = await this._userModel.find()
            .sort({ '_id': paginator.sort === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(paginator.size).exec(); 
        return users;
    }

    async findByDocument(document: string): Promise<User | null> {
       try {
            const result = await this._userModel.findOne({ document });
            return result.toObject();
       } catch(error) {
            return null;
       }
    }

    async create(record: User): Promise<User> {
       const createdUser = await this._userModel.create(record);
        return await createdUser.save();
    }

}