'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'urmom@critter.io',
        firstName: 'Jonny',
        lastName: 'Diang',
        username: 'jotnny',
        hashedPassword: bcrypt.hashSync('potato999')
      },
      {
        email: 'lordraymond@critter.io',
        firstName: 'Raymond',
        lastName: 'Cat',
        username: 'aristocat',
        hashedPassword: bcrypt.hashSync('StandOnBusiness247')
      },
      {
        email: 'pyang21@critter.io',
        firstName: 'Penelope',
        lastName: 'Yang',
        username: 'gnoccicatt',
        hashedPassword: bcrypt.hashSync('fortniteballs')
      },
      {
        email: 'lovelyruby@critter.io',
        firstName: 'Ruby',
        lastName: 'Rabbit',
        username: 'spacebunny',
        hashedPassword: bcrypt.hashSync('carroteater123')
      },
      {
        email: 'pinkmarina@critter.io',
        firstName: 'Marina',
        lastName: 'Octopus',
        username: 'octopink',
        hashedPassword: bcrypt.hashSync('Underthesea!')
      },
      {
        email: 'metalcherries@critter.io',
        firstName: 'Cherry',
        lastName: 'Dog',
        username: 'altpuppy',
        hashedPassword: bcrypt.hashSync('RockOn!!!')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
