import { Router } from 'express'
import { authenticateFirebase } from '../middlewares/auth';
import  UserController  from '../controllers/user.controller';
import  ProfileController  from '../controllers/profile.controller';


const router = Router()
const userController = new UserController();
const profileController = new ProfileController();


router.get('/user', authenticateFirebase, userController.findByUser)
router.get('/profiles', authenticateFirebase, profileController.getAllProfiles);
router.get('/profiles/:profileId', authenticateFirebase, profileController.getProfileById);
router.patch('/profiles/:profileId/watchlist', authenticateFirebase, profileController.updateWatchlist);

export const usersRoutes = router;
