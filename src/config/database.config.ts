import { Options } from 'sequelize';

interface SequelizeOptions extends Options {
  url?: string;
}

interface DatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}

const databaseConfig: DatabaseConfig = {
  development: {
    url: 'postgres://postgres:postgres@localhost:5432/blog_sequelize',
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    url: 'postgres://postgres:postgres@localhost:5432/blog_sequelize',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: 'postgres://postgres:postgres@localhost:5432/blog_sequelize',
    dialect: 'postgres',
    logging: false,
    pool: {
      min: 1,
      max: 5,
    },
  },
};

export default databaseConfig;
