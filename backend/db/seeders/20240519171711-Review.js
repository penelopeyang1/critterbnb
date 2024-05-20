'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 2,
        spotId: 1,
        review: 'mid',
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: 'meh',
        stars: 5
      }
   ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      stars: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
