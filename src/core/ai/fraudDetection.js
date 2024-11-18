// src/core/ai/fraudDetection.js

const { KMeans } = require('ml-kmeans');

class FraudDetector {
    constructor() {
        this.model = null;
    }

    trainModel(data) {
        const kmeans = new KMeans({ k: 2 });
        const clusters = kmeans.cluster(data);
        this.model = clusters;
    }

    detectFraud(transaction) {
        const distances = this.model.centroids.map(centroid => {
            return Math.sqrt(Math.pow(transaction.amount - centroid[0], 2) + Math.pow(transaction.timestamp - centroid[1], 2));
        });
        return distances[0] > distances[1]; // If closer to the second centroid, it's likely fraud
    }
}

module.exports = FraudDetector;
