import React, { useState, useEffect } from 'react';

const PlayerStatsCards = ({ players }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (players && players.length > 0) {
      // Reset animation state when players data changes
      setIsLoaded(false);
      
      // Increased delay to ensure DOM is fully ready before animations start
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [players]);

  if (!players || players.length === 0) {
    return <p className="text-gray-400">No player data available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {players.map((player, index) => (
        <div 
          key={index} 
          className={`
            bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg 
            hover:shadow-red-900/20 transition-all duration-500 transform
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            min-h-[160px]
          `}
          style={{ 
            transitionDelay: `${80 + (index * 120)}ms`, // Add base 80ms delay to all cards
            transitionProperty: 'opacity, transform'
          }}
        >
          <h2 className="text-xl font-bold text-red-500 mb-2">{player.PLAYER_NAME}</h2>
        
          <p className="text-gray-400 mb-1">
            Date: {
              (() => {
                const [year, month, day] = player.GAME_DATE.split('-');
                return new Date(Number(year), Number(month) - 1, Number(day))
                  .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
              })()
            }
          </p>
          
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold">{player.PTS_AVG_LAST_5} 🔥</span>
            <span className="ml-2 text-sm text-gray-400">PPG last 5 games</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsCards; 
