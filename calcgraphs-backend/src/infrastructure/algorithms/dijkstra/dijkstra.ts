import { Result } from "../../../domain/interfaces/calculatePath";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

const repo = new NeighborhoodRepository();

export async function dijkstra(start: string, final: string): Promise<Result[]> {
    const paths = await repo.getPaths();
    const neighborhoods = await repo.getNeighborhoodsData();

    const dist = new Array(28).fill(Infinity);
    const previous = new Array(28).fill(null);
    const visiteds = new Array(28).fill(null);

    const adj: { to: number, weight: number }[][] = [];

    neighborhoods.forEach((n) => {
        const pathsFiltered = paths.filter((p) => p.start === n.name);
        adj[n.id] = [];

        pathsFiltered.forEach((pf) => {
            adj[n.id].push({
                to: neighborhoods.find((neighbor) => neighbor.name === pf.end)!.id,
                weight: pf.distance
            })
        });
    });

    const startId = neighborhoods.find(n => n.name === start)!.id;
    const finalId = neighborhoods.find(n => n.name === final)!.id;

    dist[startId] = 0;

    for (let i = 1; i <= 27; i++) {
        let u = -1;
        let minDist = Infinity;

        for (let vid = 1; vid <= 27; vid++) {
            if (!visiteds[vid] && dist[vid] < minDist) {
                minDist = dist[vid];
                u = vid;
            }
        }

        if (u === -1) break;

        visiteds[u] = true;

        for (const edge of adj[u]) {
            const v = edge.to;
            const weight = edge.weight;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                previous[v] = u;
            }
        }
    }

    const path: number[] = [];
    let current = finalId;

    while (current !== null) {
        path.push(current);
        current = previous[current];
    }

    path.reverse();

    const result: Result[] = [];

    path.forEach((p, index) => {
        const fromNodeName = neighborhoods.find((n) => n.id === p)!.name;
        if (fromNodeName === final) return;
        
        const toNodeName = neighborhoods.find((n) => n.id === path[index + 1])!.name;
        
        const weight = paths.find((p) => p.start === fromNodeName && p.end === toNodeName)!.distance; 
        
        result.push({
            fromNode: fromNodeName,
            toNode: toNodeName,
            weight,
            logInformation: `Com o peso de ${weight}km o algoritmo calculou ir de ${fromNodeName} até ${toNodeName}`
        });
    });
    
    
    return result;
}