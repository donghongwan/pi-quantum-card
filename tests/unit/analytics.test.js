// tests/unit/analytics.test.js

const TransactionAnalytics = require('../src/core/analytics/transactionAnalytics');
const UserBehaviorAnalytics = require('../src/core/analytics/userBehaviorAnalytics');

describe('Analytics Modules', () => {
    let transactionAnalytics;
    let userBehaviorAnalytics;

    const mockTransactions = [
        { amount: 100, timestamp: Date.now() - 86400000 }, // 1 day ago
        { amount: 200, timestamp: Date.now() - 172800000 }, // 2 days ago
        { amount: 150, timestamp: Date.now() - 259200000 }, // 3 days ago
    ];

    const mockUserData = [
        { age: 25, transactionHistory: [100, 200], engagementScore: 1, isRetained: true, lastActive: Date.now() - 86400000 },
        { age: 30, transactionHistory: [150], engagementScore: 0, isRetained: false, lastActive: Date.now() - 172800000 },
    ];

    beforeEach(() => {
        transactionAnalytics = new TransactionAnalytics(mockTransactions);
        userBehaviorAnalytics = new UserBehaviorAnalytics(mockUserData);
    });

    test('TransactionAnalytics should calculate total transactions', () => {
        const totalTransactions = transactionAnalytics.getTotalTransactions();
        expect(totalTransactions).toBe(3);
    });

    test('TransactionAnalytics should calculate average transaction value', () => {
        const averageTransactionValue = transactionAnalytics.getAverageTransactionValue();
        expect(averageTransactionValue).toBeCloseTo(150, 5);
    });

    test('UserBehaviorAnalytics should return active users', () => {
        const activeUsers = userBehaviorAnalytics.getActiveUsers();
        expect(activeUsers.length).toBe(1); // Only one user is active
    });

    test('UserBehaviorAnalytics should calculate engagement rate', () => {
        const engagementRate = userBehaviorAnalytics.getUserEngagementRate();
        expect(engagementRate).toBeCloseTo(0.5, 5); // 50% engagement
    });

    test('UserBehaviorAnalytics should calculate retention rate', () => {
        const retentionRate = userBehaviorAnalytics.getUserRetentionRate();
        expect(retentionRate).toBeCloseTo(0.5, 5); // 50% retention
    });
});
