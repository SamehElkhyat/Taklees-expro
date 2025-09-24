import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import SearchBar from "../../../../Component/shared/SearchBar";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import ActionButtons from "../../../../Component/shared/ActionButtons";
import PageHeader from "../../../../Component/shared/PageHeader";
// ✅ مكون FormResponseTable لتقليل التكرار
const FormResponseTable = ({ responses, loading }) => {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-2">جاري التحميل...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (responses.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4 text-gray-500">
            لا توجد بيانات للعرض
          </td>
        </tr>
      );
    }

    return responses.map((customer, index) => (
      <tr key={customer.id || index} className="bg-light">
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.fullName}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.email}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.phoneNumber}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.message}
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-responsive mt-3 overflow-x-auto">
      <div className="min-w-full">
        <table className="table table-bordered text-center shadow-sm w-full">
          <thead className="bg-white border">
            <tr>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الاسم</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">البريد الالكتروني</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الهاتف</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الرساله</th>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

FormResponseTable.propTypes = {
  responses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default function FormResopnse() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const CustomerService = async (page = 1, search = "") => {
    setLoading(true);
    try {
      // Simple validation for page number
      const pageNum = parseInt(page, 10);
      const safePage = pageNum && pageNum > 0 && pageNum <= 10000 ? pageNum : 1;

      // Simple validation for search parameter
      const safeSearch =
        typeof search === "string" ? search.substring(0, 255) : "";

      // Validate base URL exists
      if (!process.env.REACT_APP_API_URL_MICROSERVICE4) {
        throw new Error("API URL not configured");
      }

      // Use URLSearchParams for query parameters instead of direct interpolation
      const baseUrl = `${process.env.REACT_APP_API_URL_MICROSERVICE4}/Get-Form`;
      const url = new URL(baseUrl);
      url.searchParams.append("page", safePage);
      if (safeSearch) {
        url.searchParams.append("search", safeSearch);
      }

      const { data } = await axios.get(url.toString(), {
        withCredentials: true,
      });
      console.log(data);

      setSelectedOrder(data.data || data);
      setTotalPages(data.totalPages || 1);

      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CustomerService();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    CustomerService(page, searchTerm);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    CustomerService(1, value);
  };

  // Handler functions for actions
  const handleShare = () => {
    toast.success("تم تنفيذ عملية المشاركة");
  };

  const handleExport = () => {
    toast.success("تم تنفيذ عملية التصدير");
  };

  return (
    <>
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2, transition: { duration: 1.7 } }}
          exit={{ opacity: 0 }}
        >
          {" "}
          <PageHeader title="الشكاوي والاقتراحات" variant="admin" />
          {/* Responsive container for buttons and search */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
            <ActionButtons onShare={handleShare} onExport={handleExport} />

            <div className="w-full lg:w-auto flex items-center justify-center" dir="rtl">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                placeholder="ابحث عن شكوى أو اقتراح (الاسم، البريد، الرسالة)"
              />
            </div>
          </div>
          {/* Form Response Table */}
          <FormResponseTable 
            responses={selectedOrder}
            loading={loading}
          />
        </motion.div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Toaster />
      </Box>
    </>
  );
}
