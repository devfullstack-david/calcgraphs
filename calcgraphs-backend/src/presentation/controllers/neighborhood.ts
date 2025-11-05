import { Request, Response } from "express";
import { IController } from "../../domain/interfaces/controller";
import { GetNeighborhoodFactory } from "../../application/neighborhood";

export class GetNeighborhoodController 
    implements IController<void> {
        async handle(req: Request, res: Response): Promise<void> {
            try {
                const useCase = new GetNeighborhoodFactory();
                const response = await useCase.handle();

                res.status(201).json({
                    items: response,
                })
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
        }
    }