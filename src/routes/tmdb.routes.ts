import { Router } from "express";
import TmdbController from "../controllers/tmdb.controller";
import { authenticateFirebase } from "../middlewares/authenticate.middleware";

const router = Router();
const tmdbController = new TmdbController();

router.get("/tmdb/trending", authenticateFirebase, (req, res) => tmdbController.getTrending(req, res));
router.get("/tmdb/recommendations", authenticateFirebase, (req, res) => tmdbController.getRecommendations(req, res));
router.get("/tmdb/now_playing", authenticateFirebase, (req, res) => tmdbController.getNowPlaying(req, res));


router.get("/tmdb/images", authenticateFirebase, (req, res) => tmdbController.getImagesById(req, res));
router.get("/tmdb/images/logos", authenticateFirebase, (req, res) => tmdbController.getLogoImagesById(req, res));
router.get("/tmdb/images/posters", authenticateFirebase, (req, res) => tmdbController.getBackdropsImagesById(req, res));
router.get("/tmdb/images/backdrops", authenticateFirebase, (req, res) => tmdbController.getBackdropsImagesById(req, res));
router.get("/tmdb/video", authenticateFirebase, (req, res) => tmdbController.getVideoById(req, res));
router.get("/tmdb/perGenres", authenticateFirebase, (req, res) => tmdbController.getPerGenres(req, res));


router.get("/tmdb/search/multi", authenticateFirebase, (req, res) => tmdbController.getSearchMulti(req, res));
router.get("/tmdb/search/person", authenticateFirebase, (req, res) => tmdbController.getSearchPerson(req, res));
router.get("/tmdb/genres", authenticateFirebase, (req, res) => tmdbController.getGenres(req, res));
router.get("/tmdb/classification", authenticateFirebase, (req, res) => tmdbController.getClassification(req, res));
router.get("/tmdb/mediadetails", authenticateFirebase, (req, res) => tmdbController.getMediaDetails(req, res));

export default router;
