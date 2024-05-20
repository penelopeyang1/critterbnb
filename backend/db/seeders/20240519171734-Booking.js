'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2020-12-12',
        endDate: '2020-12-13'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2030-12-12',
        endDate: '2030-12-13'
      },
      {
        spotId: 1,
        userId: 1,
        startDate: '2040-12-12',
        endDate: '2040-12-13'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
      startDate: { [Sequelize.Op.in]: ['2020-12-12', '2030-12-12', '2040-12-12'] }
    }, {});
  }
};
