// src/core/analytics/transactionAnalytics.js

class TransactionAnalytics {
    constructor(transactions) {
        this.transactions = transactions;
    }

    getTotalTransactions() {
        return this.transactions.length;
    }

    getAverageTransactionValue() {
        const totalValue = this.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        return totalValue / this.getTotalTransactions();
    }

    getTransactionTrends() {
        const trends = {};
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.timestamp).toDateString();
            trends[date] = (trends[date] || 0) + transaction.amount;
        });
        return trends;
    }
}

module.exports = TransactionAnalytics;
