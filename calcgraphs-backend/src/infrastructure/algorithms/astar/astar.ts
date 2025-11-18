import { Result } from "../../../domain/interfaces/calculatePath";
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

export async function astar(start: string, final: string): Promise<Result[]> {
    const repository = new NeighborhoodRepository();
    let result: Result[] = [];

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
            result = reconstructPath(current, closedList);
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

    return result;
}

function reconstructPath(goalNode: NodeInfo, closedList: NodeInfo[]): Result[] {
    const result: Result[] = new Array(closedList.length);
    let beforeNode = goalNode.beforeNode;
    
    for (let i = closedList.length - 1; i >= 0; i--) {
        const node = closedList.find((item) => item.name === beforeNode);

        if (!node) throw new Error('Ocorreu um erro na construção do caminho no A*');

        if (!node.beforeNode) break;

        result[i] = {
            fromNode: node.beforeNode!,
            toNode: node.name,
            weight: node.f,
            logInformation: `Com o peso de ${node.f} o melhor caminho foi de ${node.beforeNode} até ${node.name}`
        };

        beforeNode = node.beforeNode;
    };

    result.push({
        fromNode: goalNode.beforeNode!,
        toNode: goalNode.name,
        weight: goalNode.f,
        logInformation: `Com o peso de ${goalNode.f} o melhor caminho foi de ${goalNode.beforeNode} até ${goalNode.name}`
    });
    
    return result.filter((item) => item.fromNode);
}