const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middlewares/authMiddleware');
const adminMiddleware = require('./middlewares/adminMiddleware');

const router = express.Router();

// User Authentication Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Admin Panel Routes (protected with adminMiddleware)
router.post('/users', authMiddleware, adminMiddleware, userController.createUser);
router.get('/users', authMiddleware, adminMiddleware, userController.getUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
