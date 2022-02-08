import expressAsyncHandler from 'express-async-handler';
import userService, { UserService } from '../services/user.service';
import { UpdateUserDTO } from '../validations/user.validation';

type UserControllerId = { userId: string };

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = expressAsyncHandler(async (req, res) => {
    const users = await this.userService.getUsers();
    res.json({ result: users });
  });

  getMe = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getUser(req.user?.id!);
    res.json(user);
  });

  getMyPosts = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getMyPost(req.user?.id!);
    res.json(user);
  });

  getMyComments = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getMyComments(req.user?.id!);
    res.json(user);
  });

  getUser = expressAsyncHandler<UserControllerId>(async (req, res) => {
    const user = await this.userService.getUser(parseInt(req.params.userId));
    res.json(user);
  });

  updateMe = expressAsyncHandler<any, any, UpdateUserDTO>(async (req, res) => {
    await this.userService.updateUser(req.user?.id!, req.body);
    res.status(204).json();
  });
}

export default new UserController(userService);
