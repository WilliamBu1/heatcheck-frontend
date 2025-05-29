import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/HCLOGO.png';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false); // Close menu after logout
  };

  const guestLinks = [
    { path: '/home_page', text: 'Home' },
    { path: '/login_signup', text: 'Login' },
    { path: '/search_page', text: 'Search Player' },
    { path: '/about', text: 'About' },
  ];

  const userLinks = [
    { path: '/home_page', text: 'Home' },
    { path: '/search_page', text: 'Search Player' },
    { path: '/favorites', text: 'Favorites' },
    { path: '/predict_page', text: 'Predict' },
    { path: '/about', text: 'About' },
  ];

  // Close mobile menu when navigating to a new page
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white px-4 flex items-center shadow-md font-michroma border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center py-2">
        {/* Logo - always visible */}
        <img 
          src={logo} 
          alt="HeatCheck Logo" 
          className="h-10 w-auto object-contain"
        />

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <>
              {user && <span className="text-gray-300 mr-4">Hi, {user.username}!</span>}
              {userLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  {index > 0 && <div className="h-4 w-px bg-gray-700 mx-2"></div>}
                  <Link 
                    to={link.path} 
                    className="hover:text-red-500 transition-colors px-2"
                  >
                    {link.text}
                  </Link>
                </React.Fragment>
              ))}
              <div className="h-4 w-px bg-gray-700 mx-3"></div>
              <button 
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-3 rounded text-sm transition-all duration-300 border-2 border-red-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {guestLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  {index > 0 && <div className="h-4 w-px bg-gray-700 mx-2"></div>}
                  <Link 
                    to={link.path} 
                    className="hover:text-red-500 transition-colors px-2"
                  >
                    {link.text}
                  </Link>
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {/* Hamburger Menu Button - only visible on mobile */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Slide-Out Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Close Button */}
            <button 
              className="self-end text-white mb-6 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Menu Links */}
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {user && <span className="text-gray-300 mb-2">Hi, {user.username}!</span>}
                  {userLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className="hover:text-red-500 transition-colors py-2"
                      onClick={handleNavigation}
                    >
                      {link.text}
                    </Link>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-3 rounded text-sm transition-all duration-300 border-2 border-red-900 mt-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {guestLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className="hover:text-red-500 transition-colors py-2"
                      onClick={handleNavigation}
                    >
                      {link.text}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Overlay to close menu when clicking outside */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 