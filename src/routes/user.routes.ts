import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authMw } from '../middlewares/auth.middleware';
import userValidation from '../validations/user.validation';

export const userRoutes = Router();

/* GET users listing. */
userRoutes.get('/', userController.getUsers);
userRoutes.get('/me', authMw, userController.getMe);
userRoutes.get('/:userId', userValidation.getUser, userController.getUser);
userRoutes.patch('/me', authMw, userValidation.updateMe, userController.updateMe);
