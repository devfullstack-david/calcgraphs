import { NeighborhoodEntity } from "../entities/neighborhood";
import { NeighborhoodPathEntity } from "../entities/neighborhoodPath";
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

export class GetPathsUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository,
    ) {}

    async execute(): Promise<NeighborhoodPathEntity[]> {
        const paths = await this.neighborhoodRepository.getPaths();

        return paths;
    }
}