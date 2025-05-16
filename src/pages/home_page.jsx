import React, { useState } from 'react'
import { getTop5Last5Games } from '../api_calls/stats'
import PlayerStatsCards from '../components/PlayerStatsCards'

const home_page = () => {
  const [apiData, setApiData] = useState(null);

  const fetchData = async () => {
    const data = await getTop5Last5Games();
    setApiData(data);
  };

  return (
    <div className='min-h-screen bg-black text-white p-4'>
      <h1 className='text-2xl font-bold mb-4'>Home Page</h1>
      <button 
        onClick={fetchData}
        className="mb-6 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-3 rounded text-sm transition-all duration-300 border-2 border-red-900"
      >
        Get Top 5 Last 5 Games
      </button>
      
      {apiData ? (
        <PlayerStatsCards players={apiData} />
      ) : (
        <p className="text-gray-400">Click the button to load player data</p>
      )}
    </div>
  )
}

export default home_page