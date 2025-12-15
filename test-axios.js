const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
console.log('Testing connection to:', API_URL);

axios.get(API_URL + '/settings', { timeout: 10000 })
  .then(response => {
    console.log('Success! Status:', response.status);
    console.log('Data length:', JSON.stringify(response.data).length);
  })
  .catch(error => {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  });
