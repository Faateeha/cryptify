import "../index.css";
import { useState, useEffect } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { fetchCryptoData } from "../data";

export default function Dashboard() {
  const [value, setValue] = useState("grid");
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData(); // Fetch the data
      setCryptoData(data); // Store the data in state
      setLoading(false); // Set loading to false
    };

    getData();
  }, []); // Fetch data only once on component mount

  if (loading) return <p>Loading...</p>; // Show loading state
  const filteredData = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
        <div className="m-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 w-full md:w-1/2 lg:w-1/2"
        />
      </div>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" />
          <Tab label="List" value="list" />
        </TabList>

        <TabPanel value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((coin) => (
              <div
                key={coin.id}
                className={`bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 
          ${
            coin.price_change_percentage_24h > 0
              ? "hover:border-green-600"
              : "hover:border-red-600"
          } 
          border-2 border-transparent hover:border-opacity-100`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-16 w-16 mr-4"
                  />
                  <div>
                    <strong className="text-xl text-gray-800">
                      {coin.name}
                    </strong>
                    <p className="text-sm text-gray-500">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center mb-3 ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <p className="mr-2 font-semibold">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  {coin.price_change_percentage_24h > 0 ? (
                    <TrendingUpIcon className="h-5 w-5" />
                  ) : (
                    <TrendingDownIcon className="h-5 w-5" />
                  )}
                </div>
                <p className="text-lg font-bold mb-2">
                  <span
                    className={`font-semibold ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${coin.current_price.toLocaleString()}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  Total Volume:{" "}
                  <span className="font-semibold">
                    ${coin.total_volume.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Market Cap:{" "}
                  <span className="font-semibold">
                    ${coin.market_cap.toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value="list">
          <div className="overflow-x-auto">
            <ul className="space-y-4">
              {filteredData.map((coin) => (
                <li
                  key={coin.id}
                  className={`bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 
            ${
              coin.price_change_percentage_24h > 0
                ? "hover:border-green-600"
                : "hover:border-red-600"
            } 
            border-2 border-transparent hover:border-opacity-100 flex flex-row items-center justify-between`}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-16 w-16 mr-4"
                    />
                    <div>
                      <strong className="text-xl text-gray-800">
                        {coin.name}
                      </strong>
                      <p className="text-sm text-gray-500">
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center mb-2 md:mb-0 ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <p className="mr-2 font-semibold">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                    {coin.price_change_percentage_24h > 0 ? (
                      <TrendingUpIcon className="h-5 w-5" />
                    ) : (
                      <TrendingDownIcon className="h-5 w-5" />
                    )}
                  </div>
                  <p className="text-lg font-bold mb-2">
                    <span
                      className={`font-semibold ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${coin.current_price.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1 hidden md:block">
                    Total Volume:{" "}
                    <span className="font-semibold">
                      ${coin.total_volume.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 hidden lg:block">
                    Market Cap:{" "}
                    <span className="font-semibold">
                      ${coin.market_cap.toLocaleString()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
