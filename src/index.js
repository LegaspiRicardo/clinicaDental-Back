const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();


// Middleware
app.use(cors(
    {origin: 'http://localhost:5173', // Cambia esto a tu frontend si es necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Permite enviar cookies y encabezados de autenticación
    }
));
app.use(express.json());

// Rutas crear servicios

const servicioRoutes = require('./routes/servicioRoute');
app.use('/api/servicios', servicioRoutes);

// Rutas crear usuarios
const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

//login
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//inicializar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> {
    console.log(`Servidor corriendo papi en puerto: ${PORT}`);
});