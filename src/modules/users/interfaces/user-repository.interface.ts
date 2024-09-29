import Paginator from "src/core/models/Paginator";
import { User } from "../user.schema";

export const USER_REPOSITORY_TOKEN = 'IUserRepository';

export interface IUserRepository {
    create(record: User): Promise<User>;
    findByDocument(document: string): Promise<User | null>;
    findAll(paginator: Paginator): Promise<User[]>;
    findById(identifier: string): Promise<User | null>;
}