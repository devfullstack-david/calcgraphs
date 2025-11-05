import { Request, Response } from "express";

export interface IController <R> {
    handle(req: Request, res: Response): Promise<R>
}