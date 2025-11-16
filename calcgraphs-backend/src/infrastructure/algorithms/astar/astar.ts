import { ResultPath } from "../../../domain/interfaces/astar";
import { Coordinate } from "../../../domain/interfaces/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

type NodeInfo = {
    name: string;
    g: number;
    h: number;
    f: number;
    beforeNode: string | null;
}

// Considerando 1px = 0.02km
function calculateH(a: Coordinate, b: Coordinate): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy) * 0.02;
};

export async function astar(start: string, final: string): Promise<ResultPath[]> {
    const repository = new NeighborhoodRepository();

    const startCoordinateInformation = await repository.getCoordinate(start);
    const finalCoordinateInformation = await repository.getCoordinate(final);

    const openList: NodeInfo[] = [];
    const closedList: NodeInfo[] = [];

    const hStart = calculateH(startCoordinateInformation, finalCoordinateInformation)

    openList.push({
        name: start,
        g: 0,
        h: hStart,
        f: hStart,
        beforeNode: null
    });

    while (openList.length > 0) {
        let current = openList[0];

        for (const node of openList) {
            if (node.f < current.f) current = node;
        }

        if (current.name === final) {
            reconstructPath(current, closedList);
            break;
        }

        openList.splice(openList.indexOf(current), 1);
        closedList.push(current);
        
        const neighbors = await repository.getNeighbors(current.name);

        for (const n of neighbors) {
            const neighborName = n.toNode;

            const closed = closedList.find(nd => nd.name === neighborName);
            if (closed) continue;

            const coord = await repository.getCoordinate(neighborName);
            const tentativeG = current.g + n.weight;
            
            let neighborNode = openList.find(nd => nd.name === neighborName);

            if (!neighborNode) {
                const h = calculateH(coord, finalCoordinateInformation);
                neighborNode = {
                    name: neighborName,
                    g: tentativeG,
                    h,
                    f: tentativeG + h,
                    beforeNode: current.name
                };
                openList.push(neighborNode);
            } else if (tentativeG < neighborNode.g) {
                neighborNode.g = tentativeG;
                neighborNode.f = tentativeG + neighborNode.h;
                neighborNode.beforeNode = current.name;
            }
        }
    }

    return [];
}

function reconstructPath(goalNode: NodeInfo, closedList: NodeInfo[]) {
    console.log(goalNode, closedList);
}