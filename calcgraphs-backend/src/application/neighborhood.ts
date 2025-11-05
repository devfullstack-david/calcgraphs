import { NeighborhoodEntity } from "../domain/entities/neighborhood";
import { IFactory } from "../domain/interfaces/factory";
import { GetNeighborhoodUseCase } from "../domain/usecases/neighborhood";
import { NeighborhoodRepository } from "../infrastructure/repositories/neighborhood";

export class GetNeighborhoodFactory
    implements IFactory<null, NeighborhoodEntity[]> {
        async handle(): Promise<NeighborhoodEntity[]> {
            const useCase = await new GetNeighborhoodUseCase(
                new NeighborhoodRepository()
            );

            return await useCase.execute();
        }
    }