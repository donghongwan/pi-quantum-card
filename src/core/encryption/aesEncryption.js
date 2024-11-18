// src/core/encryption/aesEncryption.js

const crypto = require('crypto');

class AESEncryption {
    constructor(secretKey) {
        this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
        this.iv = crypto.randomBytes(16);
    }

    encrypt(data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { iv: this.iv.toString('hex'), encryptedData: encrypted };
    }

    decrypt(encryptedData) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, Buffer.from(encryptedData.iv, 'hex'));
        let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

module.exports = AESEncryption;
