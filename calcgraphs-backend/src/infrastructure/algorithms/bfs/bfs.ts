import { Result } from "../../../domain/interfaces/calculatePath";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

const repo = new NeighborhoodRepository();

export async function bfs(start: string, final: string): Promise<Result[]> {
    const paths = await repo.getPaths();
    const neighborhoods = await repo.getNeighborhoodsData();

    const previous = new Array(28).fill(null);
    const visited = new Array(28).fill(false);

    const adj: { to: number, weight: number }[][] = [];

    neighborhoods.forEach((n) => {
        const filtered = paths.filter((p) => p.start === n.name);
        adj[n.id] = [];

        filtered.forEach((pf) => {
            adj[n.id].push({
                to: neighborhoods.find((nb) => nb.name === pf.end)!.id,
                weight: pf.distance
            });
        });
    });

    const startId = neighborhoods.find(n => n.name === start)!.id;
    const finalId = neighborhoods.find(n => n.name === final)!.id;

    const queue: number[] = [];
    queue.push(startId);
    visited[startId] = true;

    while (queue.length > 0) {
        const u = queue.shift()!;

        if (u === finalId) break;

        for (const edge of adj[u]) {
            const v = edge.to;

            if (!visited[v]) {
                visited[v] = true;
                previous[v] = u;
                queue.push(v);
            }
        }
    }

    if (!visited[finalId]) {
        return [];
    }

    const path: number[] = [];
    let current = finalId;

    while (current !== null) {
        path.push(current);
        current = previous[current];
    }

    path.reverse();

    const results: Result[] = [];

    let totalDistance = 0;

    for (let i = 0; i < path.length; i++) {
        const id = path[i];
        const nextId = path[i + 1];

        if (i > 0) {
            const prev = path[i - 1];

            const edge = adj[prev].find(e => e.to === id);
            if (edge) {
                totalDistance += edge.weight;
            }
        }

        const fromNodeName = neighborhoods.find(n => n.id === id)!.name;
        if (fromNodeName === final) break;
        
        const toNodeName = neighborhoods.find(n => n.id === nextId)!.name;
        const weight = paths.find((p) => p.end === toNodeName && p.start === fromNodeName)!.distance;

        results.push({
            fromNode: fromNodeName,
            toNode: toNodeName,
            weight,
            logInformation: `Com o peso de ${weight}km o algoritmo calculou ir de ${fromNodeName} até ${toNodeName}`
        });
    }

    return results;
}
