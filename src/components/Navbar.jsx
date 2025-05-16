import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/HCLOGO.png';
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to landing page after logout
  };

  const guestLinks = [
    { path: '/login_signup', text: 'Login' },
    { path: '/feature1_guest', text: 'Search Player' }, // Example placeholder path
    { path: '/about', text: 'About' },
  ];

  const userLinks = [
    { path: '/feature1_user', text: 'Search Player' },   // Example placeholder path
    { path: '/feature2_user', text: 'Favorites' },   // Example placeholder path 
    { path: '/about', text: 'About' },
  ];

  return (
    <nav className="bg-black text-white px-4 flex items-center shadow-md font-michroma border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center">
        <img 
          src={logo} 
          alt="HeatCheck Logo" 
          className="h-12 w-auto object-contain"
        />
        <div className="flex items-center space-x-4 py-4">
          {isAuthenticated ? (
            <>
              {user && <span className="text-gray-300 mr-2">Hi, {user.username}!</span>}
              {userLinks.map((link) => (
                <Link key={link.path} to={link.path} className="hover:text-red-500 transition-colors">
                  {link.text}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-3 rounded text-sm transition-all duration-300 border-2 border-red-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {guestLinks.map((link) => (
                <Link key={link.path} to={link.path} className="hover:text-red-500 transition-colors">
                  {link.text}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 