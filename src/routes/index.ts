import { Router } from 'express';
import tmdbRoutes from './tmdb.routes';

const router = Router();

router.use(tmdbRoutes);

export default router;
