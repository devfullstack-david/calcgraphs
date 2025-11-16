import { ResultPath } from "../interfaces/astar";
import { CalculatePathProps } from "../interfaces/calculatePath";
import { INeighborhoodRepository } from "../interfaces/neighborhood";

export class CalculatePathUseCase {
    constructor (
        private readonly algorithm: Function,
    ) {}

    async execute(props: CalculatePathProps): Promise<ResultPath[]> {
        const response = await this.algorithm(props.start, props.final);
        return response;
    }
};