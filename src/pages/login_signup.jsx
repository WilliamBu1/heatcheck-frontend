import React, { useState, useEffect } from 'react';
import { signupUser, loginUser } from '../api_calls/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginSignupPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const activeRedColor = '#B91C1C'; // Tailwind red-800

  // State for Signup form
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  // State for Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home_page');
    }
  }, [isAuthenticated, navigate]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const data = await signupUser({ 
        username: signupUsername, 
        email: signupEmail, 
        password: signupPassword 
      });
      setMessage({ type: 'success', text: data.msg || 'Signup successful! Please login.' });
      setSignupUsername('');
      setSignupEmail('');
      setSignupPassword('');
      
      setTimeout(() => {
        setIsLoginView(true);
        setMessage({ type: '', text: '' });
      }, 1500);

    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Signup failed. Please try again.' });
    }
    setIsLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const data = await loginUser({ email: loginEmail, password: loginPassword });
      authLogin(data.user, data.token || null);
      
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setLoginEmail('');
      setLoginPassword('');

      setTimeout(() => {
        navigate('/home_page');
      }, 1000);

    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Login failed. Please check your credentials.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 font-michroma">
      <div className="w-full max-w-md bg-black border border-gray-400 rounded-lg shadow-xl overflow-hidden">
        <div className="relative flex">
          <button 
            onClick={() => { setIsLoginView(true); setMessage({ type: '', text: '' }); }}
            className={`w-1/2 py-4 text-center font-michroma font-semibold transition-colors duration-300 
                        ${isLoginView ? 'text-red-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLoginView(false); setMessage({ type: '', text: '' }); }}
            className={`w-1/2 py-4 text-center font-michroma font-semibold transition-colors duration-300 
                        ${!isLoginView ? 'text-red-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Sign Up
          </button>
          <div 
            className={`absolute bottom-0 h-1 transition-all duration-500 ease-in-out`}
            style={{
              width: '50%',
              transform: isLoginView ? 'translateX(0%)' : 'translateX(100%)',
              backgroundColor: activeRedColor
            }}
          ></div>
        </div>

        <div 
          className={`flex transition-transform duration-500 ease-in-out w-[200%]`}
          style={{ transform: isLoginView ? 'translateX(0%)' : 'translateX(-50%)' }}
        >
          <div className="w-1/2 p-8 flex flex-col items-center">
            <h2 className="text-2xl font-michroma font-bold text-white mb-6 pt-2">Login</h2>
            {isLoginView && message.text && (
              <div className={`mb-4 p-3 rounded text-center w-full ${message.type === 'success' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'} font-michroma`}>
                {message.text}
              </div>
            )}
            <form className="w-full" onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block font-michroma text-gray-300 text-sm font-bold mb-2" htmlFor="login-email">Email</label>
                <input 
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 placeholder-gray-400 font-michroma"
                  id="login-email" type="email" placeholder="you@example.com"
                  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required
                />
              </div>
              <div className="mb-6">
                <label className="block font-michroma text-gray-300 text-sm font-bold mb-2" htmlFor="login-password">Password</label>
                <input 
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 placeholder-gray-400 font-michroma"
                  id="login-password" type="password" placeholder="********"
                  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-black text-white font-michroma font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full border-2 border-red-800 hover:bg-red-800 hover:border-red-800 transition-all duration-300" type="submit" disabled={isLoading}>
                  {isLoading && isLoginView ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>

          <div className="w-1/2 p-8 flex flex-col items-center">
            <h2 className="text-2xl font-michroma font-bold text-white mb-6 pt-2">Sign Up</h2>
            {!isLoginView && message.text && (
              <div className={`mb-4 p-3 rounded text-center w-full ${message.type === 'success' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'} font-michroma`}>
                {message.text}
              </div>
            )}
            <form className="w-full" onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block font-michroma text-gray-300 text-sm font-bold mb-2" htmlFor="signup-username">Username</label>
                <input 
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 placeholder-gray-400 font-michroma"
                  id="signup-username" type="text" placeholder="yourusername"
                  value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} required
                />
              </div>
              <div className="mb-4">
                <label className="block font-michroma text-gray-300 text-sm font-bold mb-2" htmlFor="signup-email">Email</label>
                <input 
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 placeholder-gray-400 font-michroma"
                  id="signup-email" type="email" placeholder="you@example.com"
                  value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required
                />
              </div>
              <div className="mb-6">
                <label className="block font-michroma text-gray-300 text-sm font-bold mb-2" htmlFor="signup-password">Password</label>
                <input 
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 placeholder-gray-400 font-michroma"
                  id="signup-password" type="password" placeholder="Create a password"
                  value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-black text-white font-michroma font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full border-2 border-red-800 hover:bg-red-800 hover:border-red-800 transition-all duration-300" type="submit" disabled={isLoading}>
                  {isLoading && !isLoginView ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;