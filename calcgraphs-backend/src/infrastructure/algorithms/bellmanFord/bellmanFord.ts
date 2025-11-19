import { NeighborhoodPathEntity } from "../../../domain/entities/neighborhoodPath";
import { Result } from "../../../domain/interfaces/calculatePath";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

const repository = new NeighborhoodRepository();

export async function bellmanFord(start: string, final: string): Promise<Result[]> {
    const paths = await repository.getPaths();
    const neighborhoods = await repository.getNeighborhoodsData();

    const nameToId = new Map<string, number>();
    const idToName = new Map<number, string>();

    neighborhoods.forEach(n => {
        nameToId.set(n.name, n.id);
        idToName.set(n.id, n.name);
    });

    const totalVertices = 28;
    const dist = new Array(totalVertices).fill(Infinity);
    const parent = new Array(totalVertices).fill(null);

    const startId = nameToId.get(start)!;
    const finalId = nameToId.get(final)!;
    dist[startId] = 0;

    for (let i = 1; i < totalVertices; i++) {
        let updated = false;

        for (const p of paths) {
            const fromNodeId = nameToId.get(p.start)!;
            const toNodeId = nameToId.get(p.end)!;
            const weight = p.distance;

            if (dist[fromNodeId] !== Infinity && dist[fromNodeId] + weight < dist[toNodeId]) {
                dist[toNodeId] = dist[fromNodeId] + weight;
                parent[toNodeId] = fromNodeId;
                updated = true;
            }
        }

        if (!updated) break;
    }

    for (const p of paths) {
        const fromNodeId = nameToId.get(p.start)!;
        const toNodeId = nameToId.get(p.end)!;
        const weight = p.distance;

        if (dist[fromNodeId] !== Infinity && dist[fromNodeId] + weight < dist[toNodeId]) {
            throw new Error("Grafo contém ciclo de peso negativo.");
        }
    }

    if (dist[finalId] === Infinity) return [];

    return reconstructPath(paths, idToName, finalId, parent);
}


function reconstructPath(
    paths: NeighborhoodPathEntity[],
    idToName: Map<number, string>,
    finalNodeId: number,
    parent: number[],
): Result[] {

    const results: Result[] = [];
    let current = finalNodeId;

    while (parent[current] !== null) {
        const fromId = parent[current];
        const fromName = idToName.get(fromId)!;
        const toName = idToName.get(current)!;

        const pathInfo = paths.find(p => p.start === fromName && p.end === toName)!;

        results.push({
            fromNode: fromName,
            toNode: toName,
            weight: pathInfo.distance,
            logInformation: `Aresta ${fromName} → ${toName} com peso ${pathInfo.distance}`
        });

        current = fromId;
    }

    results.reverse();
    return results;
}
