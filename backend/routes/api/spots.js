const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');

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


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: userId },
        include: [
            {
                model: Review,
                attributes: ['stars'],
                required: false
            },
            {
                model: SpotImage,
                where: { preview: true },
                attributes: ['url'],
                required: false
            }
        ],
        group: ['Spot.id', 'Reviews.id', 'SpotImages.id'] // group to avoid dupe
    });

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
        avgRating: calculateAvgRating(spot.Reviews),
        previewImage: spot.SpotImages[0]?.url || null,
    }));

    res.status(200).json({
        Spots: formattedSpots
    });
});

function calculateAvgRating(reviews) {
    if (!reviews || reviews.length === 0) return null;

    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return totalStars / reviews.length;
};

module.exports = router;
