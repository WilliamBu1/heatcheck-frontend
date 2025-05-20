import React, { useState, useEffect, useRef } from 'react';

const PlayerSearchAutocomplete = ({ players, onPlayerSelect, onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter players based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlayers([]);
      setShowDropdown(false);
      return;
    }

    const filtered = players.filter(player => 
      player.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10); // Limit to 10 results for performance

    setFilteredPlayers(filtered);
    setShowDropdown(filtered.length > 0);
    setActiveIndex(-1);
  }, [searchTerm, players]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        prev < filteredPlayers.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => prev > 0 ? prev - 1 : 0);
    }
    // Enter
    else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelectPlayer(filteredPlayers[activeIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectPlayer = (player) => {
    setSearchTerm(player);
    setShowDropdown(false);
    if (onPlayerSelect) {
      onPlayerSelect(player);
    }
  };

  const handleGoClick = () => {
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    } else if (searchTerm.trim() !== '') {
      // If no submission handler provided, select the first filtered player as fallback
      const firstMatch = filteredPlayers[0];
      if (firstMatch) {
        handleSelectPlayer(firstMatch);
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex">
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.trim() !== '' && setShowDropdown(filteredPlayers.length > 0)}
            placeholder="Search for a player..."
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-l-lg py-2 px-4 pl-10 focus:outline-none focus:border-red-500 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleGoClick}
          className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-lg border border-red-700 transition-colors focus:outline-none"
        >
          Go
        </button>
      </div>

      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <ul>
            {filteredPlayers.map((player, index) => (
              <li 
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${activeIndex === index ? 'bg-gray-700' : ''}`}
                onClick={() => handleSelectPlayer(player)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="text-white">{player}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerSearchAutocomplete; 