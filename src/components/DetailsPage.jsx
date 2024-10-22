import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {getCoinData}  from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';

export default function DetailsPage() {
    const { id } = useParams();  // Get the coin ID from URL
    const [coinData, setCoinData] = useState(null);  // State to store the coin data
    const [loading, setLoading] = useState(true);  // State to manage loading state
    const [error, setError] = useState(null);  // State to manage error
    const [isExpanded, setIsExpanded] = useState(false);  // State to manage description toggle
    const [days, setdays] = useState(30);

    useEffect(() => {
       if (id) {
        getData()
       }
    }, [id]);


    async function getData() {
        try {
            const data = await getCoinData(id);
            if (data) {
                setCoinData(data); // Correct usage to set the state
                const prices = await getCoinPrices(id, days);
                if (prices.length > 0) {
                    console.log("Prices data fetched");
                }
            }
            setLoading(false); 
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }
    

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    );  // Show loading state
    if (error) return <div>Error fetching coin data: {error.message}</div>;  // Show error message

    // Short and long description
    const shortDescription = coinData?.description?.en.substring(0, 200);
    const longDescription = coinData?.description?.en;

    // Function to toggle description
    const toggleDescription = () => {
        setIsExpanded((prev) => !prev);
    };

    // Render the coin details
    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold">{coinData.name}</h1>
            <img src={coinData.image.large} alt={coinData.name} className="my-4" />
            <p className="text-lg">Symbol: {coinData.symbol.toUpperCase()}</p>
            <p className="text-lg">Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}</p>
            <p className="text-lg">Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}</p>
            <p className="text-lg">24h Change: {coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
            <p className="text-lg">Total Volume: ${coinData.market_data.total_volume.usd.toLocaleString()}</p>
            <p className="text-lg">
                Description: 
                {isExpanded ? (
                    <>
                        <span dangerouslySetInnerHTML={{ __html: longDescription }} />
                        <button onClick={toggleDescription} className="text-yellow-500"> Read Less</button>
                    </>
                ) : (
                    <>
                        <span>{shortDescription}...</span>
                        <button onClick={toggleDescription} className="text-yellow-500 "> Read More</button>
                    </>
                )}
            </p>
        </div>
    );
}

