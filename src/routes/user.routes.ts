import { Router } from 'express';
import { authenticateFirebase } from '../middlewares/authenticate.middleware';
import UserController from '../controllers/user.controller';

const router = Router()
const userController = new UserController();

router.get('/users', authenticateFirebase, userController.findByUser);
router.delete('/users', authenticateFirebase, userController.deleteUser);


export default router;
