import expressAsyncHandler from 'express-async-handler';
import userService, { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../validations/user.validation';

export class UserController {
  constructor(private userService: UserService) {}

  createUser = expressAsyncHandler<{}, any, CreateUserDTO>(async (req, res) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  });

  getUsers = expressAsyncHandler(async (req, res) => {
    const users = await this.userService.getUsers();
    res.json({ result: users });
  });

  getUser = expressAsyncHandler<{ userId: string }>(async (req, res) => {
    const user = await this.userService.getUser(parseInt(req.params.userId));
    res.json(user);
  });

  updateUser = expressAsyncHandler<{ userId: string }, any, UpdateUserDTO>(async (req, res) => {
    const updatedUser = await this.userService.updateUser(parseInt(req.params.userId), req.body);
    res.json(updatedUser);
  });

  deleteUser = expressAsyncHandler<{ userId: string }>(async (req, res) => {
    const deletedUser = await this.userService.deleteUser(parseInt(req.params.userId));
    res.json(deletedUser);
  });
}

export default new UserController(userService);
