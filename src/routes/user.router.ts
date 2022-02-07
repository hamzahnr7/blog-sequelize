import { RequestHandler, Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

/* GET users listing. */
userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);

export default userRouter;
