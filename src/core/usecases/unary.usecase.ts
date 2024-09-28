
export default interface IUnaryUseCase<Input> {
    execute(input: Input): void;
}