import { CreationOptional, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';
import { hashPassword } from '../utils/bcrypt.helper';

type UserAttributes = {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare birthdate: Date | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    // define association here
    this.hasMany(models.post, {
      foreignKey: 'authorId',
    });
  }
}

export const user = (sequelize: Sequelize, DT: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Email is invalid' },
        },
      },
      password: {
        type: DT.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 32],
            msg: 'Password must be between 8 and 32 characters',
          },
        },
      },
      birthdate: {
        type: DT.DATE,
        validate: {
          isDate: {
            args: true,
            msg: 'Date is invalid',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
      defaultScope: { attributes: { exclude: ['password'] } },
      hooks: {
        beforeCreate: async (doc) => {
          doc.password = await hashPassword(doc.password);
          return;
        },
      },
    },
  );

  return User;
};
