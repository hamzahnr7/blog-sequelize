import expressAsyncHandler from 'express-async-handler';
import userService, { UserService } from '../services/user.service';

class UserController {
  constructor(private userService: UserService) {}

  getUsers = expressAsyncHandler(async (req, res, next) => {
    const users = await this.userService.getUsers();
    res.send(users);
  });

  getUser = expressAsyncHandler<{ userId: number }>(async (req, res, next) => {
    const user = await this.userService.getUser(req.params.userId);
    res.send(user);
  });
}

export default new UserController(userService);
