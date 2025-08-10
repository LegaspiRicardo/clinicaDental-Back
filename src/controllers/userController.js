// src/controllers/userController.js

import bcrypt from 'bcrypt';
import {
  createUser,
  getUsersByRole,
  getPacientesActivosModel,
  getUserById,
  updateUser,
  deleteUser
} from '../models/userModel.js';
import pool from '../config/db.js';

// Controlador que responde a la ruta GET /api/users/pacientes
export const getPacientes = async (req, res) => {
  try {
    const pacientes = await getPacientesActivosModel(); // Usar función del modelo
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};


export const getDentistas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE rol = 'Dentista'");
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener dentistas:', error);
    res.status(500).json({ error: 'Error al obtener dentistas' });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password, telefono, rol, status, especialidad } = req.body;
  console.log("Datos recibidos en /register:", req.body);

  if (!username || !email || !password || !rol) {
    return res.status(400).json({ error: 'username, email, password y rol son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
      telefono,
      rol,
      status,
      especialidad,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error("Error en getUserById:", error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await updateUser(id, updates);

    if (updated) {
      res.json({ message: 'Paciente actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ error: 'Error al actualizar paciente' });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUser(id);

    if (deleted) {
      res.json({ message: 'Paciente eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ error: 'Error al eliminar paciente' });
  }
};

export const getDentistasActivos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, username, especialidad, status FROM users WHERE rol = 'dentista' AND status = 'Activo'"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPacientesActivos = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE rol = 'Paciente' AND status = 'Activo'");
  return rows;
};

