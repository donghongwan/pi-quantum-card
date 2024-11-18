// keyManagement.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration for key management
const KEY_STORAGE_PATH = path.join(__dirname, 'keys'); // Directory to store keys
const KEY_ROTATION_INTERVAL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// Ensure the key storage directory exists
if (!fs.existsSync(KEY_STORAGE_PATH)) {
    fs.mkdirSync(KEY_STORAGE_PATH);
}

/**
 * Generates a new cryptographic key.
 * @returns {string} The generated key in hexadecimal format.
 */
function generateKey() {
    return crypto.randomBytes(32).toString('hex'); // 256-bit key
}

/**
 * Saves a key to a file.
 * @param {string} keyName - The name of the key.
 * @param {string} key - The key to save.
 */
function saveKey(keyName, key) {
    const keyFilePath = path.join(KEY_STORAGE_PATH, `${keyName}.key`);
    fs.writeFileSync(keyFilePath, key);
}

/**
 * Retrieves a key from storage.
 * @param {string} keyName - The name of the key to retrieve.
 * @returns {string|null} The retrieved key or null if not found.
 */
function retrieveKey(keyName) {
    const keyFilePath = path.join(KEY_STORAGE_PATH, `${keyName}.key`);
    if (fs.existsSync(keyFilePath)) {
        return fs.readFileSync(keyFilePath, 'utf8');
    }
    return null;
}

/**
 * Rotates a key by generating a new key and saving it.
 * @param {string} keyName - The name of the key to rotate.
 * @returns {string} The new key.
 */
function rotateKey(keyName) {
    const newKey = generateKey();
    saveKey(keyName, newKey);
    return newKey;
}

/**
 * Revokes a key by deleting it from storage.
 * @param {string} keyName - The name of the key to revoke.
 */
function revokeKey(keyName) {
    const keyFilePath = path.join(KEY_STORAGE_PATH, `${keyName}.key`);
    if (fs.existsSync(keyFilePath)) {
        fs.unlinkSync(keyFilePath);
    }
}

/**
 * Automatically rotates keys at specified intervals.
 * @param {string} keyName - The name of the key to rotate.
 */
function scheduleKeyRotation(keyName) {
    setInterval(() => {
        console.log(`Rotating key: ${keyName}`);
        rotateKey(keyName);
    }, KEY_ROTATION_INTERVAL);
}

// Example usage
const keyName = 'mySecureKey';
const initialKey = generateKey();
saveKey(keyName, initialKey);
console.log(`Initial Key: ${initialKey}`);

scheduleKeyRotation(keyName);

// Export functions for external use
module.exports = {
    generateKey,
    saveKey,
    retrieveKey,
    rotateKey,
    revokeKey,
    scheduleKeyRotation,
};
