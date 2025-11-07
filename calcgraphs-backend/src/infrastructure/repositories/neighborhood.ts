import { NeighborhoodEntity } from "../../domain/entities/neighborhood";
import { NeighborhoodPathEntity } from "../../domain/entities/neighborhoodPath";
import { INeighborhoodRepository } from "../../domain/interfaces/neighborhood";
import db from "../connection";

export class NeighborhoodRepository
    implements INeighborhoodRepository {
        async get(): Promise<NeighborhoodEntity[]> {
            const neighborhoods = await db("NEIGHBORHOOD as n").select([
                'n.NAME as name',
                'n.COORDINATE_ID as coordinateId',
                'c.AXIS_X as x',
                'c.AXIS_Y as y',
            ])
            .innerJoin('COORDINATE as c', 'c.ID', 'n.COORDINATE_ID');

            return neighborhoods;
        }

        async getPaths(): Promise<NeighborhoodPathEntity[]> {
            const paths = await db("NEIGHBORHOOD_PATH as n").select([
                'n.FROM_ID as start',
                'n.TO_ID as end',
                'n.DISTANCE as distance',
                'n.TRAFFIC as traffic',
                'n.MAX_SPEED as maxSpeed'
            ]);

            return paths;
        }
    }