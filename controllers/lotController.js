const asyncHandler = require('express-async-handler');
const Lot = require('../models/lotModel');

// Agregar un nuevo lote
const addLot = asyncHandler(async (req, res) => {
    const { lotNumber, lotSize, lotArea, lotPrice, downPayment, status } = req.body;

    const lot = new Lot({
        lotNumber,
        lotSize,
        lotArea,
        lotPrice,
        downPayment,
        status,
    });

    const createdLot = await lot.save();
    res.status(201).json(createdLot);
});

// Obtener todos los lotes
const getLots = asyncHandler(async (req, res) => {
    const lots = await Lot.find({});
    res.json(lots);
});

// Eliminar un lote
const deleteLot = asyncHandler(async (req, res) => {
    const lot = await Lot.findById(req.params.id);

    if (lot) {
        await Lot.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lote eliminado' });
    } else {
        res.status(404);
        throw new Error('Lote no encontrado');
    }
});

module.exports = { addLot, getLots, deleteLot };
