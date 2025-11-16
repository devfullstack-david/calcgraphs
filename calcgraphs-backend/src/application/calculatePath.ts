import { ResultPath } from "../domain/interfaces/astar";
import { CalculatePathProps } from "../domain/interfaces/calculatePath";
import { IFactory } from "../domain/interfaces/factory";
import { CalculatePathUseCase } from "../domain/usecases/calculatePath";
import { astar } from "../infrastructure/algorithms/astar/astar";

export class CalculatePathFactory
    implements IFactory<CalculatePathProps, ResultPath[]> {
        async handle(params: CalculatePathProps): Promise<ResultPath[]> {
            const useCase = await new CalculatePathUseCase(
                astar,
            );

            return await useCase.execute(params);
        }
    }