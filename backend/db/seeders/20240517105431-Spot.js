'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
        avgRating: 4.5,
        previewImage: "image url"
      },
      {
        ownerId: 2,
        address: "456 Elm Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.052235,
        lng: -118.243683,
        name: "Code School",
        description: "Place where coding enthusiasts gather",
        price: 150,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
