import axios from 'axios';

const apiKey = 'CG-oneBh85v9YNngRpbw2bZaftZ'; // Replace with your actual API key

export const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        headers: {
          'x-cg-api-key': apiKey,
        },
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      });
      console.log(response.data);
      return response.data; // Returns the fetched data
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return []; // Return an empty array on error
    }
  };