'use strict';

const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {{id: number; commentator_id: number; post_id: number; content: string; hidden: boolean; created_at: Date, updated_at: Date}[]}
     */
    const comments = [
      {
        id: 1,
        commentator_id: 2,
        post_id: 1,
        content: 'Hi',
        hidden: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        commentator_id: 1,
        post_id: 3,
        content: 'Lorem',
        hidden: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        commentator_id: 2,
        post_id: 1,
        content: 'Hihi',
        hidden: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        commentator_id: 1,
        post_id: 2,
        content: 'Test',
        hidden: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        commentator_id: 2,
        post_id: 3,
        content: 'Ameno',
        hidden: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('comments', comments);
  },

  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
