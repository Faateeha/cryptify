import "../index.css";
import { useState, useEffect } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { fetchCryptoData } from "../data";
import BackToTopButton from "./BackToTop";
import { Link } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';  
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import logo from '../assets/cryptify-logo.png'
import Footer from './Footer'


export default function Dashboard() {
  const [value, setValue] = useState("grid");
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(10); // Store total pages
  const [darkMode, setDarkMode] = useState(false); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadCryptoData = async (page) => {
    setLoading(true);
    const data = await fetchCryptoData(page);
    setCryptoData(data);
    setLoading(false);
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Enable dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Disable dark mode
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    loadCryptoData(currentPage); // Load data when component mounts or page changes
  }, [currentPage]);

  const filteredData = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPageNumbers = () => {
    const pages = [];
    const totalPageButtons = 5; // Show only 5 page buttons at a time

    let startPage = Math.max(1, currentPage - Math.floor(totalPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + totalPageButtons - 1);

    if (endPage - startPage < totalPageButtons - 1) {
      startPage = Math.max(1, endPage - totalPageButtons + 1);
    }

    // Generate the buttons dynamically
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <>
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-1 mx-1 rounded "
          >
            1
          </button>
        )}
        {startPage > 2 && <span className="mx-1">...</span>}
        {pages}
        {endPage < totalPages - 1 && <span className="mx-1">...</span>}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-1 mx-1 rounded "
          >
            {totalPages}
          </button>
        )}
      </>
    );
  };

  return (
    <div >
  {loading ? (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <div className="dark:text-darktheme-text dark:bg-darktheme-background">
      
      <div className="py-6 px-3 flex justify-between">
      <img src={logo} alt="logo" className=" lg:hidden w-[10%] md:w-[5%]"/>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md pl-2 w-120px  md:w-1/2 lg:w-1/2 dark:bg-darktheme-background"
        />
        <button
        onClick={toggleDarkMode}
        className="p-2 bg-yellow-500 rounded-full dark:bg-yellow-700 text-black dark:text-white"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </button>
      </div>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" />
          <Tab label="List" value="list" />
        </TabList>

        <TabPanel value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((coin) => (
              <Link to={`/coin/${coin.id}`} className="" key={coin.id}>
              <div
                key={coin.id}
                className={` rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 
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
                    <strong className="text-xl ">
                      {coin.name}
                    </strong>
                    <p className="text-sm ">
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

                <p className="text-sm mb-1">
                  Total Volume:{" "}
                  <span className="font-semibold">
                    ${coin.total_volume.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm ">
                  Market Cap:{" "}
                  <span className="font-semibold">
                    ${coin.market_cap.toLocaleString()}
                  </span>
                </p>
              </div>
              </Link>
            ))}
          </div>
        </TabPanel>

        <TabPanel value="list">
          <div className="overflow-x-auto">
            <ul className="space-y-4">
              {filteredData.map((coin) => (
                <Link to={`/coin/${coin.id}`} className="" key={coin.id}>
                <li
                  key={coin.id}
                  className={` rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 
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
                      <strong className="text-xl ">
                        {coin.name}
                      </strong>
                      <p className="text-sm ">
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
                  <p className="text-sm  mb-1 hidden md:block">
                    Total Volume:{" "}
                    <span className="font-semibold">
                      ${coin.total_volume.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm  hidden lg:block">
                    Market Cap:{" "}
                    <span className="font-semibold">
                      ${coin.market_cap.toLocaleString()}
                    </span>
                  </p>
                </li>
                </Link>
              ))}
            </ul>
          </div>
        </TabPanel>
        <div className="flex justify-center m-4">{renderPageNumbers()}</div>
      </TabContext>
      <Footer />
      <BackToTopButton />
    </div>
  )}
 </div>

  );
}
