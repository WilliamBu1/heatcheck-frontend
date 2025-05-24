import React from 'react';
import PlayerStatsDisplayCard from './PlayerStatsDisplayCard';

const FavoritePlayerCard = ({ 
  player, 
  index, 
  isLoaded, 
  showFullStats,
  onViewFullStats,
  onBackToCards,
  onPlayerUnfavorited
}) => {
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

  // Handle view full stats button click
  const handleViewFullStats = () => {
    onViewFullStats(player.PLAYER_NAME);
  };

  // Handle when player is unfavorited
  const handleUnfavorited = () => {
    if (onPlayerUnfavorited) {
      onPlayerUnfavorited(player.PLAYER_NAME);
    }
  };

  // If detailed view is shown, render the PlayerStatsDisplayCard
  if (showFullStats) {
    return (
      <div className="w-full transition-all duration-500 ease-in-out">
        <div className="bg-gray-900 rounded-lg p-4 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{player.PLAYER_NAME}</h2>
            <div className="flex items-center space-x-3">
              {player.isFavorited === false && (
                <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">
                  Removed from favorites
                </span>
              )}
              <button 
                onClick={onBackToCards}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-colors"
              >
                Back to All Players
              </button>
            </div>
          </div>
          <div className="animate-slideUpFade">
            <PlayerStatsDisplayCard 
              playerData={player.fullStats} 
              playerName={player.PLAYER_NAME}
              onUnfavorited={handleUnfavorited}
              isFavorited={player.isFavorited !== false}
            />
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the compact card
  return (
    <div 
      className={`
        bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg 
        hover:shadow-red-900/20 transition-all duration-500 transform
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${player.error ? 'border-red-800/50' : ''}
        animate-fadeIn
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

        {/* See More Button */}
        <button
          onClick={handleViewFullStats}
          className="w-full mt-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors text-sm font-medium transform hover:scale-[1.02] active:scale-[0.98] duration-200"
        >
          See Full Stats
        </button>
      </div>
    </div>
  );
};

export default FavoritePlayerCard; 