import pool from '../config/db.js';

// Crear una nueva cita
export const createCita = async (cita) => {
  const { fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description, status, id_horario } = cita;

  const [result] = await pool.query(
    `INSERT INTO cita (fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description, status, id_horario)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [fecha, inicio, fin, id_dentista, id_paciente, id_servicio, description, status, id_horario]
  );

  return { id: result.insertId, ...cita };
};

// Opcional: obtener todas las citas (por ejemplo)
export const getCitas = async () => {
  const [rows] = await pool.query('SELECT * FROM cita ORDER BY fecha, inicio');
  return rows;
};
