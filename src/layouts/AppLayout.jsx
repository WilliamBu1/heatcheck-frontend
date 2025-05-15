import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Import Navbar
// We don't necessarily need useAuth here if Navbar handles its own auth-based rendering
// and AppLayout is only used for routes that should always try to show the Navbar.

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar /> {/* Navbar is rendered here */}
      <main className="flex-grow text-white p-5 box-border">
        {/* The p-5 might need adjustment based on global styles or content needs */}
        {children}
      </main>
      {/* You could add a Footer here later if needed */}
    </div>
  );
};

export default AppLayout; 