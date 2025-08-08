// src/models/horarioModel.js
import pool from '../config/db.js';

export const getHorariosPorDentista = async (id_dentista) => {
  const [rows] = await pool.query(
    'SELECT * FROM horario WHERE id_dentista = ? ORDER BY fecha DESC, inicio DESC',
    [id_dentista]
  );
  return rows;
};
