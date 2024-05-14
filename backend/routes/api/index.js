const router = require('express').Router();
//will be putting router.uses here for individual routes for our resources + index.js/routes
//ex: spots, groups, events, reviews
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


module.exports = router;
