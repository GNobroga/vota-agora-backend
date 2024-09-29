
export default interface IUnaryUseCase<Input> {
    execute(input: Input): Promise<void>;
}