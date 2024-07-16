const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const { createAdminIfNotExists } = require('./controllers/userController');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Rutas importadas
const userRoutes = require('./routes/userRoutes');
const promesasRoutes = require('./routes/promesasRoutes');
const lotRoutes = require('./routes/lotRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // Nueva ruta para clientes

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar rutas
app.use('/api/users', userRoutes);
app.use('/api/promesas', promesasRoutes);
app.use('/api/lotes', lotRoutes);
app.use('/api/clientes', clienteRoutes); // Nueva ruta para clientes

// Crear usuario administrador si no existe
createAdminIfNotExists();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para la página principal
app.get('/mainPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainPage.html'));
});

// Ruta para la página de promesas
app.get('/promesas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'promesas.html'));
});

// Ruta para la página de lotes
app.get('/lotes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lotes.html'));
});

// Redirigir la raíz al inicio de sesión por defecto
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Middleware para manejar errores
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Conexión a la base de datos directamente en server.js
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});
