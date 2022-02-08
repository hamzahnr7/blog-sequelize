import { CreationOptional, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

type PostAttributes = {
  id: number;
  authorId?: number;
  title: string;
  content: string;
  isPublished?: boolean;
};

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

export class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: CreationOptional<number>;
  declare authorId: number | null;
  declare title: string;
  declare content: string;
  declare isPublished: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    // define association here
    this.belongsTo(models.user, {
      foreignKey: 'authorId',
      as: 'author',
    });
    this.hasMany(models.comment);
  }
}

export const post = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Post.init(
    {
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DT.BIGINT,
        field: 'author_id',
        references: {
          model: 'users',
          key: 'id',
        },
        validate: {
          isInt: true,
        },
      },
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      content: {
        type: DT.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      isPublished: {
        type: DT.BOOLEAN,
        field: 'is_published',
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'post',
      underscored: true,
    },
  );

  return Post;
};
