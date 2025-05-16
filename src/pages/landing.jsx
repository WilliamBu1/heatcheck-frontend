import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext.jsx'; // Updated import path
import LebronGif from '../assets/LEBRON.gif'; // Import the GIF
import logo from '../assets/HCLOGO.png'; // Import the logo

const Landing = () => {
  const [visible, setVisible] = useState(false);
  const { isAuthenticated, isLoading } = useAuth(); // Only need isAuthenticated and isLoading
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Animation timer
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect if authenticated and not loading
    if (!isLoading && isAuthenticated) {
      navigate('/home_page');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Show loading only if not yet redirected
  if (isLoading || (!isLoading && isAuthenticated)) {
    // If still loading, or if authenticated (and will be redirected), show loading to prevent flash of landing content
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-michroma">
        Loading...
      </div>
    );
  }

  return (
    // Outermost container for positioning context and full screen coverage
    <div className="relative min-h-screen overflow-hidden"> 
      {/* GIF Background Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${LebronGif})` }}
      ></div>

      {/* Dimming Overlay Layer */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-10"></div> {/* Opacity set to 60% */}

      {/* Content Layer - ensure it's above the overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center p-4">
        {/* Logo at the top, horizontally centered */}
        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <img src={logo} alt="HeatCheck Logo" className="h-24 w-auto object-contain" />
        </div>
        
        {/* Combined container for title and button, centered on the page */}
        <div className="flex flex-col items-center justify-center w-full">
          <h1 
            className={`
              font-michroma w-4/5 text-white
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-bold leading-tight transition-all duration-1000 ease-out
              ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-90'}
            `}
          >
            Understand scoring trends for your favorite players.
          </h1>
          <p 
            className={`
              mt-6 md:mt-8 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2
              text-gray-300 text-base sm:text-lg md:text-xl
              font-karla transition-opacity duration-1000 ease-out delay-200
              ${visible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            Explore NBA player statistics like never before. Our platform utilizes advanced metrics and ML to deliver predictive insights and in-depth analysis of top players' scoring capabilities.
          </p>
          <div 
            className={`
              mt-12 transition-opacity duration-1000 ease-out delay-700
              ${visible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <Link to="/login_signup">
              <button 
                className="bg-black text-white font-michroma font-bold py-3 px-8 rounded-lg text-xl md:text-2xl transition-all duration-300 border-2 border-red-800 hover:bg-red-800 hover:border-red-800"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;