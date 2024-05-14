//will be putting router.uses here for individual routes for our resources + index.js/routes
//ex: spots, groups, events, reviews

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser); //<=global middleware, routers must be placed
//AFTER THIS^

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => { //test endpoint for mod 5
    res.json({ requestBody: req.body });
});

module.exports = router;
