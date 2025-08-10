// src/index.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoute.js';
import servicioRoutes from './routes/servicioRoute.js';
import horarioRoutes from './routes/horarioRoutes.js';
import authRoutes from './routes/authRoutes.js';
import citaRoutes from './routes/citaRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API Clínica Dental en funcionamiento ✅');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
