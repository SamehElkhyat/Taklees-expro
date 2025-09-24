import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useOrderManagement } from '../useOrderManagement';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('useOrderManagement Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.post.mockResolvedValue({
      data: {
        email: 'broker@example.com',
        fullName: 'أحمد المخلص',
        identity: '1234567890',
        phoneNumber: '0501234567',
        license: 'LIC123',
        taxRecord: 'TAX456'
      }
    });
  });

  describe('Initial State', () => {
    test('initializes with correct default values', () => {
      const { result } = renderHook(() => useOrderManagement());

      expect(result.current.selectedOrder).toBeNull();
      expect(typeof result.current.setSelectedOrder).toBe('function');
      expect(typeof result.current.getAllInformationBroker).toBe('function');
      expect(typeof result.current.handleNoteChange).toBe('function');
      expect(typeof result.current.toggleNoteField).toBe('function');
      expect(typeof result.current.getNote).toBe('function');
      expect(typeof result.current.isNoteFieldVisible).toBe('function');
    });

    test('initializes with empty notes state', () => {
      const { result } = renderHook(() => useOrderManagement());

      expect(result.current.getNote('123')).toBe('');
      expect(result.current.isNoteFieldVisible('123')).toBe(false);
    });
  });

  describe('Selected Order Management', () => {
    test('updates selectedOrder when setSelectedOrder is called', () => {
      const { result } = renderHook(() => useOrderManagement());
      const mockOrder = { id: 1, name: 'Test Order' };

      act(() => {
        result.current.setSelectedOrder(mockOrder);
      });

      expect(result.current.selectedOrder).toEqual(mockOrder);
    });

    test('clears selectedOrder when set to null', () => {
      const { result } = renderHook(() => useOrderManagement());
      const mockOrder = { id: 1, name: 'Test Order' };

      act(() => {
        result.current.setSelectedOrder(mockOrder);
      });

      expect(result.current.selectedOrder).toEqual(mockOrder);

      act(() => {
        result.current.setSelectedOrder(null);
      });

      expect(result.current.selectedOrder).toBeNull();
    });
  });

  describe('Broker Information Fetching', () => {
    test('fetches broker information successfully', async () => {
      const { result } = renderHook(() => useOrderManagement());
      const brokerId = 123;

      await act(async () => {
        await result.current.getAllInformationBroker(brokerId);
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        { BrokerID: brokerId },
        { withCredentials: true }
      );
    });

    test('handles broker information fetch errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useOrderManagement());

      await expect(async () => {
        await result.current.getAllInformationBroker(123);
      }).rejects.toThrow('Network error');

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching broker information:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    test('updates selectedOrder with broker information', async () => {
      const mockBrokerData = {
        email: 'broker@example.com',
        fullName: 'أحمد المخلص',
        identity: '1234567890',
        phoneNumber: '0501234567',
        license: 'LIC123',
        taxRecord: 'TAX456'
      };

      mockedAxios.post.mockResolvedValue({ data: mockBrokerData });

      const { result } = renderHook(() => useOrderManagement());

      await act(async () => {
        await result.current.getAllInformationBroker(123);
      });

      expect(result.current.selectedOrder).toEqual(mockBrokerData);
    });
  });

  describe('Notes Management', () => {
    test('handles note changes for specific order IDs', () => {
      const { result } = renderHook(() => useOrderManagement());

      act(() => {
        result.current.handleNoteChange('order1', 'First note');
        result.current.handleNoteChange('order2', 'Second note');
      });

      expect(result.current.getNote('order1')).toBe('First note');
      expect(result.current.getNote('order2')).toBe('Second note');
      expect(result.current.getNote('order3')).toBe('');
    });

    test('updates existing notes', () => {
      const { result } = renderHook(() => useOrderManagement());

      act(() => {
        result.current.handleNoteChange('order1', 'Initial note');
      });

      expect(result.current.getNote('order1')).toBe('Initial note');

      act(() => {
        result.current.handleNoteChange('order1', 'Updated note');
      });

      expect(result.current.getNote('order1')).toBe('Updated note');
    });

    test('handles empty notes', () => {
      const { result } = renderHook(() => useOrderManagement());

      act(() => {
        result.current.handleNoteChange('order1', 'Some note');
      });

      expect(result.current.getNote('order1')).toBe('Some note');

      act(() => {
        result.current.handleNoteChange('order1', '');
      });

      expect(result.current.getNote('order1')).toBe('');
    });
  });

  describe('Note Field Visibility', () => {
    test('toggles note field visibility', () => {
      const { result } = renderHook(() => useOrderManagement());

      // Initially not visible
      expect(result.current.isNoteFieldVisible('order1')).toBe(false);

      // Toggle to visible
      act(() => {
        result.current.toggleNoteField('order1');
      });

      expect(result.current.isNoteFieldVisible('order1')).toBe(true);

      // Toggle back to hidden
      act(() => {
        result.current.toggleNoteField('order1');
      });

      expect(result.current.isNoteFieldVisible('order1')).toBe(false);
    });

    test('manages visibility for multiple order IDs independently', () => {
      const { result } = renderHook(() => useOrderManagement());

      act(() => {
        result.current.toggleNoteField('order1');
        result.current.toggleNoteField('order2');
      });

      expect(result.current.isNoteFieldVisible('order1')).toBe(true);
      expect(result.current.isNoteFieldVisible('order2')).toBe(true);
      expect(result.current.isNoteFieldVisible('order3')).toBe(false);

      act(() => {
        result.current.toggleNoteField('order1');
      });

      expect(result.current.isNoteFieldVisible('order1')).toBe(false);
      expect(result.current.isNoteFieldVisible('order2')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined order IDs gracefully', () => {
      const { result } = renderHook(() => useOrderManagement());

      expect(() => {
        result.current.getNote(undefined);
        result.current.isNoteFieldVisible(undefined);
        result.current.handleNoteChange(undefined, 'test');
        result.current.toggleNoteField(undefined);
      }).not.toThrow();
    });

    test('handles null order IDs gracefully', () => {
      const { result } = renderHook(() => useOrderManagement());

      expect(() => {
        result.current.getNote(null);
        result.current.isNoteFieldVisible(null);
        result.current.handleNoteChange(null, 'test');
        result.current.toggleNoteField(null);
      }).not.toThrow();
    });

    test('handles numeric and string order IDs', () => {
      const { result } = renderHook(() => useOrderManagement());

      act(() => {
        result.current.handleNoteChange(123, 'Numeric ID note');
        result.current.handleNoteChange('123', 'String ID note');
        result.current.toggleNoteField(456);
        result.current.toggleNoteField('456');
      });

      expect(result.current.getNote(123)).toBe('Numeric ID note');
      expect(result.current.getNote('123')).toBe('String ID note');
      expect(result.current.isNoteFieldVisible(456)).toBe(true);
      expect(result.current.isNoteFieldVisible('456')).toBe(true);
    });
  });

  describe('State Persistence', () => {
    test('maintains state across multiple operations', () => {
      const { result } = renderHook(() => useOrderManagement());

      // Set up initial state
      act(() => {
        result.current.setSelectedOrder({ id: 1, name: 'Test' });
        result.current.handleNoteChange('order1', 'Note 1');
        result.current.handleNoteChange('order2', 'Note 2');
        result.current.toggleNoteField('order1');
      });

      // Verify state is maintained
      expect(result.current.selectedOrder).toEqual({ id: 1, name: 'Test' });
      expect(result.current.getNote('order1')).toBe('Note 1');
      expect(result.current.getNote('order2')).toBe('Note 2');
      expect(result.current.isNoteFieldVisible('order1')).toBe(true);
      expect(result.current.isNoteFieldVisible('order2')).toBe(false);

      // Perform additional operations
      act(() => {
        result.current.handleNoteChange('order1', 'Updated Note 1');
        result.current.toggleNoteField('order2');
      });

      // Verify updates while maintaining other state
      expect(result.current.selectedOrder).toEqual({ id: 1, name: 'Test' });
      expect(result.current.getNote('order1')).toBe('Updated Note 1');
      expect(result.current.getNote('order2')).toBe('Note 2');
      expect(result.current.isNoteFieldVisible('order1')).toBe(true);
      expect(result.current.isNoteFieldVisible('order2')).toBe(true);
    });
  });

  describe('API Integration', () => {
    test('uses correct API endpoint for broker information', async () => {
      const { result } = renderHook(() => useOrderManagement());

      await act(async () => {
        await result.current.getAllInformationBroker(999);
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        { BrokerID: 999 },
        { withCredentials: true }
      );
    });

    test('includes credentials in API requests', async () => {
      const { result } = renderHook(() => useOrderManagement());

      await act(async () => {
        await result.current.getAllInformationBroker(123);
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        { withCredentials: true }
      );
    });
  });
});
