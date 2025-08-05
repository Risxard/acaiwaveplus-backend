import { Router } from 'express';
import { authenticateFirebase } from '../middlewares/authenticate.middleware';
import UserController from '../controllers/user.controller';
import ProfileController from '../controllers/profile.controller';


const router = Router()
const userController = new UserController();
const profileController = new ProfileController();


router.get('/user', authenticateFirebase, userController.findByUser)
router.get('/profiles', authenticateFirebase, profileController.getAllProfiles);
router.get('/profiles/:profileId', authenticateFirebase, profileController.getProfileById);
router.get('/profiles/:profileId/watchlist', authenticateFirebase, profileController.getWatchlist);
router.patch('/profiles/:profileId/watchlist', authenticateFirebase, profileController.updateWatchlist);
router.post('/profiles', authenticateFirebase, profileController.createProfile);
router.patch('/profiles/:profileId', authenticateFirebase, profileController.updateProfile);
router.delete('/profiles/:profileId', authenticateFirebase, profileController.deleteProfile);

export const usersRoutes = router;
