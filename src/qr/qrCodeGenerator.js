// src/qr/qrCodeGenerator.js

const QRCode = require('qrcode');

class QRCodeGenerator {
    static async generateQRCode(data, options = {}) {
        try {
            const qrCodeUrl = await QRCode.toDataURL(data, options);
            console.log('QR Code generated successfully:', qrCodeUrl);
            return qrCodeUrl;
        } catch (error) {
            console.error('Error generating QR Code:', error);
            throw error;
        }
    }
}

module.exports = QRCodeGenerator;

// Example usage:
// (async () => {
//     const qrCode = await QRCodeGenerator.generateQRCode('https://example.com');
//     console.log(qrCode);
// })();
