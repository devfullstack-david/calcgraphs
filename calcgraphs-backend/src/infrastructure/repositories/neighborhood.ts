import { NeighborhoodEntity } from "../../domain/entities/neighborhood";
import { INeighborhoodRepository } from "../../domain/interfaces/neighborhood";
import db from "../connection";

export class NeighborhoodRepository
    implements INeighborhoodRepository {
        async get(): Promise<NeighborhoodEntity[]> {
            const neighborhoods = await db("NEIGHBORHOOD").select("*");
            return neighborhoods;
        }
    }