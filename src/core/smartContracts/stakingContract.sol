// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    IERC20 public stakingToken;
    uint256 public rewardRate; // Reward rate per second
    uint256 public totalStaked;
    
    struct Stake {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastStakedTime;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        
        Stake storage userStake = stakes[msg.sender];
        updateReward(msg.sender);

        stakingToken.transferFrom(msg.sender, address(this), amount);
        userStake.amount += amount;
        userStake.lastStakedTime = block.timestamp;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");

        updateReward(msg.sender);
        
        userStake.amount -= amount;
        totalStaked -= amount;
        stakingToken.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimReward() external {
        updateReward(msg.sender);
        Stake storage userStake = stakes[msg.sender];
        uint256 reward = userStake.rewardDebt;

        require(reward > 0, "No reward available");
        userStake.rewardDebt = 0;

        stakingToken.transfer(msg.sender, reward);
        emit RewardPaid(msg.sender, reward);
    }

    function updateReward(address user) internal {
        Stake storage userStake = stakes[user];
        uint256 reward = (block.timestamp - userStake.lastStakedTime) * rewardRate * userStake.amount / totalStaked;
        userStake.rewardDebt += reward;
        userStake.lastStakedTime = block.timestamp;
    }

    function setRewardRate(uint256 newRate) external onlyOwner {
        rewardRate = newRate;
    }
}
