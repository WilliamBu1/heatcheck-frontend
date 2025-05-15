import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();
  const homePath = isAuthenticated ? '/home_page' : '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center p-4 font-michroma">
      {/* Adjust min-h if your navbar/footer height is different */}
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-6">Oops! Page Not Found.</h2>
      <p className="text-gray-400 mb-8">
        The page you are looking for might have been removed, had its name changed,
        <br />
        or is temporarily unavailable.
      </p>
      <Link 
        to={homePath} 
        className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 border-2 border-red-900"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage; 