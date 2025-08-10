import express from 'express';
import { createCita, getCitasByDentista, deleteCita } from '../controllers/citaController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createCita);        // Crear cita
router.get('/', authenticate, getCitasByDentista); // Obtener citas por dentista (query param dentistaId)
router.delete('/:id',authenticate, deleteCita);


export default router;
