import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable component to display orders count information
 */
const OrdersCountInfo = ({ 
  totalCount, 
  label = "إجمالي الطلبات",
  className = "mb-4 text-center",
  textColor = "text-white",
  countColor = "text-blue-300"
}) => {
  return (
    <div className={className}>
      <p className={`${textColor} text-sm sm:text-base`}>
        {label}:{" "}
        <span className={`font-bold ${countColor}`}>{totalCount}</span>
      </p>
    </div>
  );
};

OrdersCountInfo.propTypes = {
  totalCount: PropTypes.number.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  countColor: PropTypes.string,
};

export default OrdersCountInfo;
