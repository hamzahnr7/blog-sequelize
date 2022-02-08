'use strict';

const { hash, genSalt } = require('bcrypt');
const sequelize = require('sequelize');

const hashPassword = async (password) => await hash(password, await genSalt(12));

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    /**
     * @type {{id: number; name: string; email: string; password: string; birthdate?: Date; created_at: Date; updated_at: Date}[]}
     */
    const users = [
      {
        id: 1,
        name: 'Detteksie Smantie',
        email: 'detteksie@mailsac.com',
        password: await hashPassword('asdf1234'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Samara98',
        email: 'samara98@mailsac.com',
        password: await hashPassword('asdf1346'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', users);
  },

  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
