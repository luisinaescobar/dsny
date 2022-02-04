const { Router } = require('express');
const { getModel } = require('../database');
const jwt = require('jsonwebtoken');
const { encript, verifyToken,  } = require('../middlewares/middlewares');


function createUserRouter(params) {
    const router = new Router();
   
    router.post('/auth/register/', async (req, res) => {
        try {
            const User = getModel('User');
            const data = new User({
                username: req.body.username,
                email: req.body.email,
                password: encript(req.body.password),
            });
            const mail = await getModel('User').findOne({
                where: { email: req.body.email }
            });
            if (mail === null) {
                await data.save()
                res.status(200).send('Now you can log in.');
            } else {
                throw res.status(500).send('Use another email account');
            }
        } catch (error) {
            res.status(500).send('You need to complete all the information.');
        }
    });
    router.post('/auth/login/', async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            const mail = await getModel('User').findOne({
                where: {
                    email: req.body.email,
                    password: encript(req.body.password)
                }
            });
            if (mail !== null) {
                jwt.sign({
                   mail
                }
                    , JWT_SECRET, (err, token) => {
                        res.json({ token })
                    });
            } else {
                throw new Error('Wrong information');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createUserRouter
}