import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import ActionButtons from "../../../../Component/shared/ActionButtons";
export default function ExpiredOrders() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const safePage =
        Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;

      const params = new URLSearchParams({ page: safePage });

      const { data } = await axios.get(
        `${
          process.env.REACT_APP_API_URL_MICROSERVICE2
        }/Orders-Expired-Date?${params.toString()}`,
        {
          withCredentials: true,
        }
      );
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
    CustomerService(page);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    CustomerService(value);
  };

  return (
    <>
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2, transition: { duration: 1.7 } }}
          exit={{ opacity: 0 }}
        >
          <h1
            className="text-xl font-bold mb-4"
            style={{
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
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              },
            }}
          >
            الطلبات المنتهيه
          </h1>

          {/* Responsive container for buttons and search */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
            <ActionButtons
              onShare={() => toast.success("تم تنفيذ عملية المشاركة")}
              onExport={() => toast.success("تم تنفيذ عملية التصدير")}
            />

            {/* Search container */}
            <div
              className="w-full lg:w-auto flex items-center justify-center"
              dir="rtl"
            >
              <div className="w-full max-w-2xl p-2 sm:p-4">
                <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <input
                    value={searchTerm}
                    onChange={handleSearch}
                    type="text"
                    placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                    className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
                  />
                  <div className="flex items-center gap-1 sm:gap-2 text-black">
                    <span className="text-sm sm:text-lg font-medium hidden sm:inline">
                      بحث
                    </span>
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
          </div>

          {/* Responsive table container */}
          <div className="table-responsive mt-3 overflow-x-auto">
            <div className="min-w-full">
              <table className="table table-bordered text-center shadow-sm w-full">
                <thead className="bg-white border">
                  <tr>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      الرقم المعرف
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      الوقت
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      العنوان
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-2">جاري التحميل...</span>
                        </div>
                      </td>
                    </tr>
                  ) : selectedOrder.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500"
                      >
                        لا توجد بيانات للعرض
                      </td>
                    </tr>
                  ) : (
                    selectedOrder.map((customer) => (
                      <tr
                        // onClick={() => navigate(`/OrderDetailsForUser/${customer.id}`)}
                        key={uuidv4()}
                        className="bg-light"
                      >
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                          {customer.id}
                        </td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                          {customer.date}
                        </td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                          {customer.location}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
