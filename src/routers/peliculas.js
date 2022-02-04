const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken } = require('../middlewares/middlewares');


function createPeliculaRouter(params) {
    const router = new Router();

    router.get('/movies/', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Pelicula').findAll({
                attributes: [imagen, titulo, fecha]
            });
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/movies/:id', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Pelicula').findOne({
                where: { id: req.params.id },
            
            });
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).send(`Pelicula with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/movies/', verifyToken, async (req, res) => {
        try {
            const Pelicula = getModel('Pelicula');
            const data = new Pelicula(req.body);
            const saved = await data.save();
            if (saved) {
                res.status(201).json(saved);
            } else {
                res.status(500).send('Could not save the movie.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/movies/:id', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Pelicula').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('Movie updated');
            } else {
                res.status(404).send(`Movie with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/movies/:id', verifyToken, async (req, res) => {
        try {
            const data = await getModel('Pelicula').findOne({
                where: { id: req.params.id }
            });
            await data.destroy();
            if (data) {
                res.status(200).send('Movie deleted');
            } else {
                res.status(404).send(`Movie with id ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createPeliculaRouter
};