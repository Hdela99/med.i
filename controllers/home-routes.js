const router = require('express').Router();
// const withAuth = require('../utils/auth');


// Renders the main page
router.get('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
});


// View specific drug
// router.get('/drug/:id', withAuth, async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router;