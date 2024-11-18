// src/core/smartContracts/escrowContract.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowContract {
    address public buyer;
    address public seller;
    address public arbiter;
    uint256 public amount;
    bool public isCompleted;

    event EscrowCreated(address indexed buyer, address indexed seller, address indexed arbiter, uint256 amount);
    event EscrowCompleted();

    constructor(address _seller, address _arbiter) {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        isCompleted = false;
    }

    function deposit() public payable {
        require(msg.sender == buyer, "Only buyer can deposit");
        require(amount == 0, "Amount already deposited");
        amount = msg.value;
        emit EscrowCreated(buyer, seller, arbiter, amount);
    }

    function releaseFunds() public {
        require(msg.sender == arbiter, "Only arbiter can release funds");
        require(!isCompleted, "Escrow already completed");
        payable(seller).transfer(amount);
        isCompleted = true;
        emit EscrowCompleted();
    }

    function refund() public {
        require(msg.sender == arbiter, "Only arbiter can refund");
        require(!isCompleted, "Escrow already completed");
        payable(buyer).transfer(amount);
       isCompleted = true;
        emit EscrowCompleted();
    }
}
