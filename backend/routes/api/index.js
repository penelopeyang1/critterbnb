//will be putting router.uses here for individual routes for our resources + index.js/routes
//ex: spots, groups, events, reviews

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spotimages.js');
const reviewImagesRouter = require('./reviewimages.js');
const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null

router.use(restoreUser); //<=global middleware, routers must be placed
//AFTER THIS^

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.post('/test', (req, res) => { //test endpoint for mod 5
    res.json({ requestBody: req.body });
});

//this crashes the local server for some reason..
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// });

module.exports = router;
