import expressAsyncHandler from 'express-async-handler';
import postService, { PostService } from '../services/post.service';
import {
  AddPostCommentDTO,
  CreatePostDTO,
  PublishPostDTO,
  UpdatePostDTO,
} from '../validations/post.validation';

type PostControllerId = {
  postId: string;
};

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

  getPost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const post = await this.postService.getPost(parseInt(req.params.postId));
    res.json(post);
  });

  updatePost = expressAsyncHandler<PostControllerId, any, UpdatePostDTO>(async (req, res) => {
    await this.postService.updatePost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  publishPost = expressAsyncHandler<PostControllerId, any, PublishPostDTO>(async (req, res) => {
    await this.postService.publishPost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  deletePost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    await this.postService.deletePost(req.user?.id!, parseInt(req.params.postId));
    res.status(204).json();
  });

  addPostComment = expressAsyncHandler<PostControllerId, any, AddPostCommentDTO>(
    async (req, res) => {
      const addedComment = await this.postService.addPostComment(
        req.user?.id!,
        parseInt(req.params.postId),
        req.body,
      );
      res.status(201).json(addedComment);
    },
  );

  getPostComments = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const postComments = await this.postService.getPostComments(parseInt(req.params.postId));
    res.json({ result: postComments });
  });
}

export default new PostController(postService);
