import createHttpError from 'http-errors';
import { db } from '../models';
import { UpdateUserDTO } from '../validations/user.validation';

export class UserService {
  constructor(private database: typeof db) {}

  async getUsers() {
    return this.database.user.findAll();
  }

  async getUser(userId: number) {
    const user = await this.database.user.findByPk(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async updateMe(myUserId: number, updateUserDTO: UpdateUserDTO) {
    console.log(myUserId);
    const updatedProfile = await this.database.user.update(updateUserDTO, {
      where: { id: myUserId },
      returning: true,
    });
    return updatedProfile;
  }
}

export default new UserService(db);
