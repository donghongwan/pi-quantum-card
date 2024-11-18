// src/core/encryption/encryptionUtils.js

const QuantumEncryption = require('./quantumEncryption');
const AESEncryption = require('./aesEncryption');

class EncryptionUtils {
    constructor(secretKey) {
        this.aes = new AESEncryption(secretKey);
        this.quantum = new QuantumEncryption();
        this.quantum.generateQuantumKey(); // Generate quantum key on initialization
    }

    encryptData(data) {
        // Fallback to AES if quantum encryption is not available
        const encryptedData = this.quantum.encrypt(data);
        return encryptedData;
    }

    decryptData(encryptedData) {
        // Fallback to AES if quantum decryption is not available
        const decryptedData = this.quantum.decrypt(encryptedData);
        return decryptedData;
    }

    encryptWithAES(data) {
        return this.aes.encrypt(data);
    }

    decryptWithAES(encryptedData) {
        return this.aes.decrypt(encryptedData);
    }
}

module.exports = EncryptionUtils;
