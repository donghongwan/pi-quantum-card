// scripts/deploySmartContracts.js

const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    // Get the contract to deploy
    const TransactionContract = await ethers.getContractFactory("TransactionContract");
    const EscrowContract = await ethers.getContractFactory("EscrowContract");

    console.log("Deploying TransactionContract...");
    const transactionContract = await upgrades.deployProxy(TransactionContract, { initializer: 'initialize' });
    await transactionContract.deployed();
    console.log(`TransactionContract deployed to: ${transactionContract.address}`);

    console.log("Deploying EscrowContract...");
    const escrowContract = await upgrades.deployProxy(EscrowContract, { initializer: 'initialize' });
    await escrowContract.deployed();
    console.log(`EscrowContract deployed to: ${escrowContract.address}`);

    // Verify contracts on Etherscan (optional)
    if (process.env.ETHERSCAN_API_KEY) {
        await verifyContract(transactionContract.address);
        await verifyContract(escrowContract.address);
    }
}

async function verifyContract(contractAddress) {
    console.log(`Verifying contract at ${contractAddress}...`);
    await run("verify:verify", {
        address: contractAddress,
    });
    console.log(`Contract verified: ${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
