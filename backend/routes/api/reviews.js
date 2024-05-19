// const express = require('express');
// const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// // Get all Reviews of the Current User
// router.get('/current', requireAuth, async (req, res) => {
//     const userId = req.user.id;

//     // Find all reviews written by the current user
//     const reviews = await Review.findAll({
//         where: { userId },
//         include: [
//             {
//                 model: User,
//                 attributes: ['id', 'firstName', 'lastName']
//             },
//             {
//                 model: Spot,
//                 attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
//             },
//             {
//                 model: ReviewImage,
//                 attributes: ['id', 'url']
//             }
//         ]
//     });

//     const formattedReviews = reviews.map(review => ({
//         id: review.id,
//         userId: review.userId,
//         spotId: review.spotId,
//         review: review.review,
//         stars: review.stars,
//         createdAt: review.createdAt,
//         updatedAt: review.updatedAt,
//         User: {
//             id: review.User.id,
//             firstName: review.User.firstName,
//             lastName: review.User.lastName
//         },
//         Spot: {
//             id: review.Spot.id,
//             ownerId: review.Spot.ownerId,
//             address: review.Spot.address,
//             city: review.Spot.city,
//             state: review.Spot.state,
//             country: review.Spot.country,
//             lat: review.Spot.lat,
//             lng: review.Spot.lng,
//             name: review.Spot.name,
//             price: review.Spot.price,
//             previewImage: review.Spot.previewImage || null
//         },
//         ReviewImages: review.ReviewImages.map(image => ({
//             id: image.id,
//             url: image.url
//         }))
//     }));

//     res.status(200).json({
//         Reviews: formattedReviews
//     });
// });

// module.exports = router;
