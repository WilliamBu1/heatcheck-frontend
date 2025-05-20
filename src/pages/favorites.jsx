import React, { useState, useEffect } from 'react'
import FavSearch from '../components/fav_search';
import FavoritePlayerCard from '../components/FavoritePlayerCard';

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Hardcoded favorite players data
  const favoritePlayers = [
    {
      PLAYER_NAME: "LeBron James",
      GAME_DATE: "2023-05-10",
      PTS_AVG_LAST_5: 28.4,
      TEAM: "LAL"
    },
    {
      PLAYER_NAME: "Stephen Curry",
      GAME_DATE: "2023-05-09",
      PTS_AVG_LAST_5: 31.2,
      TEAM: "GSW"
    },
    {
      PLAYER_NAME: "Giannis Antetokounmpo",
      GAME_DATE: "2023-05-11",
      PTS_AVG_LAST_5: 32.5,
      TEAM: "MIL"
    },
    {
      PLAYER_NAME: "Luka Dončić",
      GAME_DATE: "2023-05-08",
      PTS_AVG_LAST_5: 33.6,
      TEAM: "DAL"
    },
    {
      PLAYER_NAME: "Ja Morant",
      GAME_DATE: "2023-05-10",
      PTS_AVG_LAST_5: 26.8,
      TEAM: "MEM"
    }
  ];

  // Filter players based on search term
  const filteredPlayers = favoritePlayers.filter(player =>
    player.PLAYER_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Reset animation state
    setIsLoaded(false);
    
    // Delay to ensure DOM is ready before animations start
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [searchTerm]); // Re-trigger animation when search changes

  return (
    <div className="min-h-screen bg-black text-white p-4 font-michroma">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Players</h1>
      
      {/* Search Bar Component */}
      <FavSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        placeholder="Search players..."
      />

      {/* Player cards */}
      <div className="mt-6">
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPlayers.map((player, index) => (
              <FavoritePlayerCard 
                key={index}
                player={player}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No matching players found.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites;