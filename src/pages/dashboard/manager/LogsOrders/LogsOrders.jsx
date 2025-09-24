import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
  import { Import, Share2 } from "lucide-react"; // أيقونة مشاركة
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
function LogsOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const AllOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Orders-For-Admin/${page}`,
        { withCredentials: true }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setSelectedOrder(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setSelectedOrder(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter data based on search term
  const filteredData = selectedOrder.filter((order) => {
    return (
      searchTerm === "" ||
      order.id?.toString().includes(searchTerm) ||
      order.location?.includes(searchTerm) ||
      order.statuOrder?.includes(searchTerm) ||
      order.date?.includes(searchTerm)
    );
  });

  useEffect(() => {
    AllOrders(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
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
          الطلبات
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>
        
        {/* Responsive container for buttons and search */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
          {/* Buttons container */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-2 bg-[#00AEEF] text-white text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
              <Share2 size={20} className="transform scale-x-[-1] sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">مشاركة</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
              <Import size={20} className="sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">تصدير</span>
            </button>
          </div>

          {/* Search container */}
          <div className="w-full lg:w-auto flex items-center justify-center" dir="rtl">
            <div className="w-full max-w-2xl p-2 sm:p-4">
              <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
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
        </div>

        {/* Responsive table container */}
        <div className="table-responsive mt-3 overflow-x-auto">
          <div className="min-w-full">
            <table className="table table-bordered text-center shadow-sm w-full">
              <thead className="bg-white border">
                <tr>
                  <th className="px-2 py-3 text-xs sm:text-sm md:text-base">رقم الطلب</th>
                  <th className="px-2 py-3 text-xs sm:text-sm md:text-base">موقع الطلب</th>
                  <th className="px-2 py-3 text-xs sm:text-sm md:text-base">التاريخ</th>
                  <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الحاله</th>
                  <th className="px-2 py-3 text-xs sm:text-sm md:text-base">سجل الطلب</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="mr-2 text-gray-600">
                          جاري التحميل...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات للعرض"}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((customer) => (
                    <tr key={uuidv4()} className="bg-light hover:bg-gray-50">
                      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.id}</td>
                      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.location}</td>
                      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.date}</td>
                      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.statuOrder}</td>
                      <td className="bg-success text-white px-2 py-3">
                        <Button
                          className="text-white text-xs sm:text-sm md:text-base"
                          onClick={() =>
                            navigate(`/DetailsForAdmin/${customer.id}`)
                          }
                        >
                          عرض سجل الطلب
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Component */}
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

export default LogsOrders;
