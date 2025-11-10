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
                'n.TRAFFIC as traffic',
                'n.MAX_SPEED as maxSpeed'
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

        async getNeighbors(fromNode: string, maxSpeed: number): Promise<Neighbor[]> {
            const functionCall = `GETNEIGHBORHOOD_PATH(?)`; 

            let neighbors = await db
                .select([
                    'N.FROM_ID as fromNode',
                    'N.TO_ID as toNode',
                    'N.WEIGHT as weight'
                ])
                .from(db.raw(`${functionCall} AS N`, [maxSpeed]))
                .where('N.FROM_ID', fromNode);

            if (neighbors.length === 0) {
                neighbors = await db
                .select([
                    'N.FROM_ID as fromNode',
                    'N.TO_ID as toNode',
                    'N.WEIGHT as weight'
                ])
                .from(db.raw(`${functionCall} AS N`, [maxSpeed]))
                .where('N.TO_ID', fromNode);
            }

            return neighbors;
        }

        async getTransport(transportName: string): Promise<Transport> {
            const transport = await (await db('TRANSPORT as T')
                .select([
                    'T.ID as id',
                    'T.MODEL as model',
                    'T.MAX_SPEED as maxSpeed',
                ])
                .where('T.MODEL', transportName)
            )[0];

            return transport;
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