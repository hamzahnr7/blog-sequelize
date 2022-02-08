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

  async findEmail(email: string) {
    const user = await this.database.user.findOne({ where: { email } });
    if (user) throw createHttpError(409, 'Email already exist');
  }

  async register(registerUserDTO: RegisterUserDTO) {
    const { name, email, password, birthdate } = registerUserDTO;
    await this.findEmail(email);
    const user = await this.database.user.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginDTO: LoginUserDTO) {
    const { email, password } = loginDTO;
    const user = await this.database.user.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) throw this.loginError();

    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) throw this.loginError();

    const accessToken = createToken(user);
    return accessToken;
  }
}

export default new AuthService(db);
