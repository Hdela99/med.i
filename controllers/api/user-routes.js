const router = require('express').Router();
const { User } = require('../../models');


// CREATE new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = newUserData.username;
            req.session.email = newUserData.email;
            req.session.uID = newUserData.id;

            res.status(200).json(newUserData);

        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

// LOGIN route
router.post('/login', async (req, res) => {
    try {

        const loginData = await User.findOne({
            where: {
                email: req.body.email,
            },
        })

        if (!loginData) {
            res.status(400).json({ message: 'Error, try again!' })
            return
        }

        const pwCheck = await loginData.pwVerification(req.body.password);

        if (!pwCheck) {
            res.status(400).json({ message: 'Error, incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = loginData.username;
            req.session.email = loginData.email;
            req.session.uID = loginData.id;


            res.status(200).json({ username: loginData, message: 'Login Success!' });
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// LOGOUT route
router.post('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(204).end();
        })

    } catch (err) {
        console.log(err);
        res.status(404).end();
    }
})


module.exports = router;
