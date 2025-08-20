import { Router } from 'express';
import profileRoutes from './profiles.routes';
import userRoutes from './user.routes';
import tmdbRoutes from './tmdb.routes';

const router = Router();

router.use(profileRoutes);
router.use(userRoutes);
router.use(tmdbRoutes)
export default router;
