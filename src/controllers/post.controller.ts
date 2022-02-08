import expressAsyncHandler from 'express-async-handler';
import postService, { PostService } from '../services/post.service';
import { CreatePostDTO, PublishPostDTO, UpdatePostDTO } from '../validations/post.validation';

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = expressAsyncHandler<any, any, CreatePostDTO>(async (req, res) => {
    const newPost = await this.postService.createPost(req.user?.id!, req.body);
    res.status(201).json(newPost);
  });

  getPosts = expressAsyncHandler(async (req, res) => {
    const posts = await this.postService.getPosts();
    res.json({ result: posts });
  });

  getPost = expressAsyncHandler<{ postId: string }>(async (req, res) => {
    const post = await this.postService.getPost(parseInt(req.params.postId));
    res.json(post);
  });

  updatePost = expressAsyncHandler<{ postId: string }, any, UpdatePostDTO>(async (req, res) => {
    await this.postService.updatePost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  publishPost = expressAsyncHandler<{ postId: string }, any, PublishPostDTO>(async (req, res) => {
    await this.postService.publishPost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  deletePost = expressAsyncHandler<{ postId: string }>(async (req, res) => {
    await this.postService.deletePost(req.user?.id!, parseInt(req.params.postId));
    res.status(204).json();
  });
}

export default new PostController(postService);
