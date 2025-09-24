import React from "react";
import PropTypes from "prop-types";

const LoadingButton = ({
  onClick,
  disabled = false,
  isLoading = false,
  variant = "success",
  className = "",
  children,
  loadingText = "جارٍ التحميل...",
  size = "sm",
  loadingIcon = "spinner", // "spinner" or "gear"
  type = "button",
  ...props
}) => {

  return (
    <tr>
    <td colSpan="4" className="py-8">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="mr-2 text-gray-600">
          <output>{loadingText}</output>
        </span>
      </div>
    </td>
  </tr>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  loadingText: PropTypes.string,
  size: PropTypes.string,
  loadingIcon: PropTypes.oneOf(["spinner", "gear"]),
  type: PropTypes.string,
};

export default LoadingButton;
