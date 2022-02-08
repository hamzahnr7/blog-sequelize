'use strict';

const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      commentatorId: {
        type: Sequelize.BIGINT,
        field: 'commentator_id',
      },
      postId: {
        type: Sequelize.BIGINT,
        field: 'post_id',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  },
};
