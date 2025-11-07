import { NeighborhoodEntity } from "../entities/neighborhood";
import { NeighborhoodPathEntity } from "../entities/neighborhoodPath";

export interface INeighborhoodRepository {
    get: () => Promise<NeighborhoodEntity[]>;
    getPaths: () => Promise<NeighborhoodPathEntity[]>;
}