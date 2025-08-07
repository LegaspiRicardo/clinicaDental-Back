// src/routes/userRoute.js
import express from 'express';
import {
  registerUser,
  getPacientes,
  getDentistas,
  getDentistasActivos,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/userController.js';


const router = express.Router();
router.post('/register', registerUser);  
router.get('/pacientes', getPacientes);
router.get('/dentistas', getDentistas);
router.get('/dentistas/activos', getDentistasActivos);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
