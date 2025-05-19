import React, { useState, useEffect } from 'react'
import { getTop5Last5Games, get5HeatUpPlayers } from '../api_calls/stats'
import PlayerStatsCards from '../components/PlayerStatsCards'
import PlayerHeatingUpCards from '../components/PlayerHeatingUpCards'

const home_page = () => {
  const [top5Data, setTop5Data] = useState(null);
  const [heatUpData, setHeatUpData] = useState(null);
  const [isLoadingTop5, setIsLoadingTop5] = useState(true);
  const [isLoadingHeatUp, setIsLoadingHeatUp] = useState(true);

  useEffect(() => {
    const fetchTop5Data = async () => {
      try {
        setIsLoadingTop5(true);
        const data = await getTop5Last5Games();
        setTop5Data(data);
      } catch (error) {
        console.error("Error fetching top 5 data:", error);
      } finally {
        setIsLoadingTop5(false);
      }
    };

    const fetchHeatUpData = async () => {
      try {
        setIsLoadingHeatUp(true);
        const data = await get5HeatUpPlayers();
        setHeatUpData(data);
      } catch (error) {
        console.error("Error fetching heat up data:", error);
      } finally {
        setIsLoadingHeatUp(false);
      }
    };

    fetchTop5Data();
    fetchHeatUpData();
  }, []);

  return (
    <div className='min-h-screen bg-black text-white p-4'>
      <h1 className='text-2xl font-bold mb-4 font-michroma'>Hottest players this week 🔥 🏀</h1>
      
      {isLoadingTop5 ? (
        <p className="text-gray-400">Loading player stats...</p>
      ) : top5Data ? (
        <PlayerStatsCards players={top5Data} />
      ) : (
        <p className="text-gray-400">Unable to load player data. Please try again later.</p>
      )}

      <h2 className='text-xl font-bold mt-10 mb-4 font-michroma'>Players heating up 👀✍️</h2>
      
      {isLoadingHeatUp ? (
        <p className="text-gray-400">Loading players heating up...</p>
      ) : heatUpData ? (
        <PlayerHeatingUpCards players={heatUpData} />
      ) : (
        <p className="text-gray-400">Unable to load trending players. Please try again later.</p>
      )}
    </div>
  )
}

export default home_page