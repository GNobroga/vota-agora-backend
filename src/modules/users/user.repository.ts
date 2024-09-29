import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import Paginator from "src/core/models/Paginator";
import { IUserRepository } from "./interfaces/user-repository.interface";

@Injectable()
export default class UserRepository implements IUserRepository {

    constructor(
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async findById(identifier: string): Promise<User | null> {
        try {
            return (await this._userModel.findById(identifier)).toObject();
        } catch {
            return null;
        }
    }

    async findAll(paginator: Paginator): Promise<User[]> {
        const skip = (paginator.page - 1) * paginator.size; 
        const users = await this._userModel.find()
            .sort({ '_id': paginator.sort === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(paginator.size); 
        return users.map(doc => doc.toObject());
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