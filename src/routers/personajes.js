const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
//const { cache, storeObjectInCache, invalidateCache } = require('../middlewares/cache');

function createPersonajeRouter(params) {
    const router = new Router();

    router.get('/characters/', verifyToken, /*verifySuspend, cache, */async (req, res) => {
        try {
            const data = await getModel('Personaje').findAll();
            //storeObjectInCache(req, data);
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/characters?name=nombre', verifyToken,/* verifyAdmin, */async (req, res) => {
        try {
            const data = await getModel('Personaje').findOne({
                where: { nombre: req.params.nombre }
            });
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).send(`Personaje with name ${req.params.nombre} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/characters/', verifyToken, /*verifyAdmin, cache,*/ async (req, res) => {
        try {
            const Personaje = getModel('Personaje');
            const data = new Personaje(req.body);
            const saved = await data.save();
            if (saved) {
                /*invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });*/
                res.status(201).json(saved);
            } else {
                res.status(500).send('Could not save the character.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/characters?name=nombre', verifyToken, /*verifyAdmin, cache,*/ async (req, res) => {
        try {
            const data = await getModel('Personaje').findOne({
                where: {
                    nombre: req.params.nombre
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                /*invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });*/
                res.status(200).send('Character updated');
            } else {
                res.status(404).send(`Character with name ${req.params.nombre} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/characters?name=nombre', verifyToken, /*verifyAdmin, cache,*/ async (req, res) => {
        try {
            const data = await getModel('Personaje').findOne({
                where: { nombre: req.params.nombre }
            });
            await data.destroy();
            if (data) {/*
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });*/
                res.status(200).send('Character deleted');
            } else {
                res.status(404).send(`Character with name ${req.params.name} does not exist.`);
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