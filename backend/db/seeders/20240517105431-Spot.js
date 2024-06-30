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
        address: "111 Dream Isand Dr",
        city: "Happy Home Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Portal to the Land of  Nod",
        description: "Olivia's safe haven for sleep and good dreams ~",
        price: 111,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
        avgRating: 4.5,
        previewImage: "image url"
      },
      {
        ownerId: 2,
        address: "777 Beach Goers Lane",
        city: "Happy Home Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Goated Getaway",
        description: "Literally FEAST your eyes on the ultimate GOATED GETAWAY brought to you by Billy and Beau. Relish in everything picnics, pottery, and sports!",
        price: 77,
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
