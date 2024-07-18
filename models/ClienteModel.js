// models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    DPI: { type: String, required: true },
    Extendidoen: { type: String, required: true },
    Apellidos: { type: String, required: true },
    Nombres: { type: String, required: true },
    Dirección: { type: String, required: true },
    Teléfono: { type: String, required: true },
    Nit: { type: String, required: true },
    FechaNacimiento: { type: Date, required: true },
    Edad: { type: Number, required: true },
    Nacionalidad: { type: String, required: true },
    EstadoCivil: { type: String, required: true },
    Dependientes: { type: Number, required: true },
    Profesión: { type: String, required: true },
    Empresa: { type: String, required: true },
    TiempoTrabajo: { type: String, required: true },
    Ingreso: { type: Number, required: true }
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
