import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
const axios = require('axios');
import toast from 'react-hot-toast';
import { useOrderStatusActions, OrderActionButtons } from '../OrderStatusActions';

// Mock dependencies
jest.mock('axios');
jest.mock('react-hot-toast');

const mockedAxios = axios;
const mockedToast = toast;

// Test component to test the hook
const TestComponent = ({ apiEndpoint, onActionSuccess }) => {
  const { executeOrder, cancelOrder } = useOrderStatusActions(apiEndpoint, onActionSuccess);
  
  return (
    <div>
      <button onClick={() => executeOrder('123')} data-testid="execute-btn">
        Execute Order
      </button>
      <button onClick={() => cancelOrder('123')} data-testid="cancel-btn">
        Cancel Order
      </button>
    </div>
  );
};

describe('useOrderStatusActions Hook', () => {
  const mockApiEndpoint = 'https://api.example.com/orders/status';
  const mockOnActionSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.post.mockResolvedValue({ data: {} });
    mockedToast.mockImplementation(() => {});
    mockedToast.error = jest.fn();
  });

  describe('executeOrder Function', () => {
    test('makes correct API call for execute order', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          mockApiEndpoint,
          { ID: '123', statuOrder: 'true' },
          { withCredentials: true }
        );
      });
    });

    test('shows success toast message in Arabic for execute', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockedToast).toHaveBeenCalledWith('تم التنفيذ');
      });
    });

    test('calls onActionSuccess callback after successful execute', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockOnActionSuccess).toHaveBeenCalled();
      });
    });

    test('handles execute error and shows error toast', async () => {
      const mockError = new Error('Network error');
      mockedAxios.post.mockRejectedValue(mockError);

      // Spy on console.error to suppress error logs in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockedToast.error).toHaveBeenCalledWith('حدث خطأ ما');
        expect(console.error).toHaveBeenCalledWith('Error changing order status:', mockError);
      });

      consoleSpy.mockRestore();
    });
  });

  describe('cancelOrder Function', () => {
    test('makes correct API call for cancel order', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          mockApiEndpoint,
          { ID: '123', statuOrder: 'false' },
          { withCredentials: true }
        );
      });
    });

    test('shows success toast message in Arabic for cancel', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(mockedToast).toHaveBeenCalledWith('تم الالغاء');
      });
    });

    test('calls onActionSuccess callback after successful cancel', async () => {
      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(mockOnActionSuccess).toHaveBeenCalled();
      });
    });

    test('handles cancel error and shows error toast', async () => {
      const mockError = new Error('Network error');
      mockedAxios.post.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <TestComponent 
          apiEndpoint={mockApiEndpoint} 
          onActionSuccess={mockOnActionSuccess} 
        />
      );

      fireEvent.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(mockedToast.error).toHaveBeenCalledWith('حدث خطأ ما');
        expect(console.error).toHaveBeenCalledWith('Error changing order status:', mockError);
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Hook without onActionSuccess callback', () => {
    test('works correctly without onActionSuccess callback', async () => {
      render(<TestComponent apiEndpoint={mockApiEndpoint} />);

      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(mockedToast).toHaveBeenCalledWith('تم التنفيذ');
      });

      // Should not throw error when onActionSuccess is undefined
    });
  });

  describe('Different Order IDs', () => {
    test('handles string order IDs', async () => {
      const TestComponentWithStringId = () => {
        const { executeOrder } = useOrderStatusActions(mockApiEndpoint);
        return (
          <button onClick={() => executeOrder('order-abc-123')} data-testid="execute-btn">
            Execute
          </button>
        );
      };

      render(<TestComponentWithStringId />);
      fireEvent.click(screen.getByTestId('execute-btn'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          mockApiEndpoint,
          { ID: 'order-abc-123', statuOrder: 'true' },
          { withCredentials: true }
        );
      });
    });

    test('handles numeric order IDs', async () => {
      const TestComponentWithNumericId = () => {
        const { cancelOrder } = useOrderStatusActions(mockApiEndpoint);
        return (
          <button onClick={() => cancelOrder(456)} data-testid="cancel-btn">
            Cancel
          </button>
        );
      };

      render(<TestComponentWithNumericId />);
      fireEvent.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          mockApiEndpoint,
          { ID: 456, statuOrder: 'false' },
          { withCredentials: true }
        );
      });
    });
  });
});

describe('OrderActionButtons Component', () => {
  const mockOnExecute = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders execute and cancel buttons', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByText('تنفيذ')).toBeInTheDocument();
      expect(screen.getByText('ألغاء')).toBeInTheDocument();
    });

    test('applies correct CSS classes to buttons', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      const executeButton = screen.getByText('تنفيذ');
      const cancelButton = screen.getByText('ألغاء');

      expect(executeButton).toHaveClass('btn', 'bg-success', 'w-50');
      expect(cancelButton).toHaveClass('btn', 'bg-danger', 'w-50');
    });
  });

  describe('Button Interactions', () => {
    test('calls onExecute with correct orderId when execute button is clicked', () => {
      render(
        <OrderActionButtons
          orderId="test-order-123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      fireEvent.click(screen.getByText('تنفيذ'));

      expect(mockOnExecute).toHaveBeenCalledWith('test-order-123');
      expect(mockOnExecute).toHaveBeenCalledTimes(1);
    });

    test('calls onCancel with correct orderId when cancel button is clicked', () => {
      render(
        <OrderActionButtons
          orderId="test-order-456"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      fireEvent.click(screen.getByText('ألغاء'));

      expect(mockOnCancel).toHaveBeenCalledWith('test-order-456');
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    test('handles multiple clicks correctly', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      const executeButton = screen.getByText('تنفيذ');
      const cancelButton = screen.getByText('ألغاء');

      fireEvent.click(executeButton);
      fireEvent.click(executeButton);
      fireEvent.click(cancelButton);

      expect(mockOnExecute).toHaveBeenCalledTimes(2);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Different Order ID Types', () => {
    test('works with string order IDs', () => {
      render(
        <OrderActionButtons
          orderId="string-id-abc"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      fireEvent.click(screen.getByText('تنفيذ'));

      expect(mockOnExecute).toHaveBeenCalledWith('string-id-abc');
    });

    test('works with numeric order IDs', () => {
      render(
        <OrderActionButtons
          orderId={789}
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      fireEvent.click(screen.getByText('ألغاء'));

      expect(mockOnCancel).toHaveBeenCalledWith(789);
    });
  });

  describe('Accessibility', () => {
    test('buttons have proper button roles', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    test('buttons have accessible names in Arabic', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByRole('button', { name: 'تنفيذ' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'ألغاء' })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles undefined callback functions gracefully', () => {
      render(
        <OrderActionButtons
          orderId="123"
          onExecute={undefined}
          onCancel={undefined}
        />
      );

      // Should not throw error when clicked
      expect(() => {
        fireEvent.click(screen.getByText('تنفيذ'));
        fireEvent.click(screen.getByText('ألغاء'));
      }).not.toThrow();
    });

    test('handles null orderId', () => {
      render(
        <OrderActionButtons
          orderId={null}
          onExecute={mockOnExecute}
          onCancel={mockOnCancel}
        />
      );

      fireEvent.click(screen.getByText('تنفيذ'));

      expect(mockOnExecute).toHaveBeenCalledWith(null);
    });
  });

  describe('Integration with useOrderStatusActions', () => {
    test('integrates correctly with the hook', async () => {
      const IntegratedComponent = () => {
        const { executeOrder, cancelOrder } = useOrderStatusActions(
          'https://api.example.com/orders',
          mockOnActionSuccess
        );

        return (
          <OrderActionButtons
            orderId="integration-test"
            onExecute={executeOrder}
            onCancel={cancelOrder}
          />
        );
      };

      render(<IntegratedComponent />);

      fireEvent.click(screen.getByText('تنفيذ'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'https://api.example.com/orders',
          { ID: 'integration-test', statuOrder: 'true' },
          { withCredentials: true }
        );
      });
    });
  });
});
