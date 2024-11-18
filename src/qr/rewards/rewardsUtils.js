// src/qr/rewards/rewardsUtils.js

class RewardsUtils {
    static calculateRewardPoints(amountSpent) {
        const pointsPerDollar = 10; // Example: 10 points for every dollar spent
        return amountSpent * pointsPerDollar;
    }

    static transferPoints(fromUser, toUser, points, loyaltyProgram) {
        const fromPoints = loyaltyProgram.getPoints(fromUser);
        if (fromPoints >= points) {
            loyaltyProgram.redeemPoints(fromUser, points);
            loyaltyProgram.earnPoints(toUser, points);
            console.log(`Transferred ${points} points from ${fromUser} to ${toUser}.`);
        } else {
            console.log(`User ${fromUser} does not have enough points to transfer.`);
        }
    }
}

module.exports = RewardsUtils;

// Example usage:
// const rewardsUtils = require('./rewardsUtils');
// rewardsUtils.transferPoints('user1', 'user2', 20, loyaltyProgram);
