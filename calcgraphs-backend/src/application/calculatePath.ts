import { ResultPath } from "../domain/interfaces/astar";
import { CalculatePathProps } from "../domain/interfaces/calculatePath";
import { IFactory } from "../domain/interfaces/factory";
import { CalculatePathUseCase } from "../domain/usecases/calculatePath";
import { astar } from "../infrastructure/algorithms/astar/astar";
import { NeighborhoodRepository } from "../infrastructure/repositories/neighborhood";

const repository = new NeighborhoodRepository();

export class CalculatePathFactory
    implements IFactory<CalculatePathProps, ResultPath[]> {
        async handle(params: CalculatePathProps): Promise<ResultPath[]> {
            const useCase = await new CalculatePathUseCase(
                astar,
                repository,
            );

            return await useCase.execute(params);
        }
    }