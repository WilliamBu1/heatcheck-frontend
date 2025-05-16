import React, { useState, useEffect } from 'react'
import { getTop5Last5Games } from '../api_calls/stats'
import PlayerStatsCards from '../components/PlayerStatsCards'

const home_page = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getTop5Last5Games();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-black text-white p-4'>
      <h1 className='text-2xl font-bold mb-4'>Home Page</h1>
      
      {isLoading ? (
        <p className="text-gray-400">Loading player stats...</p>
      ) : apiData ? (
        <PlayerStatsCards players={apiData} />
      ) : (
        <p className="text-gray-400">Unable to load player data. Please try again later.</p>
      )}
    </div>
  )
}

export default home_page