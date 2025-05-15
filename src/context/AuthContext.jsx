import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the AuthContext
const AuthContext = createContext(null);

// 2. Create the AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // Effect to run on initial mount to check sessionStorage
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const storedToken = sessionStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse auth data from sessionStorage", error);
      // Clear potentially corrupted storage
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
    setIsLoading(false); // Set loading to false after checking sessionStorage
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    try {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', authToken);
    } catch (error) {
      console.error("Failed to save auth data to sessionStorage", error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch (error) {
      console.error("Failed to remove auth data from sessionStorage", error);
    }
    // Optionally, redirect or perform other cleanup
  };
  
  const isAuthenticated = !!token; // Or more robust check if needed

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined && process.env.NODE_ENV !== 'production') {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // In production, you might want to return a default non-authenticated state
  // or handle this more gracefully if context is somehow undefined.
  // For development, throwing an error is helpful.
  if (context === null && process.env.NODE_ENV !== 'production') {
    // This can happen if the initial value of createContext was null and AuthProvider hasn't wrapped the component.
     throw new Error('useAuth was used outside of an AuthProvider or before the provider was initialized. Ensure your component is wrapped by AuthProvider.');
  }
  return context;
}; 