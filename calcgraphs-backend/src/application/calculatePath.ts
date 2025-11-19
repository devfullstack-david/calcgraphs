import { CalculatePathProps, Result } from "../domain/interfaces/calculatePath";
import { IFactory } from "../domain/interfaces/factory";
import { CalculatePathUseCase } from "../domain/usecases/calculatePath";
import { astar } from "../infrastructure/algorithms/astar/astar";
import { bellmanFord } from "../infrastructure/algorithms/bellmanFord/bellmanFord";
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
            } else {
                useCase = await new CalculatePathUseCase(
                    astar,
                );
            }

            return await useCase.execute(params);
        }
    }