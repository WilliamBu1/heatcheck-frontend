import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { checkFavoriteStatus, toggleFavorite } from '../api_calls/favoritesService';

// Reusable component for each individual stat block
const StatBlockItem = ({ label, value, unit = '' }) => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center justify-center text-center min-h-[140px]">
      <span className="text-sm sm:text-base text-gray-400 mb-1">{label}</span>
      <span className="text-2xl sm:text-3xl font-bold text-red-500">
        {value}{unit}
      </span>
    </div>
  );
};

const PlayerStatsDisplayCard = ({ playerData, playerName }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();
  
  useEffect(() => {
    // Check if player is favorited when the component mounts or playerName changes
    const checkIfFavorite = async () => {
      // Only check favorite status if user is logged in and playerName exists
      if (isAuthenticated && token && playerName) {
        setIsLoading(true);
        try {
          const favoriteStatus = await checkFavoriteStatus(playerName, token);
          setIsFavorite(favoriteStatus);
        } catch (error) {
          console.error("Error checking favorite status:", error);
          // Silently fail - don't show error to user
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    checkIfFavorite();
  }, [playerName, isAuthenticated, token]);
  
  if (!playerData) {
    return null;
  }

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // Optionally show a message that user needs to login
      alert("Please login to save favorites");
      return;
    }
    
    setIsLoading(true);
    try {
      // Toggle favorite status through API
      const newStatus = await toggleFavorite(playerName, isFavorite, token);
      setIsFavorite(newStatus);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const stats = playerData.stats || playerData;

  const labelMappings = {
    'GAME_DATE': 'Most Recent Game',
    'FG_PCT': 'Field Goal %',
    'IS_HOME': 'Home Game?',
    'PTS': 'Points Scored',
    'AVG_MIN_LAST_5_USER': 'Avg Minutes (Last 5)',
    'PTS_AVG_LAST_5_USER': 'PPG (Last 5)',
    'PTS_AVG_LAST_10_USER': 'PPG (Last 10)',
    'PTS_AVG_LAST_20_USER': 'PPG (Last 20)',
    'DAYS_REST': 'Days of Rest',
    'GAME_NUMBER_IN_SEASON': 'Game No.',
    'MIN': 'Minutes Played',
    'PLUS_MINUS': '+/-',
    // Add other specific mappings if needed
  };

  const formattedStats = Object.entries(stats).map(([key, rawValue]) => {
    let displayValue = rawValue;
    let unit = '';

    if (key === 'GAME_DATE') {
      displayValue = new Date(rawValue).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } else if (key === 'FG_PCT') {
      displayValue = typeof rawValue === 'number' ? (rawValue * 100).toFixed(1) : 'N/A';
      unit = '%';
    } else if (key === 'IS_HOME') {
      displayValue = rawValue === 1 ? 'Yes' : (rawValue === 0 ? 'No' : 'N/A');
    } else if (key.includes('AVG') || key === 'PTS' || key === 'MIN') {
      displayValue = typeof rawValue === 'number' ? rawValue.toFixed(1) : 'N/A';
    } else if (key === 'PLUS_MINUS') {
      displayValue = typeof rawValue === 'number' ? (rawValue > 0 ? `+${rawValue}` : rawValue) : 'N/A';
    } else if (key === 'DAYS_REST' || key === 'GAME_NUMBER_IN_SEASON') {
      displayValue = rawValue !== undefined && rawValue !== null ? rawValue.toString() : 'N/A';
    } else {
      displayValue = rawValue !== undefined && rawValue !== null ? rawValue.toString() : 'N/A';
    }
    return { key, value: displayValue, unit };
  });
  
  const keyOrder = [
    'GAME_DATE', 'IS_HOME', 'DAYS_REST', 'GAME_NUMBER_IN_SEASON', 
    'MIN', 'PTS', 'FG_PCT', 'PLUS_MINUS', 
    'AVG_MIN_LAST_5_USER', 'PTS_AVG_LAST_5_USER', 
    'PTS_AVG_LAST_10_USER', 'PTS_AVG_LAST_20_USER'
  ];

  const sortedFormattedStats = formattedStats.sort((a, b) => {
    const indexA = keyOrder.indexOf(a.key);
    const indexB = keyOrder.indexOf(b.key);
    if (indexA === -1 && indexB === -1) return a.key.localeCompare(b.key);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Try to get a player name for the title
  const playerNameForTitle = playerName;

  // Define stat groups
  const generalStatsKeys = [
    'GAME_DATE', 'IS_HOME', 'DAYS_REST', 'GAME_NUMBER_IN_SEASON', 
    'MIN', 'PTS', 'FG_PCT', 'PLUS_MINUS'
  ];

  const averageStatsKeys = [
    'AVG_MIN_LAST_5_USER', 'PTS_AVG_LAST_5_USER', 
    'PTS_AVG_LAST_10_USER', 'PTS_AVG_LAST_20_USER'
  ];

  const generalStats = sortedFormattedStats.filter(stat => generalStatsKeys.includes(stat.key));
  const averageStats = sortedFormattedStats.filter(stat => averageStatsKeys.includes(stat.key));
  const otherStats = sortedFormattedStats.filter(stat => !generalStatsKeys.includes(stat.key) && !averageStatsKeys.includes(stat.key));

  // Find specific stats for special layout
  const gameDate = generalStats.find(stat => stat.key === 'GAME_DATE');
  const isHome = generalStats.find(stat => stat.key === 'IS_HOME');
  const points = generalStats.find(stat => stat.key === 'PTS');
  const minutes = generalStats.find(stat => stat.key === 'MIN');
  const fieldGoalPct = generalStats.find(stat => stat.key === 'FG_PCT');
  const plusMinus = generalStats.find(stat => stat.key === 'PLUS_MINUS');
  const daysRest = generalStats.find(stat => stat.key === 'DAYS_REST');
  const gameNumber = generalStats.find(stat => stat.key === 'GAME_NUMBER_IN_SEASON');
  
  // For other stats that aren't specifically laid out
  const otherGeneralStats = generalStats.filter(stat => 
    !['GAME_DATE', 'IS_HOME', 'PTS', 'MIN', 'FG_PCT', 'PLUS_MINUS', 'DAYS_REST', 'GAME_NUMBER_IN_SEASON'].includes(stat.key)
  );

  const StatRowItem = ({ label, value, unit }) => (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md shadow">
      <span className="text-sm text-gray-300">{label}</span>
      <span className="text-lg font-semibold text-red-400">{value}{unit}</span>
    </div>
  );

  // Compact stat display for the general stats
  const CompactStatItem = ({ label, value, unit = '', highlight = false }) => (
    <div className={`bg-gray-800 px-3 py-2 rounded shadow flex flex-col justify-center ${highlight ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-b-2 border-red-500' : ''}`}>
      <div className="text-xs text-gray-400">{label}</div>
      <div className={`${highlight ? 'text-xl font-bold text-white' : 'text-base font-medium text-white'}`}>
        {value}{unit}
      </div>
    </div>
  );

  return (
    <div className="mt-8 bg-gray-900 shadow-2xl rounded-lg overflow-hidden w-full max-w-5xl mx-auto font-michroma">
      <div className="px-6 py-5 bg-gray-800 border-b border-gray-700 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center flex-grow">
            {playerNameForTitle} Performance Stats
          </h2>
          <button 
            onClick={handleFavoriteClick} 
            className={`ml-2 p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-t-2 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
            ) : isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white hover:text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:space-x-6 xl:space-x-8">
        {/* General Game Stats Section (2/3 width on LG) */}
        <div className="lg:w-2/3 space-y-5 mb-6 lg:mb-0">
          <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">Game Performance</h3>
          
          {/* Game Date & Home/Away Banner */}
          {gameDate && (
            <div className="bg-gray-800 rounded-lg shadow p-3 text-center">
              <div className="text-sm text-gray-400">Most Recent Game</div>
              <div className="text-xl font-bold text-white mt-1 mb-1">
                {gameDate.value}
              </div>
              {isHome && (
                <div className="text-sm font-medium text-gray-300">
                  {isHome.value === 'Yes' ? 'Home Game' : 'Away Game'}
                </div>
              )}
            </div>
          )}
          
          {/* Key Stats Grid - 2 rows of 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {points && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg shadow-md text-center col-span-1 border-b-2 border-red-400">
                <div className="text-sm text-gray-400">Points</div>
                <div className="text-3xl font-bold text-white">{points.value}</div>
              </div>
            )}
            
            {minutes && (
              <div className="bg-gray-800 p-3 rounded-lg shadow text-center col-span-1">
                <div className="text-sm text-gray-400">Minutes</div>
                <div className="text-2xl font-bold text-white">{minutes.value}</div>
              </div>
            )}
            
            {plusMinus && (
              <div className="bg-gray-800 p-3 rounded-lg shadow text-center col-span-1">
                <div className="text-sm text-gray-400">+/-</div>
                <div className={`text-2xl font-bold ${parseFloat(plusMinus.value) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {plusMinus.value}
                </div>
              </div>
            )}
          </div>
          
          {/* Secondary Stats Grid - more compact */}
          <div className="grid grid-cols-4 gap-2">
            {fieldGoalPct && (
              <CompactStatItem 
                label="FG%" 
                value={fieldGoalPct.value} 
                unit={fieldGoalPct.unit} 
                highlight={true} 
              />
            )}
            
            {daysRest && (
              <CompactStatItem 
                label="Days Rest" 
                value={daysRest.value} 
                unit={daysRest.unit} 
              />
            )}
            
            {gameNumber && (
              <CompactStatItem 
                label="Game No." 
                value={gameNumber.value} 
                unit={gameNumber.unit} 
              />
            )}
            
            {otherGeneralStats.map(({ key, value, unit }) => {
              const displayLabel = labelMappings[key] || 
                                   key.replace(/_/g, ' ').replace(/\bUSER\b/g, '').trim()
                                     .split(' ')
                                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                     .join(' ');
              return (
                <CompactStatItem key={key} label={displayLabel} value={value} unit={unit} />
              );
            })}
          </div>
        </div>

        {/* Averages and Other Stats Section (1/3 width on LG) */}
        <div className="lg:w-1/3 space-y-6">
          {averageStats.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">Player Averages</h3>
              <div className="space-y-4">
                {averageStats.map(({ key, value, unit }) => {
                  const displayLabel = labelMappings[key] || 
                                       key.replace(/_/g, ' ').replace(/\bUSER\b/g, '').trim()
                                         .split(' ')
                                         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                         .join(' ');
                  return (
                    <StatRowItem key={key} label={displayLabel} value={value} unit={unit} />
                  );
                })}
              </div>
            </div>
          )}

          {otherStats.length > 0 && (
            <div className={averageStats.length > 0 ? "pt-6 border-t border-gray-700" : ""}>
              <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">Additional Stats</h3>
              <div className="space-y-4">
                {otherStats.map(({ key, value, unit }) => {
                  const displayLabel = labelMappings[key] || 
                                       key.replace(/_/g, ' ').replace(/\bUSER\b/g, '').trim()
                                         .split(' ')
                                         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                         .join(' ');
                  return (
                    <StatRowItem key={key} label={displayLabel} value={value} unit={unit} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsDisplayCard; 