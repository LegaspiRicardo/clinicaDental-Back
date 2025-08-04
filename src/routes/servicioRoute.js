// src/routes/servicioRoute.js
const express = require('express');
const router = express.Router();

const servicioController = require('../controllers/servicioController');
const authenticate = require('../middlewares/authenticate');

// Aquí solo pones '/' porque ya estás montando el prefijo en app.js
router.get('/', authenticate, servicioController.getAllServicios);
router.get('/:id', authenticate, servicioController.getServicio);
router.post('/', authenticate, servicioController.addServicio);
router.put('/:id', authenticate, servicioController.updateServicio);
router.delete('/:id', authenticate, servicioController.deleteServicio);

module.exports = router;
