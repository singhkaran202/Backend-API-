// src/routes/transaction.routes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// Get all transactions with filters
router.get('/', transactionController.getAllTransactions);

module.exports = router;