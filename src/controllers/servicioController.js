const servicioModel = require('../models/servicioModel');
const pool = require('../config/db');
// Obtener todos los servicios por ID de usuario
const getAllServicios = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        const servicios = await servicioModel.getAllServiciosByUserId(req.user.id);
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener los servicios: ', error.message);
        res.status(500).json({ message: 'Error al obtener los servicios' });
    }
};

// Obtener una servicio por ID
const getServicio = async (req, res) => {
    try {
        const servicio = await servicioModel.getServicioByIdAndUserId(req.params.id, req.user.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        console.error('Error al obtener el servicio:', error);
        res.status(500).json({ message: 'Error al obtener el servicio' });
    }
};

// Agregar un nuevo servicio
const addServicio = async (req, res) => {
    const { name, description, precio, duracion_estimada } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'El título es obligatorio' });
    }

    try {
        const newServicio = await servicioModel.createServicio({
            name,
            description: description || "Sin descripción ",
            precio: precio || 0,
            user_id: req.user.id,
            duracion_estimada: duracion_estimada || 60
        });
        res.status(201).json(newServicio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el servicio' });
    }
};


// Actualizar una tarea existente
const updateServicio = async (req, res) => {
    const { name, description, precio, duracion_estimada } = req.body;
    const servicioId = req.params.id;
    const userId = req.user.id;

    console.log("Recibiendo datos en backend:", { servicioId, userId, name, description, precio });

    try {
        const [result] = await pool.query(
            'UPDATE servicio SET name = ?, description = ?, precio = ?, duracion_estimada = ? WHERE id = ? AND user_id = ?',
            [name, description || null, precio, duracion_estimada, servicioId, userId]
        );


        console.log("Resultado SQL:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }

        res.json({ id: servicioId, name, description, precio, duracion_estimada });
    } catch (error) {
        console.error("⚠️ Error en el servidor:", error);
        res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
    }

};






// Eliminar una tarea
const deleteServicio = async (req, res) => {
    try {
        const servicio = await servicioModel.getServicioByIdAndUserId(req.params.id, req.user.id);

        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        await servicioModel.deleteServicio(req.params.id);
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).json({ message: 'Error al eliminar el servicio' });
    }
};

module.exports = {
    getAllServicios,
    getServicio,
    addServicio,
    updateServicio,
    deleteServicio,
};