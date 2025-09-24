import { useState, useMemo } from 'react';

export const useDataProcessing = (customers = [], searchTerm = "", searchField = "id") => {
  const [sortOrder, setSortOrder] = useState("newest");

  // Helper function to safely get nested property values
  const getNestedProperty = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current ? Reflect.get(current, key) : undefined;
    }, obj); 
  };

  // Alternative getter using Reflect.get()
  const getPropertyValue = (obj, field) => {
    if (field.includes('.')) {
      return getNestedProperty(obj, field);
    }
    return Reflect.get(obj, field);
  };

  // Alternative using Object.getOwnPropertyDescriptor
  const getPropertySafely = (obj, field) => {
    if (field.includes('.')) {
      return getNestedProperty(obj, field);
    }
    const descriptor = Object.getOwnPropertyDescriptor(obj, field);
    return descriptor ? descriptor.value : undefined;
  };

  // Sort customers by date
  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  }, [customers, sortOrder]);

  // Filter data based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return sortedCustomers;
    
    return sortedCustomers.filter((order) => {
      // Support multiple search fields
      if (Array.isArray(searchField)) {
        return searchField.some(field => 
          getPropertyValue(order, field)?.toString().includes(searchTerm)
        );
      }
      
      // Single search field
      return getPropertyValue(order, searchField)?.toString().includes(searchTerm);
    });
  }, [sortedCustomers, searchTerm, searchField]);

  // Sort by different criteria using Reflect.get()
  const sortByField = (field, ascending = true) => {
    return [...customers].sort((a, b) => {
      const aValue = getPropertyValue(a, field);
      const bValue = getPropertyValue(b, field);
      
      if (aValue < bValue) return ascending ? -1 : 1;
      if (aValue > bValue) return ascending ? 1 : -1;
      return 0;
    });
  };

  // Filter by custom criteria using alternative approach
  const filterByField = (field, value) => {
    return customers.filter(customer => {
      const propertyValue = getPropertyValue(customer, field);
      return propertyValue === value;
    });
  };

  // Alternative filterByField using Object.getOwnPropertyDescriptor
  const filterByFieldAlternative = (field, value) => {
    return customers.filter(customer => {
      const propertyValue = getPropertySafely(customer, field);
      return propertyValue === value;
    });
  };

  // Get statistics
  const getStats = () => {
    return {
      total: customers.length,
      filtered: filteredCustomers.length,
      sortOrder,
    };
  };

  return {
    sortOrder,
    setSortOrder,
    sortedCustomers,
    filteredCustomers,
    sortByField,
    filterByField,
    filterByFieldAlternative, // Additional alternative method
    getStats,
  };
}; 