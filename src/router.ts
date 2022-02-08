import { RequestHandler, Router } from 'express';
import { authRoutes, postRoutes, userRoutes } from './routes';

const router = Router();

/* GET home page. */
router.get('/', (async (req, res, next) => {
  res.render('index', { title: 'Express' });
}) as RequestHandler);

router.use('/', authRoutes);

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
