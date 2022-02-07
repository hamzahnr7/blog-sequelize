import { Router } from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';

export const userRouter = Router();

/* GET users listing. */
userRouter.post('/', userValidation.createUser, userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userValidation.getUser, userController.getUser);
userRouter.patch('/:userId', userValidation.updateUser, userController.updateUser);
userRouter.delete('/:userId', userValidation.deleteUser, userController.deleteUser);
