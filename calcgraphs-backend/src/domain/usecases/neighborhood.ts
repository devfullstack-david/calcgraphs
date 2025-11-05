import { NeighborhoodEntity } from "../entities/neighborhood";
import { INeighborhoodRepository } from "../interfaces/neighborhood";

export class GetNeighborhoodUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository,
    ) {}

    async execute(): Promise<NeighborhoodEntity[]> {
        const neighborhoods = await this.neighborhoodRepository.get();

        return neighborhoods;
    }
}