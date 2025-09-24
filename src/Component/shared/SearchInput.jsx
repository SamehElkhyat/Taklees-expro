import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Search Input Component with Arabic styling
 */
const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "ابحث هنا...",
  className = "",
  containerClassName = "w-100 max-w-2xl p-4",
  searchIcon = true
}) => {
  return (
    <div className={`flex items-center justify-end ${className}`}>
      <div className={containerClassName}>
        <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <input
            value={value}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
            className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400"
          />
          {searchIcon && (
            <div className="flex items-center gap-2 text-black">
              <span className="text-lg font-medium">بحث</span>
              <svg
                className="w-5 h-5"
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
          )}
        </div>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  searchIcon: PropTypes.bool,
};

export default SearchInput;
