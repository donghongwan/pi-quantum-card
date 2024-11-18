// scripts/generateKeys.js

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("secp256k1", {
        modulusLength: 256,
    });

    return {
        publicKey: publicKey.export({ type: "spki", format: "pem" }),
        privateKey: privateKey.export({ type: "pkcs8", format: "pem" }),
    };
}

function saveKeysToFile(keys) {
    const keysDir = path.join(__dirname, "../keys");
    if (!fs.existsSync(keysDir)) {
        fs.mkdirSync(keysDir);
    }

    fs.writeFileSync(path.join(keysDir, "privateKey.pem"), keys.privateKey);
    fs.writeFileSync(path.join(keysDir, "publicKey.pem"), keys.publicKey);
    console.log("Keys generated and saved to /keys directory.");
}

function main() {
    const keys = generateKeyPair();
    saveKeysToFile(keys);
}

main();
