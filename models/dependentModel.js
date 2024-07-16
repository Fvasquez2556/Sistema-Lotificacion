const mongoose = require('mongoose');

const dependentSchema = mongoose.Schema({
    nombre: String,
    edad: Number,
    dpi: String
}, {
    timestamps: true
});

const Dependent = mongoose.model('Dependent', dependentSchema);

module.exports = Dependent;
