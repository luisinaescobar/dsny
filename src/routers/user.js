const { Router } = require('express');
const { getModel } = require('../database');
const jwt = require('jsonwebtoken');
const { encript, verifyToken, verifyAdmin } = require('../middlewares/middlewares');


function createUserRouter(params) {
    const router = new Router();
   /* router.get('/users/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findOne({
                where: { id: req.params.id }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`User with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });*/
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
    });///To suspend clients
   /* router.put('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findOne({
                where: { id: req.params.id }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('User updated/suspended');
            } else {
                res.status(404).send(`User with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });*/
    return router;
}

module.exports = {
    createUserRouter
}