import React, { useState, useEffect, useCallback, useRef } from 'react'
import FavSearch from '../components/fav_search';
import FavoritePlayerCard from '../components/FavoritePlayerCard';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../api_calls/favoritesService';
import { getPlayerStats } from '../api_calls/stats';

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Track which player is expanded
  const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state
  const playerCache = useRef({}); // Cache for player data to persist after unfavoriting
  const { isAuthenticated, token, user } = useAuth();

  // Function to fetch favorites data - made reusable with useCallback
  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setError('Please log in to view your favorites');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const favorites = await getFavorites(token);
      
      if (!favorites || favorites.length === 0) {
        setFavoritePlayers([]);
        setIsLoading(false);
        return;
      }

      // Create an array to track all fetch promises
      const playerDataPromises = favorites.map(async (fav) => {
        try {
          // Get stats for each player
          const playerStats = await getPlayerStats(fav.playerName);
          
          console.log(`Stats for ${fav.playerName}:`, playerStats);
          
          // Create player object
          const playerObj = {
            PLAYER_NAME: fav.playerName,
            GAME_DATE: playerStats?.GAME_DATE || 'N/A',
            PTS: playerStats?.PTS || 'N/A', 
            PTS_AVG_LAST_5_USER: playerStats?.PTS_AVG_LAST_5_USER || 'N/A',
            MIN: playerStats?.MIN || 'N/A',
            addedAt: fav.addedAt,
            fullStats: playerStats || {},
            isFavorited: true
          };
          
          // Update cache
          playerCache.current[fav.playerName] = playerObj;
          
          return playerObj;
        } catch (err) {
          console.error(`Error fetching stats for ${fav.playerName}:`, err);
          // Return a partial player object if stats fetch fails
          return {
            PLAYER_NAME: fav.playerName,
            GAME_DATE: 'Error loading',
            PTS: 'N/A',
            PTS_AVG_LAST_5_USER: 'N/A',
            MIN: 'N/A',
            addedAt: fav.addedAt,
            error: true,
            isFavorited: true
          };
        }
      });

      // Wait for all player stats to be fetched
      const playerDataResults = await Promise.all(playerDataPromises);
      console.log("All player data results:", playerDataResults);
      setFavoritePlayers(playerDataResults);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load favorites. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  // Handle when a player is unfavorited
  const handlePlayerUnfavorited = useCallback((playerName) => {
    console.log(`Player unfavorited: ${playerName}`);
    
    // Update the cache to mark as unfavorited but keep the data
    if (playerCache.current[playerName]) {
      playerCache.current[playerName].isFavorited = false;
    }
    
    // Refresh the favorites list without changing the view
    fetchFavorites();
  }, [fetchFavorites]);

  // Handle selecting a player to view full stats
  const handleViewFullStats = useCallback((playerName) => {
    // Start transition
    setIsTransitioning(true);
    
    // Slight delay before changing view to allow for fade out
    setTimeout(() => {
      setSelectedPlayer(playerName);
      
      // Wait for new content to render, then fade it in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, []);

  // Handle going back to all cards view
  const handleBackToCards = useCallback(() => {
    // Start transition
    setIsTransitioning(true);
    
    // Refresh favorites list
    fetchFavorites();
    
    // Slight delay before changing view to allow for fade out
    setTimeout(() => {
      setSelectedPlayer(null);
      
      // Wait for new content to render, then fade it in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [fetchFavorites]);

  // Fetch favorite players from API when component mounts
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Filter players based on search term
  const filteredPlayers = favoritePlayers.filter(player =>
    player.PLAYER_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation effect when search changes
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Display different content based on authentication status and loading state
  const renderContent = () => {
    if (!isAuthenticated) {
      return <p className="text-gray-400 py-12 text-center">Please log in to view and manage your favorite players.</p>;
    }

    if (isLoading && !selectedPlayer) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-red-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (error && !selectedPlayer) {
      return <p className="text-red-400 py-12 text-center">{error}</p>;
    }

    // Apply transition classes based on transitioning state
    const contentClasses = `transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`;

    // If a player is selected to view full stats, show that player (from cache or favorites)
    if (selectedPlayer) {
      // First try to find the player in the favorites list
      let player = favoritePlayers.find(p => p.PLAYER_NAME === selectedPlayer);
      
      // If not found in favorites, check the cache
      if (!player && playerCache.current[selectedPlayer]) {
        player = playerCache.current[selectedPlayer];
      }
      
      if (player) {
        return (
          <div className={contentClasses}>
            <FavoritePlayerCard 
              key={player.PLAYER_NAME}
              player={player}
              index={0}
              isLoaded={true}
              showFullStats={true}
              onViewFullStats={handleViewFullStats}
              onBackToCards={handleBackToCards}
              onPlayerUnfavorited={handlePlayerUnfavorited}
            />
          </div>
        );
      }
      
      // Only show this if we can't find the player in cache or favorites
      return <div className="text-gray-400 py-12 text-center">Player data not found.</div>;
    }

    // If no favorites and not viewing a player
    if (favoritePlayers.length === 0 && !selectedPlayer) {
      return <p className="text-gray-400 py-12 text-center">You haven't added any favorite players yet.</p>;
    }

    // Otherwise show all player cards
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${contentClasses}`}>
        {filteredPlayers.map((player, index) => (
          <FavoritePlayerCard 
            key={player.PLAYER_NAME}
            player={player}
            index={index}
            isLoaded={isLoaded}
            showFullStats={false}
            onViewFullStats={handleViewFullStats}
            onBackToCards={handleBackToCards}
            onPlayerUnfavorited={handlePlayerUnfavorited}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-michroma">
      <h1 className="text-2xl font-bold mb-6">
        {isAuthenticated ? `${user?.username}'s Favorite Players` : 'Favorite Players'}
      </h1>
      
      {/* Only show search bar when not viewing full stats */}
      <div className={`transition-opacity duration-300 ${!selectedPlayer ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {isAuthenticated && (
          <FavSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        )}
      </div>

      {/* Player cards */}
      <div className="mt-6">
        {filteredPlayers.length === 0 && !isLoading && !error && isAuthenticated && !selectedPlayer ? (
          <p className="text-gray-400">No matching players found.</p>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  )
}

export default Favorites;