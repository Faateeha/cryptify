import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices.js";
import LineChart from "./LineChart";
import { convertDate } from "../functions/convertDate.js";
import SelectDays from "../functions/selectDays.jsx";
import { settingChartData } from "../functions/settingChartData.jsx";

export default function DetailsPage() {
  const { id } = useParams(); // Get the coin ID from URL
  const [coinData, setCoinData] = useState(null); // State to store the coin data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [isExpanded, setIsExpanded] = useState(false); // State to manage description toggle
  const [days, setDays] = useState("30");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    try {
      const data = await getCoinData(id);
      if (data) {
        setCoinData(data); // Correct usage to set the state
        const prices = await getCoinPrices(id, days);
        if (prices.length > 0) {
          setChartData({
            labels: prices.map((price) => convertDate(price[0])),
            datasets: [
              {
                data: prices.map((price) => price[1]),
                borderColor: "#3a88e9",
                borderWidth: 1,
                fill: true,
                tension: 0.25,
                backgroundColor: "rgba(58, 136, 233, 0.1)",
                pointRadius: 0,
              },
            ],
          });
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const handleDaysChange = async (event) => {
    const selectedDays = event.target.value;
    setLoading(true);

    const prices = await getCoinPrices(id, selectedDays);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }

    setDays(selectedDays);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    ); // Show loading state
  if (error) return <div>Error fetching coin data: {error.message}</div>; // Show error message

  // Short and long description
  const shortDescription = coinData?.description?.en.substring(0, 200);
  const longDescription = coinData?.description?.en;

  // Function to toggle description
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-md">
      {/* Title and Image */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
        <img
          src={coinData.image.large}
          alt={coinData.name}
          className="w-24 h-24 object-contain mb-4 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {coinData.name}
          </h1>
          <p className="text-sm uppercase tracking-wider text-yellow-500">
            Symbol: {coinData.symbol.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">Current Price</p>
          <p className="text-xl md:text-2xl text-green-500">
            ${coinData.market_data.current_price.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">Market Cap</p>
          <p className="text-xl md:text-2xl">
            ${coinData.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">24h Change</p>
          <p
            className={`text-xl md:text-2xl ${
              coinData.market_data.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">Total Volume</p>
          <p className="text-xl md:text-2xl">
            ${coinData.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SelectDays days={days} handleDaysChange={handleDaysChange} />
        <LineChart chartData={chartData} />
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isExpanded ? (
            <>
              <span dangerouslySetInnerHTML={{ __html: longDescription }} />
              <button
                onClick={toggleDescription}
                className="text-yellow-500 hover:underline mt-2"
              >
                Read Less
              </button>
            </>
          ) : (
            <>
              <span>{shortDescription}...</span>
              <button
                onClick={toggleDescription}
                className="text-yellow-500 hover:underline mt-2"
              >
                Read More
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
