const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    //validar campos
    if(!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //crear usuario
        const newUser = await userModel.createUser({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    }catch (error) {
        console.error(error);
        if(error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear el usuario' }); //ERROR DE SERVIDOR
    }
};

module.exports = {
    registerUser
};