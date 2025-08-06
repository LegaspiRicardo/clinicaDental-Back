const express = require('express');
const {
  registerUser,
  getPacientes,
  getDentistas,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/pacientes', getPacientes);
router.get('/dentistas', getDentistas);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
