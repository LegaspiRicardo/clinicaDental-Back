import pool from '../config/db.js';

export const createCita = async (req, res) => {
  try {
    const {
      id_horario,
      id_dentista,
      id_paciente,
      id_servicio,
      fecha,
      inicio,
      fin,
      description,
      status,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO cita
      (id_horario, id_dentista, id_paciente, id_servicio, fecha, inicio, fin, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_horario,
        id_dentista,
        id_paciente,
        id_servicio,
        fecha,
        inicio,
        fin,
        description,
        status,
      ]
    );

    res.status(201).json({ message: 'Cita creada', id: result.insertId });
  } catch (error) {
    console.error('Error creando cita:', error);
    res.status(500).json({ error: 'Error creando cita' });
  }
};

export const getCitasByDentista = async (req, res) => {
  try {
    const { dentistaId } = req.query;

    const [rows] = await pool.query(
      `
      SELECT 
        c.id,
        c.fecha,
        c.inicio,
        c.fin,
        c.status,
        c.description AS description,
        c.id_horario,  -- <--- agregar esta línea
        p.username AS paciente,
        s.name AS servicio,
        d.username AS dentista
      FROM cita c
      JOIN users p ON p.id = c.id_paciente AND p.rol = 'paciente'
      JOIN servicio s ON s.id = c.id_servicio
      JOIN users d ON d.id = c.id_dentista AND d.rol = 'dentista'
      WHERE (? IS NULL OR c.id_dentista = ?)

      `,
      [dentistaId || null, dentistaId || null]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    res.status(500).json({ error: 'Error obteniendo citas' });
  }
};

