// tests/integration/smartContractIntegration.test.js

import { deployContract, callContractMethod } from '../../src/utils/smartContract'; // Adjust the import path as necessary

describe('Smart Contract Integration Tests', () => {
  let contractInstance;

  beforeAll(async () => {
    contractInstance = await deployContract(); // Deploy the contract before tests
  });

  test('should call a smart contract method successfully', async () => {
    const result = await callContractMethod(contractInstance, 'methodName', [arg1, arg2]); // Replace with actual method and args
    expect(result).toBeDefined(); // Ensure result is returned
  });

  test('should handle errors from smart contract', async () => {
    try {
      await callContractMethod(contractInstance, 'nonExistentMethod', []);
    } catch (error) {
      expect(error.message).toMatch(/revert/); // Check for revert error
    }
  });
});
