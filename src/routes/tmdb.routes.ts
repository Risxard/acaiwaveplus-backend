import { Router } from "express";
import TmdbController from "../controllers/tmdb.controller";
import { authenticateFirebase } from "../middlewares/authenticate.middleware";

const router = Router();
const tmdbController = new TmdbController();

router.get("/tmdb/trending", (req, res) => tmdbController.getTrending(req, res));

export default router;
