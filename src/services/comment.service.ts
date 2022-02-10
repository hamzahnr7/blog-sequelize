import { db } from '../models';
import { HideCommentDTO, UpdateCommentDTO } from '../validations/comment.validation';

export class CommentService {
  constructor(private readonly database: typeof db) {}

  async updateComment(
    commentatorId: number,
    commentId: number,
    updateCommentDTO: UpdateCommentDTO,
  ) {
    const { content } = updateCommentDTO;
    const updatedComment = await this.database.Comment.update(
      { content },
      { where: { id: commentId, commentatorId } },
    );
    return updatedComment;
  }

  async hideComment(commentatorId: number, commentId: number, updateCommentDTO: HideCommentDTO) {
    const { hidden } = updateCommentDTO;
    const updatedComment = await this.database.Comment.update(
      { hidden },
      { where: { id: commentId, commentatorId } },
    );
    return updatedComment;
  }

  async deleteComment(commentatorId: number, commentId: number) {
    const deletedComment = await this.database.Comment.destroy({
      where: { id: commentId, commentatorId },
    });
    return deletedComment;
  }
}

export default new CommentService(db);
