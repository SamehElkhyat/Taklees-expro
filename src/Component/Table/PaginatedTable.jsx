import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

// Custom hook for pagination logic
export const usePagination = (apiEndpoint, initialPage = 1) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (page = 2, additionalParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Construct URL with page as path parameter instead of query parameter
      const baseUrl = apiEndpoint.endsWith('/') ? apiEndpoint.slice(0, -1) : apiEndpoint;
      const pageUrl = `${baseUrl}/${page}`;
      
      // Add additional parameters as query params if any
      let finalUrl = pageUrl;
      if (Object.keys(additionalParams).length > 0) {
        const queryParams = new URLSearchParams(additionalParams);
        finalUrl = `${pageUrl}?${queryParams}`;
      }
      
      const response = await fetch(finalUrl, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      setData(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalItems(result.totalItems || result.totalUser || result.totalOrders || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchData(page);
    }
  };

  const refreshData = (additionalParams = {}) => {
    fetchData(currentPage, additionalParams);
  };

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
    fetchData,
    handlePageChange,
    refreshData
  };
};

// Pagination Controls Component
export const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems,
  itemsPerPage = 10 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-6 mb-4">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
          title="الصفحة السابقة"
        >
          <ChevronRight size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 text-sm font-medium ${
                page === '...'
                  ? 'text-gray-400 cursor-default'
                  : page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
          title="الصفحة التالية"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center text-white text-sm">
        <span>
          الصفحة {currentPage} من {totalPages} • إجمالي العناصر: {totalItems}
        </span>
      </div>
    </div>
  );
};

// Loading Component
export const TableLoading = ({ columns = 6 }) => (
  <tr>
    <td colSpan={columns} className="py-8">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="mr-2 text-gray-600">جاري التحميل...</span>
      </div>
    </td>
  </tr>
);

// Empty State Component
export const TableEmpty = ({ columns = 6, message = "لا توجد بيانات للعرض" }) => (
  <tr>
    <td colSpan={columns} className="py-8 text-gray-500">
      {message}
    </td>
  </tr>
);

// Main PaginatedTable Component
export const PaginatedTable = ({
  apiEndpoint,
  columns,
  renderRow,
  title,
  searchPlaceholder,
  onSearch,
  additionalButtons,
  itemsPerPage = 10,
  emptyMessage = "لا توجد بيانات للعرض",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
    fetchData,
    handlePageChange,
    refreshData
  } = usePagination(apiEndpoint);

  useEffect(() => {
    fetchData(1);
  }, [apiEndpoint]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value, refreshData);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">حدث خطأ في تحميل البيانات</div>
        <button 
          onClick={() => fetchData(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Title */}
      {title && (
        <h1 className="text-xl font-bold mb-4 text-center" style={{
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
        }}>
          {title}
        </h1>
      )}

      {/* Search and Buttons */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
        {/* Additional Buttons */}
        {additionalButtons && (
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            {additionalButtons}
          </div>
        )}

        {/* Search */}
        {onSearch && (
          <div className="w-full lg:w-auto flex items-center justify-center" dir="rtl">
            <div className="w-full max-w-2xl p-2 sm:p-4">
              <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  placeholder={searchPlaceholder || "ابحث..."}
                  className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
                />
                <div className="flex items-center gap-1 sm:gap-2 text-black">
                  <span className="text-sm sm:text-lg font-medium hidden sm:inline">بحث</span>
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
        )}
      </div>

      {/* Items Count */}
      <div className="mb-4 text-center">
        <p className="text-white text-sm sm:text-base">
          إجمالي العناصر: <span className="font-bold text-blue-300">{totalItems}</span>
        </p>
      </div>

      {/* Table */}
      <div className="table-responsive mt-3 overflow-x-auto">
        <div className="min-w-full">
          <table className="table table-bordered text-center shadow-sm w-full">
            <thead className="bg-white border">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-2 py-3 text-xs sm:text-sm md:text-base">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableLoading columns={columns.length} />
              ) : data.length === 0 ? (
                <TableEmpty columns={columns.length} message={emptyMessage} />
              ) : (
                data.map((item, index) => renderRow(item, index))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

// PropTypes for PaginationControls
PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number
};

// PropTypes for TableLoading
TableLoading.propTypes = {
  columns: PropTypes.number
};

// PropTypes for TableEmpty
TableEmpty.propTypes = {
  columns: PropTypes.number,
  message: PropTypes.string
};

// PropTypes for PaginatedTable
PaginatedTable.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  additionalButtons: PropTypes.node,
  itemsPerPage: PropTypes.number,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};

export default PaginatedTable; 