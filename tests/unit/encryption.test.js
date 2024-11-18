// tests/unit/encryption.test.js

import { encrypt, decrypt } from '../../src/utils/encryption'; // Adjust the import path as necessary

describe('Encryption Module', () => {
  const secretKey = 'mySecretKey';
  const data = 'Hello, World!';

  test('should encrypt data correctly', () => {
    const encryptedData = encrypt(data, secretKey);
    expect(encryptedData).not.toBe(data); // Encrypted data should not be the same as original
  });

  test('should decrypt data correctly', () => {
    const encryptedData = encrypt(data, secretKey);
    const decryptedData = decrypt(encryptedData, secretKey);
    expect(decryptedData).toBe(data); // Decrypted data should match original
  });

  test('should throw error on incorrect decryption', () => {
    const encryptedData = encrypt(data, secretKey);
    expect(() => decrypt(encryptedData, 'wrongKey')).toThrow('Decryption failed');
  });
});
