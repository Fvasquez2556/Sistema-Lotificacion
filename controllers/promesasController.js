const asyncHandler = require('express-async-handler');
const Promesa = require('../models/promesaModel');

// @desc    Obtener todas las promesas de compra
// @route   GET /api/promesas
// @access  Private
const getPromesas = asyncHandler(async (req, res) => {
    const promesas = await Promesa.find();
    res.json(promesas);
});

// @desc    Crear una nueva promesa de compra
// @route   POST /api/promesas
// @access  Private
const createPromesa = asyncHandler(async (req, res) => {
    const { lote, cliente, fecha, precio } = req.body;
    
    const promesa = new Promesa({
        lote,
        cliente,
        fecha,
        precio
    });
    
    const createdPromesa = await promesa.save();
    res.status(201).json(createdPromesa);
});

// @desc    Eliminar una promesa de compra
// @route   DELETE /api/promesas/:id
// @access  Private
const deletePromesa = asyncHandler(async (req, res) => {
    const promesa = await Promesa.findById(req.params.id);

    if (promesa) {
        await promesa.remove();
        res.json({ message: 'Promesa de compra eliminada' });
    } else {
        res.status(404);
        throw new Error('Promesa de compra no encontrada');
    }
});

module.exports = {
    getPromesas,
    createPromesa,
    deletePromesa
};
