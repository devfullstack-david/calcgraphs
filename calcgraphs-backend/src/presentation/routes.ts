import { Router } from "express";
import { GetNeighborhoodController } from "./controllers/neighborhood";

const router = Router();

router.get('/neighborhood', (req, res) => new GetNeighborhoodController().handle(req, res));

export default router;