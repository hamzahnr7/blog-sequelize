import { CreationOptional, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '.';

type CommentAttributes = {
  id: number;
  commentatorId: number;
  postId: number;
  content: string;
  hidden?: boolean;
};

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  declare id: CreationOptional<number>;
  declare commentatorId: number;
  declare postId: number;
  declare content: string;
  declare hidden: boolean;

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
      foreignKey: 'commentatorId',
    });
    this.belongsTo(models.post);
  }
}

export const comment = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Comment.init(
    {
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      commentatorId: {
        type: DT.BIGINT,
        field: 'commentator_id',
      },
      postId: {
        type: DT.BIGINT,
        field: 'post_id',
      },
      content: {
        type: DT.TEXT,
        allowNull: false,
      },
      hidden: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'comment',
      underscored: true,
    },
  );

  return Comment;
};
