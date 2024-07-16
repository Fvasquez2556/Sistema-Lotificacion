const express = require('express');
const router = express.Router();
const {
    getPromesas,
    createPromesa,
    deletePromesa
} = require('../controllers/promesasController');
const { protect } = require('../middlewares/authMiddleware');

// Ruta para obtener todas las promesas de compra
router.get('/', protect, getPromesas);

// Ruta para crear una nueva promesa de compra
router.post('/', protect, createPromesa);

// Ruta para eliminar una promesa de compra
router.delete('/:id', protect, deletePromesa);

module.exports = router;
