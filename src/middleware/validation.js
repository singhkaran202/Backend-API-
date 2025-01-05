// src/middleware/validation.js
const { query, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateGetUserById = [
    param('id').isMongoId().withMessage('Invalid user ID format'),
    handleValidationErrors
];

const validateGetTransactions = [
    query('status').optional().isIn(['success', 'pending', 'failed'])
        .withMessage('Invalid status value'),
    query('type').optional().isIn(['debit', 'credit'])
        .withMessage('Invalid transaction type'),
    query('fromDate').optional().isISO8601()
        .withMessage('Invalid fromDate format. Use ISO 8601 format'),
    query('toDate').optional().isISO8601()
        .withMessage('Invalid toDate format. Use ISO 8601 format'),
    query('page').optional().isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    handleValidationErrors
];

module.exports = {
    validateGetUserById,
    validateGetTransactions
};