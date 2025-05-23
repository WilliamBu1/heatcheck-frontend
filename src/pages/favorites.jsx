import React, { useState, useEffect } from 'react'
import FavSearch from '../components/fav_search';
import FavoritePlayerCard from '../components/FavoritePlayerCard';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../api_calls/favoritesService';

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token, user } = useAuth();

  // Fetch favorite players from API
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !token) {
        setError('Please log in to view your favorites');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const favorites = await getFavorites(token);
        
        // Map favorites to the format expected by FavoritePlayerCard
        const formattedFavorites = favorites.map(fav => ({
          PLAYER_NAME: fav.playerName,

        }));
        
        setFavoritePlayers(formattedFavorites);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, token]);

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

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-red-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-400 py-12 text-center">{error}</p>;
    }

    if (favoritePlayers.length === 0) {
      return <p className="text-gray-400 py-12 text-center">You haven't added any favorite players yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlayers.map((player, index) => (
          <FavoritePlayerCard 
            key={player.PLAYER_NAME}
            player={player}
            index={index}
            isLoaded={isLoaded}
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
      
      {isAuthenticated && (
        <FavSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      )}

      {/* Player cards */}
      <div className="mt-6">
        {filteredPlayers.length === 0 && !isLoading && !error && isAuthenticated ? (
          <p className="text-gray-400">No matching players found.</p>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  )
}

export default Favorites;