const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken } = require('../middlewares/middlewares');


function createPersonajeRouter(params) {
    const router = new Router();

    router.get('/characters/', verifyToken, async (req, res) => {
        try {
            const Pelicula = getModel('Pelicula');
            const data = await getModel('Personaje').findAll({
                include: [Pelicula]
            });
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/characters/:id', verifyToken, async (req, res) => {
        try {
            const Pelicula = getModel('Pelicula');
            const data = await getModel('Personaje').findOne({
                where: { id: req.params.id },
                include: [Pelicula]
            });
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).send(`Personaje with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/characters/', verifyToken, async (req, res) => {
        try {
            const Personaje = getModel('Personaje');
            const data = new Personaje(req.body);
            const saved = await data.save();
            if (saved) {
                res.status(201).json(saved);
            } else {
                res.status(500).send('Could not save the character.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/characters/:id', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Personaje').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('Character updated');
            } else {
                res.status(404).send(`Character with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/characters/:id', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Personaje').findOne({
                where: { id: req.params.id }
            });
            await data.destroy();
            if (data) {
                res.status(200).send('Character deleted');
            } else {
                res.status(404).send(`Character with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createPersonajeRouter
};