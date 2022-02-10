import createHttpError from 'http-errors';
import { db } from '../models';
import {
  AddPostCommentDTO,
  CreatePostDTO,
  PublishPostDTO,
  UpdatePostDTO,
} from '../validations/post.validation';

export class PostService {
  constructor(private readonly database: typeof db) {}

  async createPost(authorId: number, createPostDTO: CreatePostDTO) {
    const { title, content } = createPostDTO;
    const newPost = await this.database.Post.create({ authorId, title, content });
    return newPost;
  }

  async getPosts() {
    const posts = await this.database.Post.findAll({ where: { isPublished: true } });
    return posts;
  }

  async getPost(postId: number) {
    const post = await this.database.Post.findByPk(postId, {
      include: [
        {
          model: this.database.User,
          as: 'author',
        },
      ],
    });
    if (!post?.isPublished) throw createHttpError(404, 'Post not found');
    return post;
  }

  async updatePost(authorId: number, postId: number, updatePostDTO: UpdatePostDTO) {
    const { title, content } = updatePostDTO;
    const updatedPost = await this.database.Post.update(
      { title, content },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async publishPost(authorId: number, postId: number, publishPostDTO: PublishPostDTO) {
    const { isPublished } = publishPostDTO;
    const updatedPost = await this.database.Post.update(
      { isPublished },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async deletePost(authorId: number, postId: number) {
    const deletedPost = await this.database.Post.destroy({ where: { id: postId, authorId } });
    return deletedPost;
  }

  async addPostComment(
    commentatorId: number,
    postId: number,
    addPostCommentDTO: AddPostCommentDTO,
  ) {
    const { content } = addPostCommentDTO;
    const addedComment = await this.database.Comment.create({ commentatorId, postId, content });
    return addedComment;
  }

  async getPostComments(postId: number) {
    const postComments = await this.database.Comment.findAll({
      where: { postId, hidden: false },
      include: [
        {
          model: this.database.User,
          attributes: ['name'],
        },
      ],
    });
    return postComments;
  }
}

export default new PostService(db);
