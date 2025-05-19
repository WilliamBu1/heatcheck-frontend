import React, { useState, useEffect } from 'react';

const PlayerHeatingUpCards = ({ players }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (players && players.length > 0) {
      // Reset animation state when players data changes
      setIsLoaded(false);
      
      // Delay to ensure DOM is fully ready before animations start
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [players]);

  if (!players || players.length === 0) {
    return <p className="text-gray-400">No trending players available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {players.map((player, index) => {
        // Safely get numeric values with defaults
        const lastFiveAvg = typeof player.PTS_AVG_LAST_5 === 'number' ? player.PTS_AVG_LAST_5 : 0;
        const last20Avg = typeof player.PTS_AVG_LAST_20 === 'number' ? player.PTS_AVG_LAST_20 : 0;
        const improvement = lastFiveAvg - last20Avg;
        
        // Determine color based on improvement value without changing calculation
        const improvementColor = 
          improvement > 6 ? 'text-green-500' : 
          improvement >= 4.5 ? 'text-lime-500' : 
          'text-yellow-500';
        
        return (
          <div 
            key={index} 
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
            <h2 className="text-xl font-bold text-red-500 mb-2">{player.PLAYER_NAME || 'Unknown Player'}</h2>
            
            {/* Show increase in points over last 5 games */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Last 5 Game Avg:</span>
                <span className="font-bold">{lastFiveAvg.toFixed(1)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Last 20 Game Avg:</span>
                <span className="font-bold">{last20Avg.toFixed(1)}</span>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-400">Improvement:</span>
                <span className={`text-lg font-bold ${improvementColor}`}>
                  {improvement > 0 ? '+' : ''}{improvement.toFixed(1)} 📈
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerHeatingUpCards; 