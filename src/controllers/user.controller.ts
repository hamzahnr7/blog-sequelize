import expressAsyncHandler from 'express-async-handler';
import userService, { UserService } from '../services/user.service';
import { UpdateUserDTO } from '../validations/user.validation';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = expressAsyncHandler(async (req, res) => {
    const users = await this.userService.getUsers();
    res.json({ result: users });
  });

  getMe = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getUser(parseInt(req.user?.getDataValue('id') as string));
    res.json(user);
  });

  getUser = expressAsyncHandler<{ userId: string }>(async (req, res) => {
    const user = await this.userService.getUser(parseInt(req.params.userId));
    res.json(user);
  });

  updateMe = expressAsyncHandler<any, any, UpdateUserDTO>(async (req, res) => {
    const updatedProfile = this.userService.updateMe(
      parseInt(req.user?.getDataValue('id') as string),
      req.body,
    );
    res.status(204).json();
  });
}

export default new UserController(userService);
