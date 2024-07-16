const express = require('express');
const { addCliente, getClientes, updateCliente, deleteCliente } = require('../controllers/clienteController');
const router = express.Router();

router.route('/').post(addCliente).get(getClientes);
router.route('/:id').put(updateCliente).delete(deleteCliente);

module.exports = router;
