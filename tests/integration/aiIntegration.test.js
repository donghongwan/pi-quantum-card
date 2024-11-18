// tests/integration/aiIntegration.test.js

const request = require('supertest');
const express = require('express');
const aiApi = require('../../src/api/aiApi');

const app = express();
app.use(express.json());
app.use('/api/ai', aiApi);

describe('AI API Integration Tests', () => {
    test('GET /recommendations should return AI-generated recommendations', async () => {
        const response = await request(app).get('/api/ai/recommendations');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
    });

    test('POST /predict-transaction should return a prediction', async () => {
        const response = await request(app)
            .post('/api/ai/predict-transaction')
            .send({ amount: 100, timestamp: Date.now() });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('prediction');
    });

    test('POST /detect-fraud should return fraud detection result', async () => {
        const response = await request(app)
            .post('/api/ai/detect-fraud')
            .send({ transaction: { amount: 500, timestamp: Date.now() } });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('isFraud');
        expect(typeof response.body.isFraud).toBe('boolean');
    });

    test('POST /personalized-offer should return a personalized offer', async () => {
        const response = await request(app)
            .post('/api/ai/personalized-offer')
            .send({ user: { id: '123', preferences: ['sports', 'music'] } });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('offer');
        expect(response.body.offer).toHaveProperty('title');
        expect(response.body.offer).toHaveProperty('description');
    });
});
