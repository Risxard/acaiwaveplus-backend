import { Router } from "express";
import TmdbController from "../controllers/tmdb.controller";
import { authenticateFirebase } from "../middlewares/authenticate.middleware";

const router = Router();
const tmdbController = new TmdbController();

router.get("/tmdb/trending", authenticateFirebase, (req, res) => tmdbController.getTrending(req, res));
router.get("/tmdb/images", authenticateFirebase, (req, res) => tmdbController.getImagesById(req, res));
router.get("/tmdb/images/logos", authenticateFirebase, (req, res) => tmdbController.getLogoImagesById(req, res));
router.get("/tmdb/images/posters", authenticateFirebase, (req, res) => tmdbController.getBackdropsImagesById(req, res));
router.get("/tmdb/images/backdrops", authenticateFirebase, (req, res) => tmdbController.getBackdropsImagesById(req, res));

export default router;
