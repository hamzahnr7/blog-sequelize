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

  async getMyPost(userId: number) {
    const user = await this.database.user.findByPk(userId, {
      include: [
        {
          model: this.database.post,
        },
      ],
    });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async updateUser(myUserId: number, updateUserDTO: UpdateUserDTO) {
    const { name, birthdate } = updateUserDTO;
    const updatedProfile = await this.database.user.update(
      { name, birthdate },
      {
        where: { id: myUserId },
        returning: true,
      },
    );
    return updatedProfile;
  }
}

export default new UserService(db);
