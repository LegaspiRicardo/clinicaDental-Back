const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const pool = require('../config/db');


const getPacientes = async (req, res) => {
    try {
        const pacientes = await userModel.getUsersByRole('Paciente');
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
};

const getDentistas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE rol = 'Dentista'");
        res.json(rows); 
    } catch (error) {
        console.error('Error al obtener dentistas:', error);
        res.status(500).json({ error: 'Error al obtener dentistas' });
    }
};


const registerUser = async (req, res) => {

    const { username, email, password, telefono, rol, status, especialidad } = req.body;
    console.log("Datos recibidos en /register:", req.body);
    // Validar campos obligatorios (puedes ajustar según necesites)
    if (!username || !email || !password || !rol) {
        return res.status(400).json({ error: 'username, email, password y rol son obligatorios' });
    }

 try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({
            username,
            email,
            password: hashedPassword,
            telefono,
            rol,
            status,
            especialidad,
        });

        res.status(201).json(newUser);
    }  catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error en getUserById:", error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // aquí vienen los campos a actualizar

    try {
        const updated = await userModel.updateUser(id, updates);

        if (updated) {
            res.json({ message: 'Paciente actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ error: 'Error al actualizar paciente' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await userModel.deleteUser(id);

        if (deleted) {
            res.json({ message: 'Paciente eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
};




module.exports = {
    registerUser,
    getPacientes,
    getUserById,
    updateUser,
    deleteUser,
    getDentistas,
};
