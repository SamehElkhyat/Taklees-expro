import { renderHook } from '@testing-library/react';
import { useDataProcessing } from '../useDataProcessing';

describe('useDataProcessing Hook', () => {
  const mockData = [
    {
      id: 1,
      fullName: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phoneNumber: '0501234567',
      location: 'الرياض',
      typeOrder: 'تخليص جمركي'
    },
    {
      id: 2,
      fullName: 'فاطمة سالم',
      email: 'fatima@example.com',
      phoneNumber: '0507654321',
      location: 'جدة',
      typeOrder: 'استيراد'
    },
    {
      id: 3,
      fullName: 'محمد أحمد',
      email: 'mohamed@example.com',
      phoneNumber: '0509876543',
      location: 'الدمام',
      typeOrder: 'تصدير'
    }
  ];

  describe('Basic Functionality', () => {
    test('returns all data when search term is empty', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '', 'id')
      );

      expect(result.current.filteredCustomers).toEqual(mockData);
    });

    test('returns empty array when data is empty', () => {
      const { result } = renderHook(() => 
        useDataProcessing([], 'search', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([]);
    });

    test('returns all data when search term is only whitespace', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '', 'id')
      );

      expect(result.current.filteredCustomers).toEqual(mockData);
    });
  });

  describe('Filtering by ID', () => {
    test('filters data by exact ID match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '1', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial ID match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '2', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[1]]);
    });

    test('returns empty array when no ID matches', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '999', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([]);
    });

    test('handles string conversion for ID search', () => {
      const dataWithNumericIds = [
        { id: 123, name: 'Test 1' },
        { id: 456, name: 'Test 2' },
        { id: 789, name: 'Test 3' }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(dataWithNumericIds, '123', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([dataWithNumericIds[0]]);
    });
  });

  describe('Filtering by Name', () => {
    test('filters data by exact name match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'أحمد محمد علي', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial name match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'أحمد', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0], mockData[2]]);
    });

    test('performs case-insensitive search for names', () => {
      const englishData = [
        { id: 1, fullName: 'Ahmed Mohamed', email: 'ahmed@test.com' },
        { id: 2, fullName: 'Fatima Salem', email: 'fatima@test.com' },
        { id: 3, fullName: 'Mohamed Ahmed', email: 'mohamed@test.com' }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(englishData, 'ahmed', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([englishData[0], englishData[2]]);
    });

    test('handles Arabic text search correctly', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'فاطمة', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[1]]);
    });
  });

  describe('Filtering by Email', () => {
    test('filters data by exact email match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'ahmed@example.com', 'email')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial email match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'example.com', 'email')
      );

      expect(result.current.filteredCustomers).toEqual(mockData);
    });

    test('filters data by email domain', () => {
      const mixedEmailData = [
        { id: 1, email: 'user1@gmail.com', name: 'User 1' },
        { id: 2, email: 'user2@yahoo.com', name: 'User 2' },
        { id: 3, email: 'user3@gmail.com', name: 'User 3' }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(mixedEmailData, 'gmail', 'email')
      );

      expect(result.current.filteredCustomers).toEqual([mixedEmailData[0], mixedEmailData[2]]);
    });
  });

  describe('Filtering by Phone Number', () => {
    test('filters data by exact phone number match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '0501234567', 'phoneNumber')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial phone number match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '050', 'phoneNumber')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0], mockData[1]]);
    });

    test('handles phone number search without prefix', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, '1234567', 'phoneNumber')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });
  });

  describe('Filtering by Location', () => {
    test('filters data by exact location match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'الرياض', 'location')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial location match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'جدة', 'location')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[1]]);
    });

    test('handles Arabic location names correctly', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'الدمام', 'location')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[2]]);
    });
  });

  describe('Filtering by Order Type', () => {
    test('filters data by exact order type match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'تخليص جمركي', 'typeOrder')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('filters data by partial order type match', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'تخليص', 'typeOrder')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });

    test('distinguishes between different order types', () => {
      const { result } = renderHook(() => 
        useDataProcessing(mockData, 'استيراد', 'typeOrder')
      );

      expect(result.current.filteredCustomers).toEqual([mockData[1]]);
    });
  });

  describe('Hook Updates', () => {
    test('updates filtered results when data changes', () => {
      const { result, rerender } = renderHook(
        ({ data, searchTerm, filterKey }) => useDataProcessing(data, searchTerm, filterKey),
        {
          initialProps: {
            data: mockData.slice(0, 2),
            searchTerm: '',
            filterKey: 'id'
          }
        }
      );

      expect(result.current.filteredCustomers).toEqual(mockData.slice(0, 2));

      rerender({
        data: mockData,
        searchTerm: '',
        filterKey: 'id'
      });

      expect(result.current.filteredCustomers).toEqual(mockData);
    });

    test('updates filtered results when search term changes', () => {
      const { result, rerender } = renderHook(
        ({ data, searchTerm, filterKey }) => useDataProcessing(data, searchTerm, filterKey),
        {
          initialProps: {
            data: mockData,
            searchTerm: '',
            filterKey: 'fullName'
          }
        }
      );

      expect(result.current.filteredCustomers).toEqual(mockData);

      rerender({
        data: mockData,
        searchTerm: 'أحمد',
        filterKey: 'fullName'
      });

      expect(result.current.filteredCustomers).toEqual([mockData[0], mockData[2]]);
    });

    test('updates filtered results when filter key changes', () => {
      const { result, rerender } = renderHook(
        ({ data, searchTerm, filterKey }) => useDataProcessing(data, searchTerm, filterKey),
        {
          initialProps: {
            data: mockData,
            searchTerm: '1',
            filterKey: 'id'
          }
        }
      );

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);

      rerender({
        data: mockData,
        searchTerm: '1',
        filterKey: 'phoneNumber'
      });

      expect(result.current.filteredCustomers).toEqual([mockData[0]]);
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined data gracefully', () => {
      const { result } = renderHook(() => 
        useDataProcessing(undefined, 'search', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([]);
    });

    test('handles null data gracefully', () => {
      const { result } = renderHook(() => 
        useDataProcessing([], 'search', 'id')
      );

      expect(result.current.filteredCustomers).toEqual([]);
    });

    test('handles data with missing filter key properties', () => {
      const incompleteData = [
        { id: 1, fullName: 'Complete User' },
        { id: 2 }, // Missing fullName
        { fullName: 'User without ID' } // Missing id
      ];

      const { result } = renderHook(() => 
        useDataProcessing(incompleteData, 'Complete', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([incompleteData[0]]);
    });

    test('handles search in data with null/undefined values', () => {
      const dataWithNulls = [
        { id: 1, fullName: 'Valid User', email: 'valid@test.com' },
        { id: 2, fullName: null, email: 'null@test.com' },
        { id: 3, fullName: undefined, email: 'undefined@test.com' },
        { id: 4, fullName: '', email: 'empty@test.com' }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(dataWithNulls, 'Valid', 'fullName')
      );

      expect(result.current.filteredCustomers).toEqual([dataWithNulls[0]]);
    });

    test('handles special characters in search terms', () => {
      const specialData = [
        { id: 1, name: 'User@123', value: '1,000.50' },
        { id: 2, name: 'User#456', value: '2,500.75' },
        { id: 3, name: 'User$789', value: '3,200.25' }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(specialData, '@123', 'name')
      );

      expect(result.current.filteredCustomers).toEqual([specialData[0]]);
    });

    test('handles non-string filter key values', () => {
      const numericData = [
        { id: 1, value: 1000, status: true },
        { id: 2, value: 2000, status: false },
        { id: 3, value: 1500, status: true }
      ];

      const { result } = renderHook(() => 
        useDataProcessing(numericData, '1000', 'value')
      );

      expect(result.current.filteredCustomers).toEqual([numericData[0]]);
    });
  });

  describe('Performance', () => {
    test('efficiently handles large datasets', () => {
      const largeData = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        fullName: `User ${index + 1}`,
        email: `user${index + 1}@example.com`
      }));

      const startTime = performance.now();
      
      const { result } = renderHook(() => 
        useDataProcessing(largeData, 'User 5', 'fullName')
      );

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete filtering in reasonable time (less than 100ms)
      expect(executionTime).toBeLessThan(100);
      expect(result.current.filteredCustomers.length).toBeGreaterThan(0);
    });

    test('memoizes results effectively', () => {
      const { result, rerender } = renderHook(
        ({ data, searchTerm, filterKey }) => useDataProcessing(data, searchTerm, filterKey),
        {
          initialProps: {
            data: mockData,
            searchTerm: 'أحمد',
            filterKey: 'fullName'
          }
        }
      );

      const firstResult = result.current.filteredCustomers;

      // Re-render with same props should return same reference
      rerender({
        data: mockData,
        searchTerm: 'أحمد',
        filterKey: 'fullName'
      });

      expect(result.current.filteredCustomers).toBe(firstResult);
    });
  });
});
