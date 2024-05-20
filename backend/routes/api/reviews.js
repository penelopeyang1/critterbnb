const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    // Find all reviews written by the current user - userId
    const reviews = await Review.findAll({
        where: { userId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const formattedReviews = reviews.map(review => ({
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: {
            id: review.User.id,
            firstName: review.User.firstName,
            lastName: review.User.lastName
        },
        Spot: {
            id: review.Spot.id,
            ownerId: review.Spot.ownerId,
            address: review.Spot.address,
            city: review.Spot.city,
            state: review.Spot.state,
            country: review.Spot.country,
            lat: review.Spot.lat,
            lng: review.Spot.lng,
            name: review.Spot.name,
            price: review.Spot.price,
            previewImage: review.Spot.previewImage || null //include preview img if avail
        },
        ReviewImages: review.ReviewImages.map(image => ({
            id: image.id,
            url: image.url
        }))
    }));

    res.status(200).json({
        Reviews: formattedReviews
    });
});


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({ //find review in db
        where: { id: reviewId }
    });
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found"
        });
    }

    if (review.userId !== userId) { //check if user is owner of review
        return res.status(403).json({
            message: 'You are not authorized to add an image to this review'
        });
    }

    const imageCount = await ReviewImage.count({ //num of images associated with review
        where: { reviewId }
    });
    if (imageCount > 10) {
        res.status(403).json({
            message: 'Maximum number of images for this resource was reached'
        });
    }

    //review image record
    const newImage = await ReviewImage.create({ reviewId, url });
    res.status(200).json({
        id: newImage.id, url: newImage.url
    });
});

const validateReview = [ //val middleware for review inputs
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const reviewExists = await Review.findOne({
        where: { id: reviewId }
    });
    if (!reviewExists) {
        res.status(404).json({
            message: "Review couldn't be found"
        });
    }

    if (reviewExists.userId !== userId) {
        return res.status(403).json({
            message: 'You are not authorized to make changes to this review'
        });
    }

    reviewExists.review = review;
    reviewExists.stars = stars;
    await reviewExists.save();

    res.status(200).json(reviewExists);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({
        where: { id: reviewId }
    });
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found"
        });
    }

    if (review.userId !== userId) {
        return res.status(403).json({
            message: 'You are not authorized to delete this review'
        });
    }

    await review.destroy();

    res.status(200).json({
        message: 'Successfully deleted'
    });
});


module.exports = router;
