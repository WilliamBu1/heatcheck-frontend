import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search players..." }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-red-500 transition-colors"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 