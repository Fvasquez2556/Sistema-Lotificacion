const mongoose = require('mongoose');

const promesaSchema = mongoose.Schema(
    {
        lote: {
            type: String,
            required: true
        },
        cliente: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            required: true
        },
        precio: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Promesa = mongoose.model('Promesa', promesaSchema);

module.exports = Promesa;
