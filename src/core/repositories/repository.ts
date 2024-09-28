export interface IRepository<Type> {
    create(record: Type): Type | Promise<Type>;
}