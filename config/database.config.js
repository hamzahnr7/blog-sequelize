const databaseConfig = {
  development: {
    url: 'postgres://postgres:postgres@localhost:5432/blog_sequelize',
    dialect: 'postgres',
    logging: true,
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

module.exports = databaseConfig;
