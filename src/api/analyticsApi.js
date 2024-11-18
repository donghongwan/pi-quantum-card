// src/api/analyticsApi.js

const express = require('express');
const router = express.Router();
const TransactionAnalytics = require('../core/analytics/transactionAnalytics');
const UserBehaviorAnalytics = require('../core/analytics/userBehaviorAnalytics');

// Mock data for transactions and users
const transactions = [
    { amount: 100, timestamp: Date.now() - 86400000 }, // 1 day ago
    { amount: 200, timestamp: Date.now() - 172800000 }, // 2 days ago
    { amount: 150, timestamp: Date.now() - 259200000 }, // 3 days ago
];

const userData = [
    { age: 25, transactionHistory: [100, 200], engagementScore: 1, isRetained: true, lastActive: Date.now() - 86400000 },
    { age: 30, transactionHistory: [150], engagementScore: 0, isRetained: false, lastActive: Date.now() - 172800000 },
];

// Endpoint to get transaction analytics
router.get('/transaction-analytics', (req, res) => {
    const analytics = new TransactionAnalytics(transactions);
    const totalTransactions = analytics.getTotalTransactions();
    const averageTransactionValue = analytics.getAverageTransactionValue();
    const transactionTrends = analytics.getTransactionTrends();

    res.json({
        totalTransactions,
        averageTransactionValue,
        transactionTrends,
    });
});

// Endpoint to get user behavior analytics
router.get('/user-behavior-analytics', (req, res) => {
    const analytics = new UserBehaviorAnalytics(userData);
    const activeUsers = analytics.getActiveUsers();
    const engagementRate = analytics.getUser EngagementRate();
    const retentionRate = analytics.getUser RetentionRate();

    res.json({
        activeUsers,
        engagementRate,
        retentionRate,
    });
});

module.exports = router;
