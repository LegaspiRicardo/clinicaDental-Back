const pool = require('../config/db');


const getAllServiciosByUserId = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM servicio WHERE user_id = ?', [userId]);
  return rows;
};

const getServicioByIdAndUserId = async (servicioId, userId) => {
    const [rows] = await pool.query('SELECT * FROM servicio WHERE id = ? AND user_id = ?', [servicioId, userId]);
    return rows[0];
};

const createServicio = async ({ name, description, precio, duracion_estimada, user_id }) => {
    const [result] = await pool.query(
        'INSERT INTO servicio (name, description, precio, duracion_estimada, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, description, precio, duracion_estimada, user_id]
    );
    return { id: result.insertId, name, description, precio, duracion_estimada, user_id };
};


const updateServicio = async (servicioId, servicio) => { 
    const { name, description = null, precio, duracion_estimada } = servicio;

    await pool.query(
        'UPDATE servicio SET name = ?, description = ?, precio = ?, duracion_estimada = ? WHERE id = ?',
        [name, description, precio, duracion_estimada, servicioId]
    );

    return { id: servicioId, name, description, precio, duracion_estimada };
};






const deleteServicio = async (servicioId) => {
    await pool.query('DELETE FROM servicio WHERE id = ?', [servicioId]);
};

module.exports = {
    getAllServiciosByUserId,
    getServicioByIdAndUserId,
    createServicio,
    updateServicio,
    deleteServicio,
};