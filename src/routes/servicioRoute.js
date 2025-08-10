import express from 'express'
import servicioController from '../controllers/servicioController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Ruta pública para obtener todos los servicios (sin autenticación)
router.get('/', servicioController.getAllServiciosPublicos);

// Rutas protegidas para manejar servicios por id y creación, actualización, eliminación
router.get('/:id', authenticate, servicioController.getServicio);
router.post('/', authenticate, servicioController.addServicio);
router.put('/:id', authenticate, servicioController.updateServicio);
router.delete('/:id', authenticate, servicioController.deleteServicio);

export default router;
