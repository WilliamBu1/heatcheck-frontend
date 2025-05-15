import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Import Navbar
import { Outlet } from 'react-router-dom'; // Ensure Outlet is imported
// We don't necessarily need useAuth here if Navbar handles its own auth-based rendering
// and AppLayout is only used for routes that should always try to show the Navbar.

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* bg-black is typically inherited from MainLayout if MainLayout wraps this */}
      <Navbar /> {/* Navbar is rendered here */}
      <main className="flex-grow p-5"> {/* Added p-5 for padding around content */}
        <Outlet /> {/* Child route elements (like HomePage) will render here */}
      </main>
      {/* You could add a Footer here later if needed */}
    </div>
  );
};

export default AppLayout; 