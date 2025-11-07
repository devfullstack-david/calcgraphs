import { NeighborhoodEntity } from "../domain/entities/neighborhood";
import { NeighborhoodPathEntity } from "../domain/entities/neighborhoodPath";
import { IFactory } from "../domain/interfaces/factory";
import { GetNeighborhoodUseCase, GetPathsUseCase } from "../domain/usecases/neighborhood";
import { NeighborhoodRepository } from "../infrastructure/repositories/neighborhood";

const repository = new NeighborhoodRepository();

export class GetNeighborhoodFactory
    implements IFactory<null, NeighborhoodEntity[]> {
        async handle(): Promise<NeighborhoodEntity[]> {
            const useCase = await new GetNeighborhoodUseCase(
                repository
            );

            return await useCase.execute();
        }
    }

export class GetNeighborhoodPathFactory
    implements IFactory<null, NeighborhoodPathEntity[]> {
        async handle(): Promise<NeighborhoodPathEntity[]> {
            const useCase = await new GetPathsUseCase(
                repository
            );

            return await useCase.execute();
        }
    }