import { NeighborhoodEntity } from "../entities/neighborhood";
import { NeighborhoodPathEntity } from "../entities/neighborhoodPath";

export type Coordinate = {
    x: number;
    y: number;
    node: string;
}

export type PathInformation = {
    start: string;
    end: string;
    distance: number;
    traffic: number;
    maxSpeed: number;
}

export type Neighbor = {
    fromNode: string;
    toNode: string;
    weight: number;
}

export type Transport = {
    id: number;
    model: string;
    maxSpeed: number;
}

export interface INeighborhoodRepository {
    get: () => Promise<NeighborhoodEntity[]>;
    getPaths: () => Promise<NeighborhoodPathEntity[]>;
    getCoordinate: (nodeName: string) => Promise<Coordinate>;
    getNeighbors: (fromNode: string, maxSpeed: number) => Promise<Neighbor[]>;
    getTransport: (transportName: string) => Promise<Transport>;
    getPathInformation: (start: string, final: string) => Promise<PathInformation>;
}