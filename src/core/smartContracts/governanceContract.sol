// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceContract is Ownable {
    IERC20 public governanceToken;

    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endTime;
        bool executed;
        mapping(address => bool) voted;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint256 indexed proposalId, string description, uint256 endTime);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(IERC20 _governanceToken) {
        governanceToken = _governanceToken;
    }

    function createProposal(string memory description, uint256 duration) external onlyOwner {
        uint256 endTime = block.timestamp + duration;
        Proposal storage newProposal = proposals.push();
        newProposal.description = description;
        newProposal.endTime = endTime;

        emit ProposalCreated(proposals.length - 1, description, endTime);
    }

    function vote(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.endTime, "Voting has ended");
        require(!proposal.voted[msg.sender], "Already voted");

        uint256 voterBalance = governanceToken.balanceOf(msg.sender);
        require(voterBalance > 0, "No voting power");

        proposal.voted[msg.sender] = true;
        proposal.voteCount += voterBalance;

        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "Voting is still ongoing");
        require(!proposal.executed, "Proposal already executed");

        // Logic to execute the proposal goes here
        // For example, changing a contract state or transferring tokens

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }

    function getProposalDetails(uint256 proposalId) external view returns (string memory description, uint256 voteCount, uint256 endTime, bool executed) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount, proposal.endTime, proposal.executed);
    }
}
