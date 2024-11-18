// src/qr/smartContracts/transactionContract.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }

    Transaction[] public transactions;

    event TransactionCreated(address indexed sender, address indexed receiver, uint256 amount, uint256 timestamp);

    function createTransaction(address receiver, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        transactions.push(Transaction(msg.sender, receiver, amount, block.timestamp));
        emit TransactionCreated(msg.sender, receiver, amount, block.timestamp);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 index) public view returns (address, address, uint256, uint256) {
        require(index < transactions.length, "Transaction does not exist");
        Transaction memory txn = transactions[index];
        return (txn.sender, txn.receiver, txn.amount, txn.timestamp);
    }
}
