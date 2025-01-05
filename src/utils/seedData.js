// src/utils/seedData.js
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
require('dotenv').config();

const generateRandomPhone = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
};

const generateRandomTransaction = (userId) => {
    const statuses = ['success', 'pending', 'failed'];
    const types = ['debit', 'credit'];
    
    return {
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type: types[Math.floor(Math.random() * types.length)],
        transactionDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
        amount: Math.floor(Math.random() * 10000) + 100,
        userId: userId
    };
};

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Transaction.deleteMany({});
        console.log('Cleared existing data');

        // Create 10 users
        const users = await User.insertMany(
            Array.from({ length: 10 }, (_, i) => ({
                name: `User ${i + 1}`,
                phoneNumber: generateRandomPhone().toString()
            }))
        );
        console.log('Created users');

        // Create 5 transactions for each user
        const transactions = [];
        for (const user of users) {
            const userTransactions = Array.from({ length: 5 }, () => 
                generateRandomTransaction(user._id)
            );
            transactions.push(...userTransactions);
        }

        await Transaction.insertMany(transactions);
        console.log('Created transactions');

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();