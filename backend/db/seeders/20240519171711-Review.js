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
        userId: 3,
        spotId: 1,
        review: 'I got the best sleep here',
        stars: 5
      },
      {
        userId: 5,
        spotId: 1,
        review: 'I slept for too long and did not get anything done',
        stars: 4
      },
      {
        userId: 3,
        spotId: 2,
        review: 'It was kinda smelly but the amenities made up for it',
        stars: 3
      },
      {
        userId: 9,
        spotId: 2,
        review: 'Super fun environment with GOATED hosts',
        stars: 5
      },
      {
        userId: 6,
        spotId: 2,
        review: 'The ocean view was spectacular and the snacks were my favorite part',
        stars: 5
      },
      {
        userId: 8,
        spotId: 3,
        review: 'I had a BEARY good time here',
        stars: 5
      },
      {
        userId: 5,
        spotId: 3,
        review: 'I think the bear theme went overboard',
        stars: 3
      },
      {
        userId: 5,
        spotId: 4,
        review: 'Could NOT sleep here because it was WAY too cold!',
        stars: 1
      },
      {
        userId: 4,
        spotId: 4,
        review: 'Loved the icee machine! It was a nice change from warm weather :)',
        stars: 5
      },
      {
        userId: 6,
        spotId: 5,
        review: 'Beau and I stayed up the entire night playing games and watching movies here! Was the dopest hangout spot :D',
        stars: 5
      },
      {
        userId: 8,
        spotId: 5,
        review: 'Brought the whole colony of pengus here and we had endless fun!',
        stars: 5
      },
      {
        userId: 3,
        spotId: 6,
        review: 'A classy spot where I was able to record my classical piano playlist',
        stars: 5
      },
      {
        userId: 5,
        spotId: 6,
        review: 'I felt like a popstar in the making! Going to stay here multiple times so I can make my dreams of being a popstar come true!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 7,
        review: 'Overpriced and I was hungry all night from watching the fishies swim on the wall :(',
        stars: 2
      },
      {
        userId: 3,
        spotId: 7,
        review: 'A sophisticated spot, but not for the common folk with the hefty price tag',
        stars: 4
      },
      {
        userId: 5,
        spotId: 8,
        review: 'So many things to do here! I really liked the hot tub!',
        stars: 5
      },
      {
        userId: 9,
        spotId: 8,
        review: 'A beary good spot fit for a snuggly bear like myself :p',
        stars: 5
      },
   ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      stars: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
