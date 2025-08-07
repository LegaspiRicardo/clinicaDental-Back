import pool from '../config/db.js';

export const getAllHorarios = async (req, res) => {
    try {
        const { dentistaId } = req.query;
        let query = 'SELECT * FROM horario';
        const params = [];

        if (dentistaId) {
            query += ' WHERE id_dentista = ?';
            params.push(dentistaId);
        }

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener horarios', error });
    }
};

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

export const deleteHorario = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM horario WHERE id = ?', [id]);
        res.json({ message: 'Horario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
