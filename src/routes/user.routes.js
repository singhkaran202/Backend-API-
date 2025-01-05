// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get user by ID
router.get('/:id', userController.getUserById);

// Get transactions for a specific user
router.get('/:id/transactions', userController.getUserTransactions);

module.exports = router;