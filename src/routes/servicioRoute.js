// src/routes/servicioRoute.js
import express from 'express'
import servicioController from '../controllers/servicioController.js';
import  authenticate from '../middlewares/authenticate.js';

const router = express.Router();


router.get('/', authenticate, servicioController.getAllServicios);
router.get('/:id', authenticate, servicioController.getServicio);
router.post('/', authenticate, servicioController.addServicio);
router.put('/:id', authenticate, servicioController.updateServicio);
router.delete('/:id', authenticate, servicioController.deleteServicio);

export default  router;
