import React from 'react';

const FavoritePlayerCard = ({ player, index, isLoaded }) => {
  // Format the game date
  const formatDate = (dateString) => {
    if (dateString === 'N/A' || dateString === 'Error loading') return dateString;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Format number stats (with decimal points)
  const formatStat = (value) => {
    if (value === 'N/A' || typeof value !== 'number') return value;
    return value.toFixed(1);
  };

  return (
    <div 
      className={`
        bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg 
        hover:shadow-red-900/20 transition-all duration-500 transform
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${player.error ? 'border-red-800/50' : ''}
      `}
      style={{ 
        transitionDelay: `${80 + (index * 120)}ms`,
        transitionProperty: 'opacity, transform'
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-white">{player.PLAYER_NAME}</h2>
        {player.error && (
          <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">Error</span>
        )}
      </div>

      <div className="space-y-3">
        {/* Recent Game */}
        <div className="bg-gray-800 rounded p-3">
          <div className="text-xs text-gray-400 mb-1">Recent Game</div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white">{formatDate(player.GAME_DATE)}</span>
            <div className="flex space-x-3">
              <div className="text-center">
                <span className="text-xs text-gray-400 block">PTS</span>
                <span className="text-sm font-semibold text-red-400">{formatStat(player.PTS)}</span>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-400 block">MIN</span>
                <span className="text-sm font-semibold text-white">{formatStat(player.MIN)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Last 5 Games Average */}
        <div className="bg-gray-800 rounded p-3">
          <div className="text-xs text-gray-400 mb-1">Last 5 Games Avg</div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Points</span>
            <span className="text-lg font-bold text-red-400">{formatStat(player.PTS_AVG_LAST_5_USER)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlayerCard; 