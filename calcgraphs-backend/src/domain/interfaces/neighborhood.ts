import { NeighborhoodEntity } from "../entities/neighborhood";

export interface INeighborhoodRepository {
    get: () => Promise<NeighborhoodEntity[]>;
}