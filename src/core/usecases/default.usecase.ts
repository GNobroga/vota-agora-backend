
export default interface IDefaultUseCase<Input, Output = Input> {
    execute(input: Input): Promise<Output>;
}