// tests/unit/rewards.test.js

import { calculateRewards, redeemRewards } from '../../src/utils/rewards'; // Adjust the import path as necessary

describe('Rewards Module', () => {
  test('should calculate rewards correctly', () => {
    const points = 100;
    const rewards = calculateRewards(points);
    expect(rewards).toBe(10); // Assuming 1 reward per 10 points
  });

  test('should redeem rewards successfully', () => {
    const initialPoints = 100;
    const rewards = redeemRewards(initialPoints, 5);
    expect(rewards).toBe(50); // Assuming redeeming 5 rewards costs 50 points
  });

  test('should not redeem rewards if insufficient points', () => {
    const initialPoints = 30;
    expect(() => redeemRewards(initialPoints, 5)).toThrow('Insufficient points');
  });
});
