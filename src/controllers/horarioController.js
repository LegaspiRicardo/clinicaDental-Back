// src/controllers/horarioController.js

import pool from '../config/db.js';

//  Obtener todos los horarios (o por dentista si se envía query param)
export const getAllHorarios = async (req, res) => {
  try {
    const { dentistaId } = req.query;
    let query = 'SELECT * FROM horario';
    const params = [];

    if (dentistaId) {
      query += ' WHERE id_dentista = ?';
      params.push(dentistaId);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
};

//  Obtener horario por ID
export const getHorario = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM horario WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Horario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Crear nuevo horario
export const addHorario = async (req, res) => {
  const { id_dentista, fecha, inicio, fin } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO horario (id_dentista, fecha, inicio, fin) VALUES (?, ?, ?, ?)',
      [id_dentista, fecha, inicio, fin]
    );
    res.status(201).json({ id: result.insertId, id_dentista, fecha, inicio, fin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Actualizar horario por ID
export const updateHorario = async (req, res) => {
  const { id } = req.params;
  const { fecha, inicio, fin } = req.body;
  try {
    await pool.query(
      'UPDATE horario SET fecha = ?, inicio = ?, fin = ? WHERE id = ?',
      [fecha, inicio, fin, id]
    );
    res.json({ id, fecha, inicio, fin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Eliminar horario por ID
export const deleteHorario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM horario WHERE id = ?', [id]);
    res.json({ message: 'Horario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Obtener todos los horarios de un dentista específico
export const getHorariosPorDentista = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM horario WHERE id_dentista = ? ORDER BY fecha DESC, inicio DESC',
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    res.status(500).json({ message: 'Error al obtener horarios del dentista' });
  }
};
