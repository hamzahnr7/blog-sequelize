import { DataTypes, Model, Sequelize } from 'sequelize';
import { Models } from '.';
import { hashPassword } from '../utils/bcrypt.helper';

export class User extends Model {
  password!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    // define association here
  }
}

export const user = (sequelize: Sequelize, DT: typeof DataTypes) => {
  User.init(
    {
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DT.DATE,
      },
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
      hooks: {
        beforeCreate: async (doc) => {
          hashPassword(doc.password);
        },
      },
    },
  );

  return User;
};
