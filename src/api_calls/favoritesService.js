// Base API URL - should match your backend
const API_BASE_URL = 'https://heatcheck-backend.onrender.com'; 
const local_API_BASE_URL = 'http://localhost:5001';

/**
 * Get all favorites for the current user
 * @param {string} token - JWT token
 * @returns {Promise<Array>} - List of favorite players
 */
export const getFavorites = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to fetch favorites');
    }

    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

/**
 * Check if a player is in the user's favorites
 * @param {string} playerName - Name of the player to check
 * @param {string} token - JWT token
 * @returns {Promise<boolean>} - True if player is in favorites
 */
export const checkFavoriteStatus = async (playerName, token) => {
  try {
    // Encode the player name to handle special characters in URLs
    const encodedName = encodeURIComponent(playerName);
    
    const response = await fetch(`${API_BASE_URL}/api/favorites/check/${encodedName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to check favorite status');
    }

    const data = await response.json();
    return data.isFavorite;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw error;
  }
};

/**
 * Add a player to favorites
 * @param {string} playerName - Name of the player to add
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - Added favorite data
 */
export const addToFavorites = async (playerName, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ playerName })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to add to favorites');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

/**
 * Remove a player from favorites
 * @param {string} playerName - Name of the player to remove
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - Response data
 */
export const removeFromFavorites = async (playerName, token) => {
  try {
    // Encode the player name to handle special characters in URLs
    const encodedName = encodeURIComponent(playerName);
    
    const response = await fetch(`${API_BASE_URL}/api/favorites/${encodedName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to remove from favorites');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

/**
 * Toggle favorite status for a player
 * @param {string} playerName - Name of the player
 * @param {boolean} currentStatus - Current favorite status
 * @param {string} token - JWT token
 * @returns {Promise<boolean>} - New favorite status
 */
export const toggleFavorite = async (playerName, currentStatus, token) => {
  try {
    if (currentStatus) {
      // Currently favorited, so remove
      await removeFromFavorites(playerName, token);
      return false;
    } else {
      // Not favorited, so add
      await addToFavorites(playerName, token);
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    throw error;
  }
}; 