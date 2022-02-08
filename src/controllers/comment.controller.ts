import expressAsyncHandler from 'express-async-handler';
import commentService, { CommentService } from '../services/comment.service';
import { HideCommentDTO, UpdateCommentDTO } from '../validations/comment.validation';

type CommentControllerId = {
  commentId: string;
};

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  updateComment = expressAsyncHandler<CommentControllerId, any, UpdateCommentDTO>(
    async (req, res) => {
      await this.commentService.updateComment(
        req.user?.id!,
        parseInt(req.params.commentId),
        req.body,
      );
      res.status(204).json();
    },
  );

  hideComment = expressAsyncHandler<CommentControllerId, any, HideCommentDTO>(async (req, res) => {
    await this.commentService.hideComment(req.user?.id!, parseInt(req.params.commentId), req.body);
    res.status(204).json();
  });

  deleteComment = expressAsyncHandler<CommentControllerId>(async (req, res) => {
    await this.commentService.deleteComment(req.user?.id!, parseInt(req.params.commentId));
    res.status(204).json();
  });
}

export default new CommentController(commentService);
