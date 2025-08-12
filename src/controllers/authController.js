// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../models/userModel.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token con el id y rol también
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar token y datos del usuario
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
