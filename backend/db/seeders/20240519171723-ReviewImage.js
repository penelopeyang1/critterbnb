'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'www.google.com'
      },
      {
        reviewId: 2,
        url: 'www.nintendo.com'
      },
      {
        reviewId: 3,
        url: 'www.youtube.com'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      url: { [Sequelize.Op.in]: ['www.google.com', 'www.nintendo.com', 'www.youtube.com'] }
    }, {});
  }
};
