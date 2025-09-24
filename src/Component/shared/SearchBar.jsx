import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "ابحث عن طلب (رقم الطلب)", 
  className = "" 
}) => {
  return (
    <div className={`w-full flex items-center justify-end mb-4 sm:mb-6 ${className}`}>
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl p-2 sm:p-4">
        <div className="flex items-center justify-between border border-blue-300 rounded-lg px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder={placeholder}
            className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
          />
          <div className="flex items-center gap-1 sm:gap-2 text-black">
            <span className="text-sm sm:text-lg font-medium hidden sm:block">بحث</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchBar; 