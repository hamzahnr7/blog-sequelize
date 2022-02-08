import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authMw } from '../middlewares/auth.middleware';
import postValidation from '../validations/post.validation';

export const postRoutes = Router();

postRoutes
  .get('/', postController.getPosts)
  .get('/:postId', postValidation.getPost, postController.getPost);
postRoutes
  .use(authMw)
  .post('/', postValidation.createPost, postController.createPost)
  .patch('/:postId', postValidation.updatePost, postController.updatePost)
  .patch('/:postId/publish', postValidation.publishPost, postController.publishPost)
  .delete('/:postId', postValidation.deletePost, postController.deletePost);
