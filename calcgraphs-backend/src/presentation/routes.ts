import { Router } from "express";
import { GetNeighborhoodController, GetPathsController } from "./controllers/neighborhood";

const router = Router();

router.get('/neighborhood', (req, res) => new GetNeighborhoodController().handle(req, res));
router.get('/paths', (req, res) => new GetPathsController().handle(req, res));

export default router;