// tests/unit/ai.test.js

const TransactionPredictor = require('../src/core/ai/transactionPrediction');
const FraudDetector = require('../src/core/ai/fraudDetection');
const PersonalizedOffers = require('../src/core/ai/personalizedOffers');

describe('AI Modules', () => {
    let transactionPredictor;
    let fraudDetector;
    let personalizedOffers;

    beforeEach(() => {
        transactionPredictor = new TransactionPredictor();
        fraudDetector = new FraudDetector();
        personalizedOffers = new PersonalizedOffers();
    });

    test('TransactionPredictor should predict transaction patterns', async () => {
        const amount = 100;
        const timestamp = Date.now();
        const prediction = await transactionPredictor.predict(amount, timestamp);
        expect(prediction).toBeDefined();
        expect(typeof prediction).toBe('object');
    });

    test('FraudDetector should detect fraud', () => {
        const transaction = { amount: 500, timestamp: Date.now() };
        const isFraud = fraudDetector.detectFraud(transaction);
        expect(typeof isFraud).toBe('boolean');
    });

    test('PersonalizedOffers should generate an offer', async () => {
        const user = { id: '123', preferences: ['sports', 'music'] };
        const offer = await personalizedOffers.generateOffer(user);
        expect(offer).toBeDefined();
        expect(typeof offer).toBe('object');
        expect(offer.title).toBeDefined();
        expect(offer.description).toBeDefined();
    });
});
