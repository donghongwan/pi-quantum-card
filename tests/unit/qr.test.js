// tests/unit/qr.test.js

import { generateQRCode, decodeQRCode } from '../../src/utils/qr'; // Adjust the import path as necessary

describe('QR Code Module', () => {
  const data = 'https://example.com';

  test('should generate a QR code', () => {
    const qrCode = generateQRCode(data);
    expect(qrCode).toBeDefined(); // QR code should be generated
  });

  test('should decode a QR code', () => {
    const qrCode = generateQRCode(data);
    const decodedData = decodeQRCode(qrCode);
    expect(decodedData).toBe(data); // Decoded data should match original
  });

  test('should throw error on invalid QR code', () => {
    expect(() => decodeQRCode('invalidQRCode')).toThrow('Invalid QR code');
  });
});
