import createHttpError from 'http-errors';
import { db } from '../models';
import { comparePassword } from '../utils/bcrypt.helper';
import { createToken } from '../utils/jwt.helper';
import { LoginUserDTO, RegisterUserDTO } from '../validations/auth.validation';

export class AuthService {
  constructor(private readonly database: typeof db) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  async register(registerUserDTO: RegisterUserDTO) {
    const user = await this.database.user.create({
      name: registerUserDTO.name,
      email: registerUserDTO.email,
      password: registerUserDTO.password,
      birthdate: registerUserDTO.birthdate,
    });
    return user;
  }

  async login(loginDTO: LoginUserDTO) {
    const user = await this.database.user.findOne({
      where: { email: loginDTO.email },
      attributes: { include: ['password'] },
    });
    if (!user) throw this.loginError();

    const passwordMatched = await comparePassword(loginDTO.password, user.password);
    if (!passwordMatched) throw this.loginError();

    const accessToken = createToken(user);
    return accessToken;
  }
}

export default new AuthService(db);
