// src/core/rewards/loyaltyProgram.js

class LoyaltyProgram {
    constructor() {
        this.users = new Map(); // Store user points
    }

    enrollUser(userId) {
        if (!this.users.has(userId)) {
            this.users.set(userId, 0);
            console.log(`User ${userId} enrolled in the loyalty program.`);
        } else {
            console.log(`User ${userId} is already enrolled.`);
        }
    }

    earnPoints(userId, points) {
        if (this.users.has(userId)) {
            this.users.set(userId, this.users.get(userId) + points);
            console.log(`User ${userId} earned ${points} points.`);
        } else {
            console.log(`User ${userId} is not enrolled.`);
        }
    }

    redeemPoints(userId, points) {
        if (this.users.has(userId)) {
            const currentPoints = this.users.get(userId);
            if (currentPoints >= points) {
                this.users.set(userId, currentPoints - points);
                console.log(`User ${userId} redeemed ${points} points.`);
            } else {
                console.log(`User ${userId} does not have enough points.`);
            }
        } else {
            console.log(`User ${userId} is not enrolled.`);
        }
    }

    getPoints(userId) {
        return this.users.get(userId) || 0;
    }
}

module.exports = LoyaltyProgram;

// Example usage:
// const loyaltyProgram = new LoyaltyProgram();
// loyaltyProgram.enrollUser('user1');
// loyaltyProgram.earnPoints('user1', 100);
// console.log(loyaltyProgram.getPoints('user1')); // 100
// loyaltyProgram.redeemPoints('user1', 50);
// console.log(loyaltyProgram.getPoints('user1')); // 50
