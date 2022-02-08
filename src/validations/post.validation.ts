import { body, param } from 'express-validator';
import { validationMw } from '../middlewares/validation.middleware';

export interface CreatePostDTO {
  title: string;
  content: string;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
}

export interface PublishPostDTO {
  isPublished?: boolean;
}

export interface AddPostCommentDTO {
  content: string;
}

export class PostValidation {
  createPost = [
    body('title').isString().isLength({ max: 255 }),
    body('content').isString(),
    validationMw,
  ];

  getPost = [param('postId').isNumeric({ no_symbols: true }), validationMw];

  updatePost = [
    param('postId').isNumeric({ no_symbols: true }),
    body('title').isString().isLength({ max: 255 }).optional(),
    body('content').isString().optional(),
    validationMw,
  ];

  publishPost = [
    param('postId').isNumeric({ no_symbols: true }),
    body('isPublished').isBoolean().optional(),
    validationMw,
  ];

  deletePost = [param('postId').isNumeric({ no_symbols: true }), validationMw];

  addPostComment = [
    param('postId').isNumeric({ no_symbols: true }),
    body('content').isString(),
    validationMw,
  ];

  getPostComments = [param('postId').isNumeric({ no_symbols: true }), validationMw];
}

export default new PostValidation();
