import React from 'react';

const FavoritePlayerCard = ({ player, index, isLoaded }) => {
  return (
    <div 
      className={`
        bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg 
        hover:shadow-red-900/20 transition-all duration-500 transform
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        min-h-[160px]
      `}
      style={{ 
        transitionDelay: `${80 + (index * 120)}ms`,
        transitionProperty: 'opacity, transform'
      }}
    >
      <h2 className="text-xl font-bold text-red-500 mb-2">{player.PLAYER_NAME}</h2>
      <p className="text-gray-400 mb-1">Team: {player.TEAM}</p>
      <p className="text-gray-400 mb-1">Last Updated: {new Date(player.GAME_DATE).toLocaleDateString()}</p>
      <div className="mt-2 flex items-center">
        <span className="text-2xl font-bold">{player.PTS_AVG_LAST_5} 🔥</span>
        <span className="ml-2 text-sm text-gray-400">PPG last 5 games</span>
      </div>
    </div>
  );
};

export default FavoritePlayerCard; 