
export default interface INullaryUseCase<Output> {
    execute(): Promise<Output>;
}