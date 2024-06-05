// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


// Add a XSRF-TOKEN cookie (all requests will start with /api) - route not avail in production
// router.get("/api/csrf/restore", (req, res) => {
//     const csrfToken = req.csrfToken();
//     res.cookie("XSRF-TOKEN", csrfToken);
//     res.status(200).json({
//         'XSRF-Token': csrfToken
//     });
// });


router.use('/api', apiRouter);

// Static routes - serve react build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'dist', 'index.html') //serve frontend's index.html file at root route
        );
    });

    //static assets served in frontend dist - build folder
    router.use(express.static(path.resolve("../frontend/dist")));

    // Non-api routes static assets served
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
        );
    });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get("/api/csrf/restore", (req, res) => {
        const csrfToken = req.csrfToken();
        res.cookie("XSRF-TOKEN", csrfToken);
        res.status(200).json({
            'XSRF-Token': csrfToken
        });
    });
}


module.exports = router;
