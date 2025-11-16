import { NeighborhoodEntity } from "../../domain/entities/neighborhood";
import { NeighborhoodPathEntity } from "../../domain/entities/neighborhoodPath";
import { Coordinate, INeighborhoodRepository, Neighbor, PathInformation, Transport } from "../../domain/interfaces/neighborhood";
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
            ]);

            return paths;
        }

        async getCoordinate(nodeName: string): Promise<Coordinate> {
            const coordinates = await db("NEIGHBORHOOD as N")
                .select([
                    'N.NAME as node',
                    'C.AXIS_Y as y',
                    'C.AXIS_X as x'
                ])
                .innerJoin('COORDINATE as c', 'c.ID', 'n.COORDINATE_ID')
                .where('N.NAME', nodeName);

            return coordinates[0]; 
        }

        async getNeighbors(fromNode: string): Promise<Neighbor[]> {
            let neighbors = await db
                .select([
                    'N.FROM_ID as fromNode',
                    'N.TO_ID as toNode',
                    'N.DISTANCE as distanec'
                ])
                .from('dbo.NEIGHBORHOOD_PATH as N')
                .where('N.FROM_ID', fromNode);

            return neighbors;
        }

        async getPathInformation(start: string, final: string): Promise<PathInformation> {
            const path = await db("NEIGHBORHOOD_PATH as n").select([
                'n.FROM_ID as start',
                'n.TO_ID as end',
                'n.DISTANCE as distance',
                'n.TRAFFIC as traffic',
                'n.MAX_SPEED as maxSpeed'
            ])
            .where('n.FROM_ID', start)
            .andWhere('n.TO_ID', final);

            return path[0];
        }
    }