import React, { useState, useEffect, useRef } from 'react';

const PlayerSearchAutocomplete = ({ players, onPlayerSelect, onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const searchUpdateSourceRef = useRef('typing'); // Tracks if searchTerm updated by 'typing' or 'selection'

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

    // Only show dropdown if the search term was updated by typing
    // and there are results. If it was a selection, handleSelectPlayer already closed it.
    if (searchUpdateSourceRef.current === 'typing') {
      setShowDropdown(filtered.length > 0);
    }
    // After a selection, the ref would be 'selection', so this block is skipped,
    // respecting setShowDropdown(false) from handleSelectPlayer.
    // Reset to 'typing' for subsequent input changes.
    // However, this reset is better done in handleInputChange or when focus is gained and input is empty.

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
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredPlayers.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelectPlayer(filteredPlayers[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    searchUpdateSourceRef.current = 'typing'; // Mark update source as typing
    setSearchTerm(e.target.value);
  };

  const handleSelectPlayer = (player) => {
    searchUpdateSourceRef.current = 'selection'; // Mark update source as selection
    setSearchTerm(player);
    setShowDropdown(false); // Close dropdown
    
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from input
    }
    if (onPlayerSelect) {
      onPlayerSelect(player);
    }
  };

  const handleGoClick = () => {
    setShowDropdown(false); // Close dropdown on Go click
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from input
    }
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    } else if (searchTerm.trim() !== '') {
      const firstMatch = filteredPlayers[0];
      if (firstMatch) {
        searchUpdateSourceRef.current = 'selection'; // Treat Go click like a selection if it auto-selects
        handleSelectPlayer(firstMatch);
      }
    }
  };

  const handleItemClick = (e, player) => {
    e.stopPropagation();
    handleSelectPlayer(player);
  };

  const handleInputFocus = () => {
    // When input is focused, if there's text and matches, show dropdown
    // This is primarily for when user tabs back or clicks into an already populated search
    searchUpdateSourceRef.current = 'typing'; // Treat focus as if user might start typing
    if (searchTerm.trim() !== '' && filteredPlayers.length > 0) {
      setShowDropdown(true);
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
            onFocus={handleInputFocus} // Use the refined focus handler
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
                onClick={(e) => handleItemClick(e, player)} // Still using handleItemClick
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