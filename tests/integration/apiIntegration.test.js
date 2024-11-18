// tests/integration/apiIntegration.test.js

import axios from 'axios';
import configfrom '../../src/utils/config'; // Adjust the import path as necessary

describe('API Integration Tests', () => {
  const apiUrl = `${config.apiBaseUrl}/endpoint`; // Replace with your actual API endpoint

  test('should fetch data from API', async () => {
    const response = await axios.get(apiUrl);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined(); // Ensure data is returned
  });

  test('should handle 404 error', async () => {
    try {
      await axios.get(`${apiUrl}/nonexistent`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test('should post data to API', async () => {
    const postData = { key: 'value' };
    const response = await axios.post(apiUrl, postData);
    expect(response.status).toBe(201); // Assuming successful creation returns 201
    expect(response.data).toMatchObject(postData); // Ensure posted data is returned
  });
});
