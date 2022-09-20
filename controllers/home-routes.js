const router = require('express').Router();
// const withAuth = require('../utils/auth');


// Renders the main page
router.get('/', async (req, res) => {
    try {
        res.render('login')
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/search', async (req, res) => {
    try {
        res.render('search')
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get('/home', async (req, res) => {
    try {
        res.render('home')
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/alerts', async (req, res) => {
    try {
        res.render('alerts')
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