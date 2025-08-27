import { Router } from "express";
import TmdbController from "../controllers/tmdb.controller";
import YoutubeController from "../controllers/youtube.controller";
import { authenticateFirebase } from "../middlewares/authenticate.middleware";

const router = Router();
const youtubeController = new YoutubeController();

router.get("/video/check", authenticateFirebase, (req, res) => youtubeController.checkVideoByKey(req, res));

export default router;
