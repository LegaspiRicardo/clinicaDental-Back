import express from 'express';
import { createCita, getCitasByDentista } from '../controllers/citaController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createCita);        // Crear cita
router.get('/', authenticate, getCitasByDentista); // Obtener citas por dentista (query param dentistaId)

export default router;
