import { db } from '../models';

export class UserService {
  constructor(private database: typeof db) {}

  getUsers = async () => {
    return this.database.user.findAll();
  };

  getUser = async (userId: number) => {
    return this.database.user.findByPk(userId);
  };
}

export default new UserService(db);
