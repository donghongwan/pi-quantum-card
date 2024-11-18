// src/ui/components/TransactionHistory.js

import React, { useState } from 'react';
import './TransactionHistory.css';

const TransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="transaction-history">
      <input
        type="text"
        placeholder="Filter transactions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <ul className="transaction-list">
        {filteredTransactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
