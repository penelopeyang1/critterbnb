// const express = require('express');
// const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
// const { check, validationResult } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const Sequelize = require('sequelize');
// const { Op } = Sequelize;
// const seedSpotData = require('../../db/seeders/20240517105431-Spot');

// const router = express.Router();

// // GET all spots
// router.get('/api/spots', async (req, res) => {
//     try {
//         // Call the seed data function or use the data directly
//         await seedSpotData.up(null, Spot.sequelize); // Assuming you want to seed the database when accessing this route

//         // Retrieve all spots from the database
//         const spots = await Spot.findAll();

//         // Format the spots data
//         const formattedSpots = spots.map(spot => ({
//             id: spot.id,
//             ownerId: spot.ownerId,
//             address: spot.address,
//             city: spot.city,
//             state: spot.state,
//             country: spot.country,
//             lat: spot.lat,
//             lng: spot.lng,
//             name: spot.name,
//             description: spot.description,
//             price: spot.price,
//             createdAt: spot.createdAt,
//             updatedAt: spot.updatedAt,
//             avgRating: spot.avgRating, //need an avg rating calculating method
//             previewImage: spot.previewImage
//         }));

//         // Send a successful response with the formatted spot data
//         res.status(200).json({ Spots: formattedSpots });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// module.exports = router;

const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET all spots
router.get('/api/spots', async (req, res) => {
    try {
        // Retrieve all spots from the database
        const spots = await Spot.findAll();

        // Format the spots data
        const formattedSpots = spots.map(spot => ({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating, // This value should be calculated separately
            previewImage: spot.previewImage
        }));

        // Send a successful response with the formatted spot data
        res.status(200).json({ Spots: formattedSpots });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
