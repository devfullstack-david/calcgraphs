import { CalculatePathProps, Result } from "../domain/interfaces/calculatePath";
import { IFactory } from "../domain/interfaces/factory";
import { CalculatePathUseCase } from "../domain/usecases/calculatePath";
import { astar } from "../infrastructure/algorithms/astar/astar";
import { bellmanFord } from "../infrastructure/algorithms/bellmanFord/bellmanFord";
import { bfs } from "../infrastructure/algorithms/bfs/bfs";
import { dijkstra } from "../infrastructure/algorithms/dijkstra/dijkstra";
import { floydWarshall } from "../infrastructure/algorithms/floydWarshall/floydWarshall";

export class CalculatePathFactory
    implements IFactory<CalculatePathProps, Result[]> {
        async handle(params: CalculatePathProps): Promise<Result[]> {
            let useCase;
            if (params.algorithm === 'a') {
                useCase = await new CalculatePathUseCase(
                    astar,
                );
            } else if (params.algorithm === 'floydWarshall') {
                useCase = await new CalculatePathUseCase(
                    floydWarshall,
                );
            } else if (params.algorithm === 'bellmanFord') {
                useCase = await new CalculatePathUseCase(
                    bellmanFord,
                );
            } else if (params.algorithm === 'dijkstra') {
                useCase = await new CalculatePathUseCase(
                    dijkstra,
                );
            } else if (params.algorithm === 'bfs') {
                useCase = await new CalculatePathUseCase(
                    bfs,
                );
            }
            else {
                throw new Error('Nenhum algoritmo selecionado!');
            }

            return await useCase.execute(params);
        }
    }