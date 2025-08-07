import pool from '../config/db.js';


export const obtenerHorarios = async () => {
  const [rows] = await pool.query('SELECT * FROM horario ORDER BY fecha DESC, inicio DESC');
  return rows;
};

export const crearHorario = async ({ id_dentista, fecha, inicio, fin }) => {
  const sql = 'INSERT INTO horario (id_dentista, fecha, inicio, fin) VALUES (?, ?, ?, ?)';
  const [result] = await pool.query(sql, [id_dentista, fecha, inicio, fin]);
  return result.insertId;
};
