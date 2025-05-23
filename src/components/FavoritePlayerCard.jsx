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
      <p>make some api call to get the player stats then display them here</p>
    </div>
  );
};

export default FavoritePlayerCard; 