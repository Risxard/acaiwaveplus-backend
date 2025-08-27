import { Router } from 'express';
import profileRoutes from './profiles.routes';
import userRoutes from './user.routes';
import tmdbRoutes from './tmdb.routes';
import youtubeRoutes from './youtube.routes'

const router = Router();

router.use(profileRoutes);
router.use(userRoutes);
router.use(tmdbRoutes);
router.use(youtubeRoutes)
export default router;
