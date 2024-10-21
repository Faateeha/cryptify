import axios from "axios";

const apiKey = "CG-oneBh85v9YNngRpbw2bZaftZ"; // Replace with your API key

export const fetchCryptoData = async (page = 1) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        headers: { "x-cg-api-key": apiKey },
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 12, // Adjust per page items if needed
          page, // Use the page parameter dynamically
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
