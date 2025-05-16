import React from 'react';

const PlayerStatsCards = ({ players }) => {
  if (!players || players.length === 0) {
    return <p className="text-gray-400">No player data available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {players.map((player, index) => (
        <div 
          key={index} 
          className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-red-900/20 transition-all"
        >
          <h2 className="text-xl font-bold text-red-500 mb-2">{player.PLAYER_NAME}</h2>
          <p className="text-gray-400 mb-1">Date: {new Date(player.GAME_DATE).toLocaleDateString()}</p>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold">{player.PTS_AVG_LAST_5}</span>
            <span className="ml-2 text-sm text-gray-400">PPG last 5</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsCards; 