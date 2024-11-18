// api/userApi.js

import axios from 'axios';

const API_URL = 'https://api.example.com/users'; // Replace with your actual API URL

export const registerUser  = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser  = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUser Profile = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 200 range
    console.error('Error:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request was made but no response received
    console.error('Error:', error.request);
    throw new Error('No response from server');
  } else {
    // Something happened in setting up the request
    console.error('Error:', error.message);
    throw new Error('Request setup error');
  }
};
