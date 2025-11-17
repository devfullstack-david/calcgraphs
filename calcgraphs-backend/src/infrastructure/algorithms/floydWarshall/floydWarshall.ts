import { Neighborhood } from "../../../domain/interfaces/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood";

const repo = new NeighborhoodRepository();

async function initializeMatrix(data: Neighborhood[]): Promise<number[][]> {
    const dataQtd = data.length;
    const matrix: number[][] = Array.from({ length: dataQtd + 1 }, () =>
        Array(dataQtd + 1).fill(Infinity)
    );

    for (let id = 1; id <= dataQtd; id++) {
        matrix[id][id] = 0;
    }

    for (let i = 1; i <= dataQtd; i++) {
        matrix[i] = [];

        for (let j = 1; j <= dataQtd; j++) {
            if (i == j) {
                matrix[i][j] = 0;
                continue;
            };

            const pathInformation = await repo.getPathInformation(
                data.find(item => item.id === i)!.name, 
                data.find(item => item.id === j)!.name
            );

            if (pathInformation) matrix[i][j] = pathInformation.distance;
            else if (!pathInformation) matrix[i][j] = Infinity;
        }
    }

    return matrix;
}

export async function floydWarshall(start: string, final: string): Promise<void> {
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

    const path = reconstructPath(start, final, nextMatrix, neighborhoodsData);

    console.log("Caminho encontrado: ", path);
}

function reconstructPath(start: string, final: string, next: any[][], data: Neighborhood[]): String[] | null {
    const startId = data.find((item) => item.name === start)?.id;
    const finalId = data.find((item) => item.name === final)?.id;

    if (!startId || !finalId) throw new Error("Um dos bairros informados não existem");
    if (next[startId][finalId] === null) return null;

    const pathIds = [startId];
    let current = startId;

    while(current != finalId) {
        current = next[current][finalId];

        if (current === null) return null;

        pathIds.push(current);
    }

    return pathIds.map(id => {
        const item = data.find(d => d.id === id);
        if (!item) throw new Error(`ID ${id} não encontrado na lista de bairros`);
        return item.name;
    });
}