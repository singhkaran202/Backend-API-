// src/controllers/user.controller.js
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');

const userController = {
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserTransactions: async (req, res) => {
        try {
            const { status, type, fromDate, toDate, page = 1, limit = 10 } = req.query;
            const userId = req.params.id;

            // Build match conditions for aggregation
            const matchConditions = {
                userId: new mongoose.Types.ObjectId(userId)
            };

            if (status) matchConditions.status = status;
            if (type) matchConditions.type = type;
            if (fromDate || toDate) {
                matchConditions.transactionDate = {};
                if (fromDate) matchConditions.transactionDate.$gte = new Date(fromDate);
                if (toDate) matchConditions.transactionDate.$lte = new Date(toDate);
            }

            // Calculate skip value for pagination
            const skip = (page - 1) * limit;

            const transactions = await Transaction.aggregate([
                { $match: matchConditions },
                { $sort: { transactionDate: -1 } },
                { $skip: parseInt(skip) },
                { $limit: parseInt(limit) },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' }
            ]);

            // Get total count for pagination
            const total = await Transaction.countDocuments(matchConditions);

            res.json({
                data: transactions,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;