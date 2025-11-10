import { Request, Response } from "express";
import { IController } from "../../domain/interfaces/controller";
import { CalculatePathFactory } from "../../application/calculatePath";

export class CalculatePathController
    implements IController<void> {
        async handle(req: Request, res: Response): Promise<void> {
            try {
                const start = req.query.start;
                const final = req.query.final;
                const transport = req.query.transport;
                const algorithm = req.query.algorithm;
                const useCase = new CalculatePathFactory();
                const response = await useCase.handle({
                    start: start as string,
                    final: final as string,
                    transport: transport as string,
                    algorithm: algorithm as string,
                });

                console.log(response);

                res.status(201).json({ items: response });
            } catch (error) {
                res.status(400).json({ error, })
            }
        }
    }