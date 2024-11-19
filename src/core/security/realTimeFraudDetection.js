// src/core/security/realTimeFraudDetection.js

const { TransactionAnalyzer } = require('../analytics/transactionAnalyzer');
const { MachineLearningModel } = require('../ml/machineLearningModel');
const { AlertService } = require('../notifications/alertService');

class RealTimeFraudDetection {
    constructor() {
        this.transactionAnalyzer = new TransactionAnalyzer();
        this.mlModel = new MachineLearningModel();
        this.alertService = new AlertService();
    }

    async monitorTransactions(transactions) {
        try {
            for (const transaction of transactions) {
                const isFraudulent = await this.detectFraud(transaction);
                if (isFraudulent) {
                    await this.handleFraudAlert(transaction);
                }
            }
        } catch (error) {
            console.error('Real-Time Fraud Detection Error:', error);
        }
    }

    async detectFraud(transaction) {
        const riskScore = await this.mlModel.predict(transaction);
        return riskScore > 0.7; // Threshold for fraud detection
    }

    async handleFraudAlert(transaction) {
        await this.alertService.sendAlert({
            message: 'Fraudulent transaction detected',
            transactionId: transaction.id,
            amount: transaction.amount
        });
    }

    // Advanced anomaly detection methods
    async analyzeTransactionPatterns(userId) {
        const transactionHistory = await this.transactionAnalyzer.getUserTransactionHistory(userId);
        return this.transactionAnalyzer.detectAnomalies(transactionHistory);
    }
}

module.exports = new RealTimeFraudDetection();
