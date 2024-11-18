// src/utils/errorHandler.js

import logger from './logger';

const errorHandler = (error) => {
  if (error.response) {
    // Server responded with a status other than 200 range
    logger.error(`API Error: ${error.response.data.message || 'An error occurred'}`);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request was made but no response received
    logger.error('No response from server');
    throw new Error('No response from server');
  } else {
    // Something happened in setting up the request
    logger.error(`Error: ${error.message}`);
    throw new Error('Request setup error');
  }
};

export default errorHandler;
