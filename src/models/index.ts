import { DataTypes, Sequelize } from 'sequelize';
import databaseConfig from '../config/database.config';
import { post, Post } from './post.model';
import { User, user } from './user.model';

const env = process.env.NODE_ENV! || 'development';
const config = databaseConfig[env as keyof typeof databaseConfig];

export interface Models {
  user: typeof User;
  post: typeof Post;
}

let sequelize: Sequelize = config.url
  ? new Sequelize(config.url as string, config)
  : new Sequelize(config.database!, config.username!, config.password, config);

const models: Models = {
  user: user(sequelize, DataTypes),
  post: post(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (!!models[modelName as keyof Models].associate) {
    models[modelName as keyof Models].associate(models);
  }
});

export const db = {
  ...models,
  sequelize,
  Sequelize,
};
