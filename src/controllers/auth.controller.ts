import expressAsyncHandler from 'express-async-handler';
import authService, { AuthService } from '../services/auth.service';
import { LoginUserDTO, RegisterUserDTO } from '../validations/auth.validation';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = expressAsyncHandler<any, any, RegisterUserDTO>(async (req, res) => {
    const user = await this.authService.register(req.body);
    res.status(201).json(user);
  });

  login = expressAsyncHandler<any, any, LoginUserDTO>(async (req, res) => {
    const accessToken = await this.authService.login(req.body);
    res.json({ accessToken });
  });
}

export default new AuthController(authService);
