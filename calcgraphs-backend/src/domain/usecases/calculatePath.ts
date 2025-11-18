import { CalculatePathProps, Result } from "../interfaces/calculatePath";

export class CalculatePathUseCase {
    constructor (
        private readonly algorithm: Function,
    ) {}

    async execute(props: CalculatePathProps): Promise<Result[]> {
        const response = await this.algorithm(props.start, props.final);
        return response;
    }
};