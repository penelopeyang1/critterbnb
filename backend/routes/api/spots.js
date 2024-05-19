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


// GET all Spots owned by the current ser
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

//helper function to calc avg rating
function calculateAvgRating(reviews) {
    if (!reviews || reviews.length === 0) return null;

    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return totalStars / reviews.length;
};

// GET details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review,
                attributes: ['stars']
            }
        ],
        group: ['Spot.id', 'SpotImages.id', 'User.id', 'Reviews.id']
    });

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    //
    const numReviews = spot.Reviews ? spot.Reviews.length : 0;
    const avgStarRating = numReviews > 0 ? spot.Reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews : 0;

    const formattedSpots = {
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
        numReviews,
        avgStarRating,
        SpotImages: spot.SpotImages.map(image => ({
            id: image.id,
            url: image.url,
            preview: image.preview
        })),
        Owner: {
            id: spot.User.id,
            firstName: spot.User.firstName,
            lastName: spot.User.lastName
        }
    };

    res.json(formattedSpots);
});

const validateSpotCreation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .optional()
        .isNumeric()
        .withMessage('Latitude is not valid')
        .custom((value) => {
            const latitude = parseFloat(value);
            if (latitude < -90 || latitude > 90) {
                throw new Error('Latitude must be within -90 to 90');
            }
            return true;
        }),
    check('lng')
        .optional()
        .isNumeric()
        .withMessage('Longitude is not valid')
        .custom((value) => {
            const longitude = parseFloat(value);
            if (longitude < -180 || longitude > 180) {
                throw new Error('Longitude must be within -180 to 180');
            }
            return true;
        }),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required')
        .isNumeric()
        .withMessage('Price must be a number')
        .isInt({ min: 1 })
        .withMessage('Price must be a valid positive integer'),
    handleValidationErrors
]

module.exports = router;
