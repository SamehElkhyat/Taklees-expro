import axios from 'axios';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

/**
 * Custom hook for managing order status changes
 * @param {string} apiEndpoint - The API endpoint for status changes
 * @param {function} onSuccess - Callback function called after successful status change
 * @param {object} options - Additional options for customization
 */
export const useOrderStatusActions = (apiEndpoint, onSuccess, options = {}) => {
  const {
    successMessage = "تم التنفيذ",
    cancelMessage = "تم الالغاء", 
    errorMessage = "حدث خطأ في العملية"
  } = options;

  const changeOrderStatus = async (id, status, additionalData = {}) => {
    try {
      await axios.post(
        apiEndpoint,
        {
          ID: id,
          statuOrder: status,
          ...additionalData
        },
        {
          withCredentials: true,
        }
      );
      
      const message = status === "true" ? successMessage : cancelMessage;
      toast.success(message);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error changing order status:", error);
      toast.error(error.response?.data?.message || errorMessage);
    }
  };

  const executeOrder = (id, additionalData = {}) => 
    changeOrderStatus(id, "true", additionalData);
    
  const cancelOrder = (id, additionalData = {}) => 
    changeOrderStatus(id, "false", additionalData);

  return {
    changeOrderStatus,
    executeOrder,
    cancelOrder
  };
};

/**
 * Action Buttons Component for Order Status Changes
 */
export const OrderActionButtons = ({ 
  orderId, 
  onExecute, 
  onCancel, 
  executeText = "تنفيذ",
  cancelText = "ألغاء",
  executeClassName = "btn bg-success w-50",
  cancelClassName = "btn bg-danger w-50",
  disabled = false
}) => (
  <div className="d-flex">
    <button
      onClick={() => onExecute(orderId)}
      className={executeClassName}
      disabled={disabled}
    >
      {executeText}
    </button>
    <button
      onClick={() => onCancel(orderId)}
      className={cancelClassName}
      disabled={disabled}
    >
      {cancelText}
    </button>
  </div>
);

OrderActionButtons.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onExecute: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  executeText: PropTypes.string,
  cancelText: PropTypes.string,
  executeClassName: PropTypes.string,
  cancelClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default { useOrderStatusActions, OrderActionButtons };
