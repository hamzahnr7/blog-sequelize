import { db } from '../models';
import { CreatePostDTO, PublishPostDTO, UpdatePostDTO } from '../validations/post.validation';

export class PostService {
  constructor(private readonly database: typeof db) {}

  async createPost(authorId: number, createPostDTO: CreatePostDTO) {
    const { title, content } = createPostDTO;
    const newPost = await this.database.post.create({ authorId, title, content });
    return newPost;
  }

  async getPosts() {
    const posts = await this.database.post.findAll();
    return posts;
  }

  async getPost(postId: number) {
    const post = await this.database.post.findByPk(postId, {
      include: [
        {
          model: this.database.user,
          as: 'author',
        },
      ],
    });
    return post;
  }

  async updatePost(authorId: number, postId: number, updatePostDTO: UpdatePostDTO) {
    const { title, content } = updatePostDTO;
    const updatedPost = await this.database.post.update(
      { title, content },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async publishPost(authorId: number, postId: number, publishPostDTO: PublishPostDTO) {
    const { isPublished } = publishPostDTO;
    const updatedPost = await this.database.post.update(
      { isPublished },
      { where: { id: postId, authorId } },
    );
    return updatedPost;
  }

  async deletePost(authorId: number, postId: number) {
    const deletedPost = await this.database.post.destroy({ where: { id: postId, authorId } });
    return deletedPost;
  }
}

export default new PostService(db);
