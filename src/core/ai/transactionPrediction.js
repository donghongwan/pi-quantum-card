// src/core/ai/transactionPrediction.js

const tf = require('@tensorflow/tfjs');

class TransactionPredictor {
    constructor() {
        this.model = null;
    }

    async trainModel(data) {
        const xs = tf.tensor2d(data.map(d => [d.amount, d.timestamp]));
        const ys = tf.tensor2d(data.map(d => d.label));

        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

        await this.model.fit(xs, ys, { epochs: 100 });
    }

    async predict(amount, timestamp) {
        const input = tf.tensor2d([[amount, timestamp]]);
        const prediction = this.model.predict(input);
        return prediction.dataSync()[0];
    }
}

module.exports = TransactionPredictor;
