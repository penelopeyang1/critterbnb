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
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "User": {
          "id": 1,
          "firstName": "John",
          "lastName": "Smith"
        }
      },
      {
        "id": 2,
        "userId": 2,
        "spotId": 2,
        "review": "This was a mid spot.",
        "stars": 1,
        "createdAt": "2021-11-20 21:40:37",
        "updatedAt": "2021-11-20 21:40:37",
        "User": {
          "id": 2,
          "firstName": "Pookie",
          "lastName": "Bear"
        }
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
