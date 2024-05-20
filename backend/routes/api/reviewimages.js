const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const userId = req.user.id; //user id from auth user req
    const { imageId } = req.params;

    const reviewImage = await ReviewImage.findByPk(imageId, {
        include: Review
    });

    if (!reviewImage) { //if rev img doesn't exist
        return res.status(404).json({
            message: "Review Image couldn't be found"
        });
    }

    if (reviewImage.Review.userId !== userId) { //check if user request is owner
        return res.status(403).json({
            message: "You are not authorized to delete this review image"
        });
    }

    await reviewImage.destroy();

    res.status(200).json({
        message: 'Successfully deleted'
    });
});

module.exports = router;
