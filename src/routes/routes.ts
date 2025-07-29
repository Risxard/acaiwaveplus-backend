import { Router } from 'express'
import { authenticateFirebase } from '../middlewares/auth';
import { UserController } from '../controllers/user.controller';


const router = Router()
const userController = new UserController();


router.get('/', authenticateFirebase, userController.findByUser)


export const usersRoutes = router;
