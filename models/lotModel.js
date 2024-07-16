const mongoose = require('mongoose');

const lotSchema = mongoose.Schema({
    lotNumber: {
        type: String,
        required: true,
        unique: true,
    },
    lotSize: {
        type: String,
        required: true,
    },
    lotArea: {
        type: Number,
        required: true,
    },
    lotPrice: {
        type: Number,
        required: true,
    },
    downPayment: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Libre',
    },
}, {
    timestamps: true,
});

const Lot = mongoose.model('Lot', lotSchema);

module.exports = Lot;
