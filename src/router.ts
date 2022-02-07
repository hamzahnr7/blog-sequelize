import { RequestHandler, Router } from 'express';
import { userRouter } from './routes';

const router = Router();

/* GET home page. */
router.get('/', (async (req, res, next) => {
  res.render('index', { title: 'Express' });
}) as RequestHandler);

//#region users
router.use('/users', userRouter);
//#endregion

export default router;
