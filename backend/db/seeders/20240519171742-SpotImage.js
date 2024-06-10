'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://i.postimg.cc/GhxBJNPf/SS-1.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/YShh7Scc/SS-2.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/Jz7sTqPz/SS-3.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/4yTdpbYZ/SS-4.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/jS8LB7FQ/GG-1.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/Ss9RXtND/GG-2.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/xdhq1SYX/GG-3.pngg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/4yb3P7cc/GG-4.png',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      url: { [Sequelize.Op.ne]: null }
    }, {});
  }
};
