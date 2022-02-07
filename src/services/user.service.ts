import createHttpError from 'http-errors';
import { db } from '../models';
import { CreateUserDTO, UpdateUserDTO } from '../validations/user.validation';

export class UserService {
  constructor(private database: typeof db) {}

  createUser = async (createUserDTO: CreateUserDTO) => {
    return this.database.user.create({
      name: createUserDTO.name,
      email: createUserDTO.email,
      password: createUserDTO.password,
      birthdate: createUserDTO.birthdate,
    });
  };

  getUsers = async () => {
    return this.database.user.findAll();
  };

  getUser = async (userId: number) => {
    const user = await this.database.user.findByPk(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  };

  updateUser = async (userId: number, updateUserDTO: UpdateUserDTO) => {
    const updatedUser = await this.database.user.update(updateUserDTO, {
      where: { id: userId },
      returning: true,
    });
    return updatedUser;
  };

  deleteUser = async (userId: number) => {
    const deletedUser = await this.database.user.destroy({ where: { id: userId } });
    return deletedUser;
  };
}

export default new UserService(db);
