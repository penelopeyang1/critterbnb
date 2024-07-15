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
        ownerId: 2,
        address: "111 Dream Isand Dr",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Portal to the Land of Nod",
        description: "Olivia's safe haven for sleep and good dreams",
        price: 99,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
        avgRating: 4.5,
        previewImage: "image url"
      },
      {
        ownerId: 8,
        address: "777 Beach Goers Lane",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Goated Getaway",
        description: "Literally FEAST your eyes on the ultimate GOATED GETAWAY brought to you by Billy and Beau. Relish in everything picnics, pottery, and sports!",
        price: 72,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 9,
        address: "989 Forest Ave",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Beary Bungalow",
        description: "Bundle down in a cozy cottage built to house beary good friends :)",
        price: 50,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 10,
        address: "455 Chilly St",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Icey Escape",
        description: "Escape from the tropical weather and relish in a refreshingly chill igloo ~",
        price: 75,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 3,
        address: "878 Nook Lane",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Gaming Getaway",
        description: "The ultimate hangout spot with two rooms full of games and entertainment. Fun for everyone! ",
        price: 222,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 7,
        address: "123 Music Isle",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Haus of Music",
        description: "A musician's dream recording stay-in studio with a variety of instruments to choose from. ",
        price: 380,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 6,
        address: "634 Ocean Dr",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Underwater World",
        description: "Live like a fish and breathe like a mammal in this realistic aqua room",
        price: 700,
        createdAt: "2021-11-20 08:30:00",
        updatedAt: "2021-11-20 08:30:00",
        avgRating: 4.8,
        previewImage: "image url"
      },
      {
        ownerId: 5,
        address: "001 Cloud Ave",
        city: "Paradise",
        state: "Animal Archipelago",
        country: "United Animal Crossing Islands",
        lat: 34.052235,
        lng: -118.243683,
        name: "Dreamy Dormitory",
        description: "A peaceful abode to rest and cultivate your craft.",
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
