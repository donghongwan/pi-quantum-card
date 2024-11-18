// src/api/aiApi.js

const express = require('express');
const router = express.Router();
const TransactionPredictor = require('../core/ai/transactionPrediction');
const FraudDetector = require('../core/ai/fraudDetection');
const PersonalizedOffers = require('../core/ai/personalizedOffers');

// Initialize AI modules
const transactionPredictor = new TransactionPredictor();
const fraudDetector = new FraudDetector();
const personalizedOffers = new PersonalizedOffers();

// Endpoint to get AI-generated recommendations
router.get('/recommendations', async (req, res) => {
    try {
        // Mock data for recommendations
        const recommendations = [
            { title: 'Upgrade to Premium', description: 'Get more features with our premium plan.' },
            { title: 'Refer a Friend', description: 'Earn rewards by referring friends.' },
        ];
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Endpoint to predict transaction patterns
router.post('/predict-transaction', async (req, res) => {
    const { amount, timestamp } = req.body;
    try {
        const prediction = await transactionPredictor.predict(amount, timestamp);
        res.json({ prediction });
    } catch (error) {
        res.status(500).json({ error: 'Failed to predict transaction' });
    }
});

// Endpoint to detect fraud
router.post('/detect-fraud', (req, res) => {
    const { transaction } = req.body;
    try {
        const isFraud = fraudDetector.detectFraud(transaction);
        res.json({ isFraud });
    } catch (error) {
        res.status(500).json({ error: 'Failed to detect fraud' });
    }
});

// Endpoint to generate personalized offers
router.post('/personalized-offer', async (req, res) => {
    const { user } = req.body;
    try {
        const offer = await personalizedOffers.generateOffer(user);
        res.json({ offer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate personalized offer' });
    }
});

module.exports = router;
