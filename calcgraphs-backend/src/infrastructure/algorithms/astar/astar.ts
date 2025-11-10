import { ResultPath } from "../../../domain/interfaces/astar";
import { Coordinate } from "../../../domain/interfaces/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

function calculateH(fromNodeCoordinate: Coordinate, finalNodeCoordinate: Coordinate, cost: number): number {
    const xHeuristic = Math.pow((fromNodeCoordinate.x - finalNodeCoordinate.x), 2);
    const yHeuristic = Math.pow((fromNodeCoordinate.y - finalNodeCoordinate.y), 2);
    const dpx = Math.sqrt(xHeuristic + yHeuristic);
    const vAvg = dpx / cost;

    return dpx / vAvg;
};

export async function astar(start: string, final: string, maxSpeed: number): Promise<ResultPath[]> {
    const repository = new NeighborhoodRepository();
    const finalNodeCoordinate = await repository.getCoordinate(final);
    
    let fromNode = start;
    const path: ResultPath[] = [];

    let i = 0;

    while (fromNode != final) {
        if (i === 10) break;
       
        const neighbors = await repository.getNeighbors(fromNode, maxSpeed);
        
        const shortNeighbor: ResultPath = {
            fn: 100000000000000000,
            fromNode: '',
            toNode: '',
            weight: 0,
            logInformation: ''
        };

        for (const n of neighbors) {
            const fromNodeCoordinate = await repository.getCoordinate(fromNode === n.toNode ? n.toNode : fromNode);
            const toNodeCoordinate = await repository.getCoordinate(fromNode === n.toNode ? n.fromNode : n.toNode);
            const heuristic = calculateH(fromNodeCoordinate, finalNodeCoordinate, n.weight);
            const fn = n.weight + heuristic;

            if (fn < shortNeighbor.fn) {
                const informations = await repository.getPathInformation(
                    n.fromNode,
                    n.toNode
                );
                shortNeighbor.fromNode = fromNodeCoordinate.node;
                shortNeighbor.toNode = toNodeCoordinate.node;
                shortNeighbor.fn = fn;
                shortNeighbor.weight = n.weight;
                shortNeighbor.logInformation = `A via de ${shortNeighbor.fromNode} até ${shortNeighbor.toNode} leva ${n.weight} minutos. A via apresenta velocidade máxima de ${informations.maxSpeed}km/h, Intensidade do tráfego em ${informations.traffic} e a distância de ${informations.distance}km`;
            }
        }

        if (shortNeighbor.fromNode.length && shortNeighbor.toNode.length) {
            path.push(shortNeighbor);
            fromNode = shortNeighbor.toNode;
        }

        i++;
    }

    return path;
}