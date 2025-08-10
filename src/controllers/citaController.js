// controllers/citaController.js

import db from '../config/db.js';

export const getCitasByDentista = async (req, res) => {
  try {
    const dentistaId = req.query.dentistaId;
    if (!dentistaId) {
      return res.status(400).json({ error: 'dentistaId es requerido' });
    }
    const [citas] = await db.query('SELECT * FROM cita WHERE id_dentista = ?', [dentistaId]);
    return res.json(citas);
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    return res.status(500).json({ error: 'Error en servidor' });
  }
};

export const createCita = async (req, res) => {
  try {
    const { fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description, status, id_horario } = req.body;

    if (!fecha || !inicio || !fin || !id_dentista || !id_paciente || !id_servicio || !id_horario) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const [result] = await db.query(
      `INSERT INTO cita (fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description, status, id_horario) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description || '', status || 'Pendiente', id_horario]
    );

    return res.status(201).json({ message: 'Cita creada', id: result.insertId });
  } catch (error) {
    console.error('Error creando cita:', error);
    return res.status(500).json({ error: 'Error en servidor' });
  }
};
