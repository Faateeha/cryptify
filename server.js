import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4000;
const apiKey = 'CG-oneBh85v9YNngRpbw2bZaftZ';

// Allow CORS requests from frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
  })
);

app.get('/crypto', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        headers: { 'x-cg-api-key': apiKey },
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


