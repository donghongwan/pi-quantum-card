// scripts/runAnalytics.js

const TransactionAnalytics = require('../src/core/analytics/transactionAnalytics');
const UserBehaviorAnalytics = require('../src/core/analytics/userBehaviorAnalytics');

// Sample data for demonstration purposes
const mockTransactions = [
    { amount: 100, timestamp: Date.now() - 86400000 }, // 1 day ago
    { amount: 200, timestamp: Date.now() - 172800000 }, // 2 days ago
    { amount: 150, timestamp: Date.now() - 259200000 }, // 3 days ago
];

const mockUser Data = [
    { age: 25, transactionHistory: [100, 200], engagementScore: 1, isRetained: true, lastActive: Date.now() - 86400000 },
    { age: 30, transactionHistory: [150], engagementScore: 0, isRetained: false, lastActive: Date.now() - 172800000 },
];

async function runAnalytics() {
    // Initialize analytics modules
    const transactionAnalytics = new TransactionAnalytics(mockTransactions);
    const userBehaviorAnalytics = new UserBehaviorAnalytics(mockUser Data);

    // Run transaction analytics
    console.log('Running Transaction Analytics...');
    const totalTransactions = transactionAnalytics.getTotalTransactions();
    const averageTransactionValue = transactionAnalytics.getAverageTransactionValue();
    console.log(`Total Transactions: ${totalTransactions}`);
    console.log(`Average Transaction Value: ${averageTransactionValue.toFixed(2)}`);

    // Run user behavior analytics
    console.log('Running User Behavior Analytics...');
    const activeUsers = userBehaviorAnalytics.getActiveUsers();
    const engagementRate = userBehaviorAnalytics.getUser EngagementRate();
    const retentionRate = userBehaviorAnalytics.getUser RetentionRate();
    console.log(`Active Users: ${activeUsers.length}`);
    console.log(`User  Engagement Rate: ${(engagementRate * 100).toFixed(2)}%`);
    console.log(`User  Retention Rate: ${(retentionRate * 100).toFixed(2)}%`);
}

// Execute the analytics script
runAnalytics().catch(err => {
    console.error('Error running analytics:', err);
    process.exit(1);
});
