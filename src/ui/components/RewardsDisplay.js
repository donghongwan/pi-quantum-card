// src/ui/components/RewardsDisplay.js

import React from 'react';
import './RewardsDisplay.css';

const RewardsDisplay = ({ rewards }) => {
  const progress = (rewards.current / rewards.total) * 100;

  return (
    <div className="rewards-display">
      <h3>Your Rewards</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{rewards.current} / {rewards.total} points</p>
    </div>
  );
};

export default RewardsDisplay;
