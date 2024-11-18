// api/transactionApi.js

import axios from 'axios';

const API_URL = 'https://api.example.com/transactions'; // Replace with your actual API URL

export const createTransaction = async (transactionData, token) => {
  try {
    const response = await axios.post(API_URL, transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTransactionHistory = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/history/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTransaction = async (transactionId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error('Error:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('Error:', error.request);
    throw new Error('No response from server');
  } else {
    console.error('Error:', error.message);
    throw new Error('Request setup error');
  }
};
