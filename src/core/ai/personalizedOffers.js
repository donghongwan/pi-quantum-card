// src/core/ai/personalizedOffers.js

const tf = require('@tensorflow/tfjs');

class PersonalizedOffers {
    constructor() {
        this.model = null;
    }

    async trainModel(userData) {
        const xs = tf.tensor2d(userData.map(user => [user.age, user.transactionHistory.length]));
        const ys = tf.tensor2d(userData.map(user => user.offerPreference));

        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

        await this.model.fit(xs, ys, { epochs: 100 });
    }

    async generateOffer(user) {
        const input = tf.tensor2d([[user.age, user.transactionHistory.length]]);
        const prediction = this.model.predict(input);
        return prediction.dataSync()[0] > 0.5 ? 'Special Offer' : 'Standard Offer';
    }
}

module.exports = PersonalizedOffers;
