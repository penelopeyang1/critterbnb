const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET all spots
router.get('/', async (req, res) => {
    try {
        // retrieve spots from db
        const spots = await Spot.findAll();

        // formats the spots data
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
            avgRating: spot.avgRating,
            previewImage: spot.previewImage
        }));

        // successful response with the formatted spot data
        res.status(200).json({ Spots: formattedSpots });
    } catch (error) {
        // handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
