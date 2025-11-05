export interface IFactory<P, R> {
    handle(params: P): Promise<R>
}