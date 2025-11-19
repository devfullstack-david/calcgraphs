import { Result } from "../../../domain/interfaces/calculatePath";
import { Neighborhood } from "../../../domain/interfaces/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

const repo = new NeighborhoodRepository();

async function initializeMatrix(data: Neighborhood[]): Promise<number[][]> {
    const dataQtd = data.length;
    const matrix: number[][] = Array.from({ length: dataQtd + 1 }, () =>
        Array(dataQtd + 1).fill(Infinity)
    );

    const pathsInformations = await repo.getPathsInformations();

    for (let id = 1; id <= dataQtd; id++) {
        matrix[id][id] = 0;
    }

    for (let i = 1; i <= dataQtd; i++) {
        for (let j = 1; j <= dataQtd; j++) {
            if (i == j) {
                matrix[i][j] = 0;
                continue;
            };

            const startName = data.find(item => item.id === i)!.name;
            const finalName = data.find(item => item.id === j)!.name;

            const pathInformation = pathsInformations.find((p) => p.start === startName && p.end === finalName);

            if (pathInformation) matrix[i][j] = pathInformation.distance;
            else if (!pathInformation) matrix[i][j] = Infinity;
        }
    }

    return matrix;
}

export async function floydWarshall(start: string, final: string): Promise<Result[]> {
    const neighborhoodsData = await repo.getNeighborhoodsData();
    const dataQtd = neighborhoodsData.length;

    const matrix = await initializeMatrix(neighborhoodsData);
    const nextMatrix: (number | null)[][] = Array.from({ length: dataQtd + 1 }, () =>
        Array(dataQtd + 1).fill(null)
    );

    for (let i = 1; i <= dataQtd; i++) {
        for (let j = 1; j <= dataQtd; j++) {
            if (matrix[i][j] !== Infinity && i !== j) {
                nextMatrix[i][j] = j;
            } else if (i === j) {
                nextMatrix[i][j] = i;
            }
        }
    }

    for (let k = 1; k <= dataQtd; k++) {
        for (let i = 1; i <= dataQtd; i++) {
            for (let j = 1; j <= dataQtd; j++) {
                const newDist = matrix[i][k] + matrix[k][j];

                if (newDist < matrix[i][j]) {
                    matrix[i][j] = newDist;
                    nextMatrix[i][j] = nextMatrix[i][k];
                }
            }
        }
    }

    const path = await reconstructPath(start, final, nextMatrix, neighborhoodsData);

    return path || [];
}

async function reconstructPath(start: string, final: string, next: any[][], data: Neighborhood[]): Promise<Result[] | null> {
    const startId = data.find((item) => item.name === start)?.id;
    const finalId = data.find((item) => item.name === final)?.id;
    const result: Result[] = [];

    if (!startId || !finalId) throw new Error("Um dos bairros informados não existem");
    if (next[startId][finalId] === null) return null;

    const pathIds = [startId];
    let current = startId;

    while(current != finalId) {
        current = next[current][finalId];

        if (current === null) return null;

        pathIds.push(current);
    }

    let i = 0;
    
    while (i <= pathIds.length - 1) {
        const fromNodeInformation = data.find(d => d.id === pathIds[i])!;
        const toNodeInformation = data.find(d => d.id === pathIds[i + 1])!;
        const pathInformation = await repo.getPathInformation(fromNodeInformation.name, toNodeInformation.name);
        
        if (!pathInformation) throw new Error('Houve um problema ao reconstruir o caminho pelo algoritmo de floyd-warshall');

        result.push({
            fromNode: pathInformation.start,
            toNode: pathInformation.end,
            weight: pathInformation.distance,
            logInformation: `Com o peso de ${pathInformation.distance}Km o melhor caminho foi de ${pathInformation.start} até ${pathInformation.end}`
        });

        if (pathInformation.end === final) break;

        i++;
    }

    return result;
}