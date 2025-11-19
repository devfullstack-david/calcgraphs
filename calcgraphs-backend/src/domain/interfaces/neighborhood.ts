import { NeighborhoodEntity } from "../entities/neighborhood";
import { NeighborhoodPathEntity } from "../entities/neighborhoodPath";

export type Coordinate = {
    x: number;
    y: number;
    node: string;
};

export type PathInformation = {
    start: string;
    end: string;
    distance: number;
};

export type Neighbor = {
    fromNode: string;
    toNode: string;
    weight: number;
};

export type Transport = {
    id: number;
    model: string;
    maxSpeed: number;
};

export type Neighborhood = {
    name: string;
    id: number;
    coordinateId: number;
};

export interface INeighborhoodRepository {
    get: () => Promise<NeighborhoodEntity[]>;
    getPaths: () => Promise<NeighborhoodPathEntity[]>;
    getCoordinate: (nodeName: string) => Promise<Coordinate>;
    getNeighbors: (fromNode: string) => Promise<Neighbor[]>;
    getPathInformation: (start: string, final: string) => Promise<PathInformation | undefined>;
    getNeighborhoodsData: () => Promise<Neighborhood[]>;
    getPathsInformations: () => Promise<PathInformation[]>;
}