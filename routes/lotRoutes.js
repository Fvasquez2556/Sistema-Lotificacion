const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addLot, getLots, deleteLot } = require('../controllers/lotController');

router.route('/').post(protect, addLot).get(protect, getLots);
router.route('/:id').delete(protect, deleteLot);

module.exports = router;
