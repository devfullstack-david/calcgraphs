import { ResultPath } from "../interfaces/astar";
import { CalculatePathProps } from "../interfaces/calculatePath";
import { INeighborhoodRepository } from "../interfaces/neighborhood";

export class CalculatePathUseCase {
    constructor (
        private readonly algorithm: Function,
        private readonly repository: INeighborhoodRepository,
    ) {}

    async execute(props: CalculatePathProps): Promise<ResultPath[]> {
        const transportData = await this.repository.getTransport(props.transport);
        const response = await this.algorithm(props.start, props.final, transportData.maxSpeed);
        return response;
    }
};