// tests/unit/biometric.test.js

import { authenticateUser , registerBiometric } from '../../src/utils/biometric'; // Adjust the import path as necessary

describe('Biometric Module', () => {
  const userId = 'user123';
  const biometricData = 'sampleBiometricData';

  test('should register biometric data', () => {
    const result = registerBiometric(userId, biometricData);
    expect(result).toBe(true); // Assuming registration returns true on success
  });

  test('should authenticate user with biometric data', () => {
    registerBiometric(userId, biometricData);
    const result = authenticateUser (userId, biometricData);
    expect(result).toBe(true); // Should authenticate successfully
  });

  test('should fail authentication with incorrect data', () => {
    registerBiometric(userId, biometricData);
    const result = authenticateUser (userId, 'wrongData');
    expect(result).toBe(false); // Should fail authentication
  });
});
