import express from 'express';
import {
  getAllHorarios,
  getHorario,
  addHorario,
  updateHorario,
  deleteHorario
} from '../controllers/horarioController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllHorarios);
router.get('/:id', authenticate, getHorario);
router.post('/', authenticate, addHorario);
router.put('/:id', authenticate, updateHorario);
router.delete('/:id', authenticate, deleteHorario);

export default router;
