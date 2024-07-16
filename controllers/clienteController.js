const asyncHandler = require('express-async-handler');
const Cliente = require('../models/clienteModel');

// @desc    Agregar nuevo cliente
// @route   POST /api/clientes
// @access  Private
const addCliente = asyncHandler(async (req, res) => {
    const cliente = new Cliente(req.body);
    const createdCliente = await cliente.save();
    res.status(201).json(createdCliente);
});

// @desc    Obtener todos los clientes
// @route   GET /api/clientes
// @access  Private
const getClientes = asyncHandler(async (req, res) => {
    const clientes = await Cliente.find({});
    res.json(clientes);
});

// @desc    Actualizar cliente
// @route   PUT /api/clientes/:id
// @access  Private
const updateCliente = asyncHandler(async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);

    if (cliente) {
        cliente.dpi = req.body.dpi || cliente.dpi;
        cliente.extendidoen = req.body.extendidoen || cliente.extendidoen;
        cliente.apellidos = req.body.apellidos || cliente.apellidos;
        cliente.nombres = req.body.nombres || cliente.nombres;
        cliente.direccion = req.body.direccion || cliente.direccion;
        cliente.telefono = req.body.telefono || cliente.telefono;
        cliente.nit = req.body.nit || cliente.nit;
        cliente.fechanacimiento = req.body.fechanacimiento || cliente.fechanacimiento;
        cliente.edad = req.body.edad || cliente.edad;
        cliente.nacionalidad = req.body.nacionalidad || cliente.nacionalidad;
        cliente.estadocivil = req.body.estadocivil || cliente.estadocivil;
        cliente.dependientes = req.body.dependientes || cliente.dependientes;
        cliente.profesion = req.body.profesion || cliente.profesion;
        cliente.empresa = req.body.empresa || cliente.empresa;
        cliente.tiempotrabajo = req.body.tiempotrabajo || cliente.tiempotrabajo;
        cliente.ingreso = req.body.ingreso || cliente.ingreso;

        const updatedCliente = await cliente.save();
        res.json(updatedCliente);
    } else {
        res.status(404);
        throw new Error('Cliente no encontrado');
    }
});

// @desc    Eliminar cliente
// @route   DELETE /api/clientes/:id
// @access  Private
const deleteCliente = asyncHandler(async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);

    if (cliente) {
        await cliente.remove();
        res.json({ message: 'Cliente eliminado' });
    } else {
        res.status(404);
        throw new Error('Cliente no encontrado');
    }
});

module.exports = {
    addCliente,
    getClientes,
    updateCliente,
    deleteCliente
};
