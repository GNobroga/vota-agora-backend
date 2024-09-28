export interface IRepository<T> {
    create(record: T): T | Promise<T>;
}