
export default interface IDefaultUseCase<Input, Output> {
    execute(input: Input): Promise<Output>;
}