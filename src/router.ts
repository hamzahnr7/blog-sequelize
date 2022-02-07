import { RequestHandler, Router } from 'express';
import { authRoutes, userRoutes } from './routes';

const router = Router();

/* GET home page. */
router.get('/', (async (req, res, next) => {
  res.render('index', { title: 'Express' });
}) as RequestHandler);

router.use('/', authRoutes);

//#region users
router.use('/users', userRoutes);
//#endregion

export default router;
