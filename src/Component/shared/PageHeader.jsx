import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ 
  title, 
  className = "",
  variant = "default" // "default" or "admin"
}) => {
  const getHeaderStyles = () => {
    if (variant === "admin") {
      return {
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        fontWeight: "700",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "3px solid #3498db",
        paddingBottom: "10px",
        width: "fit-content",
        margin: "0 auto 2rem auto",
        borderRadius: "10px",
        backgroundColor: "#4A6785",
        padding: "10px",
        border: "1px solid #3498db",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      };
    }
    
    // Default styling
    return {};
  };

  const getHeaderClassName = () => {
    if (variant === "admin") {
      return `text-xl font-bold mb-4 ${className}`;
    }
    
    // Default styling  
    return `font-bold text-[var(--secondColor--)] text-end text-lg sm:text-xl lg:text-2xl mt-3 sm:mt-4 lg:mt-5 mb-4 sm:mb-6 ${className}`;
  };

  return (
    <h1 
      className={getHeaderClassName()}
      style={getHeaderStyles()}
    >
      {title}
    </h1>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'admin']),
};

export default PageHeader; 