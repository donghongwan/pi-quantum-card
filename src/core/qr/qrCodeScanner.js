// src/core/qr/qrCodeScanner.js

const jsQR = require('jsqr');

class QRCodeScanner {
    static scanQRCode(imageData, width, height) {
        const code = jsQR(imageData, width, height);
        if (code) {
            console.log('QR Code scanned successfully:', code.data);
            return code.data;
        } else {
            console.log('No QR Code found.');
            return null;
        }
    }
}

module.exports = QRCodeScanner;

// Example usage:
// const fs = require('fs');
// const { createCanvas, loadImage } = require('canvas');

// (async () => {
//     const image = await loadImage('path/to/qr-code-image.png');
//     const canvas = createCanvas(image.width, image.height);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(image, 0, 0);
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
//     const result = QRCodeScanner.scanQRCode(imageData, canvas.width, canvas.height);
//     console.log(result);
// })();
