// api/rewardsApi.js

import axios from 'axios';

const API_URL = 'https://api.example.com/rewards'; // Replace with your actual API URL

export const getRewards = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateRewards = async (userId, rewardsData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, rewardsData, {
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
  } else if(error.request) {
    console.error('Error:', error.request);
    throw new Error('No response from server');
  } else {
    console.error('Error:', error.message);
    throw new Error('Request setup error');
  }
};
