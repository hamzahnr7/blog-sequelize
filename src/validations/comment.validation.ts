import { body, param } from 'express-validator';
import { validationMw } from '../middlewares/validation.middleware';

export interface UpdateCommentDTO {
  content?: string;
}

export interface HideCommentDTO {
  hidden?: boolean;
}

export class CommentValidation {
  updateComment = [
    param('commentId').isNumeric({ no_symbols: true }),
    body('content').isString().optional(),
    validationMw,
  ];

  hideComment = [
    param('commentId').isNumeric({ no_symbols: true }),
    body('hidden').isBoolean().optional(),
    validationMw,
  ];

  deleteComment = [param('commentId').isNumeric({ no_symbols: true }), validationMw];
}

export default new CommentValidation();
