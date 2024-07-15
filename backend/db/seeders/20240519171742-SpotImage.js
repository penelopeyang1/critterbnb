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
        url: 'https://i.postimg.cc/6QLXDRCq/nod-1.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/CLXSDwFh/nod-2.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/HxYgHxt2/nod-3.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/g0PpS4X1/nod-4.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/zGh5F4Bn/nod-5.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/TYLXTBnZ/goat-1.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/mkqfQSW-X/goat-2.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/yxWCgbt3/goat-3.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/kMhm37RQ/goat-4.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.postimg.cc/65kxqz0T/goat-5.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.postimg.cc/BvxS4Rfq/bear-1.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.postimg.cc/76kLzwnG/bear-2.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.postimg.cc/MGkZkq4P/bear-3.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.postimg.cc/yx6Yfj57/bear-4.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.postimg.cc/vBtZLk0P/bear-5.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/SxnjFZKs/ice-1.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/cLPCsQKc/ice-2.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/d0d1DLrc/ice-3.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/sD61LFsq/ice-4.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/nccCTVbq/ice-5.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/W3GhYh1w/club-1.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/cLzgrpzw/club-2.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/ZKTygF3B/club-3.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/7YmTyGMB/club-4.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/gcyZNBwb/club-5.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/C1TR4jSK/music-1.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/QNqFp9PX/music-2.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/TPWymk8S/music-3.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/Gtz9rVYB/music-4.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/Kjm46xKS/music-5.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.postimg.cc/y804Z9Qj/ocean-1.png',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.postimg.cc/XqWyn9zP/ocean-2.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.postimg.cc/6QDv1kLt/ocean-3.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.postimg.cc/W4DZ8NZ5/ocean-4.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.postimg.cc/qRy3f1jn/ocean-5.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.postimg.cc/jq8sxzmJ/dream-1.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.postimg.cc/wMWxnJ8L/dream-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.postimg.cc/pX6XZDBt/dream-3.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.postimg.cc/ZYjq9kBn/dream-4.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.postimg.cc/kX4gKjKc/dream-5.jpg',
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
