// src/models/userModel.js

import pool from '../config/db.js';

// Crear usuario
export const createUser = async (user) => {
  const { username, email, password, telefono, rol, status, especialidad } = user;
  console.log('Insertando usuario con datos:', { username, email, password, telefono, rol, status, especialidad });

  const [result] = await pool.query(
    'INSERT INTO users (username, email, password, telefono, rol, status, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [username, email, password, telefono, rol, status, especialidad]
  );

  return { id: result.insertId, username, email, telefono, rol, status, especialidad };
};

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Verificar si el usuario existe
export const userExists = async (email) => {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
  return rows[0].count > 0;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Obtener usuarios por rol
export const getUsersByRole = async (role) => {
  const [rows] = await pool.query('SELECT id, username, email, telefono FROM users WHERE rol = ?', [role]);
  return rows;
};

// Actualizar usuario
export const updateUser = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }

  values.push(id);

  const query = `UPDATE users SET ${fields.join(',')} WHERE id = ?`;
  const [result] = await pool.query(query, values);

  return result.affectedRows > 0;
};

// Eliminar usuario
export const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

