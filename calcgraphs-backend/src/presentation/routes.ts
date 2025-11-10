import { Router } from "express";
import { GetNeighborhoodController, GetPathsController } from "./controllers/neighborhood";
import { CalculatePathController } from "./controllers/calculatePath";

const router = Router();

router.get('/neighborhood', (req, res) => new GetNeighborhoodController().handle(req, res));
router.get('/paths', (req, res) => new GetPathsController().handle(req, res));
router.get('/calculate/path', (req, res) => new CalculatePathController().handle(req, res));

export default router;