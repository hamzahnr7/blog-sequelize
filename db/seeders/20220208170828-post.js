'use strict';

const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {{id: number; author_id?: number; title: string; content: string; is_published?: boolean; created_at: Date; updated_at: Date}[]}
     */
    const posts = [
      {
        id: 1,
        author_id: 1,
        title: 'Hello, World!',
        content: 'Just Hello',
        is_published: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        author_id: 1,
        title: 'Test',
        content: 'Testing testing testing',
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        author_id: 2,
        title: 'Lorem Ipsum',
        content:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, adipisci?\nLorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas atque magni autem ipsum sequi earum.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus aperiam fuga dicta molestias sit dolor quas tempore dolores totam repudiandae?\nLorem, ipsum dolor sit amet consectetur adipisicing elit.',
        is_published: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('posts', posts);
  },

  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
