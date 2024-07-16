const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
} = require('../controllers/userController');

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, getUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);

module.exports = router;
