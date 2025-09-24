import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Import, Share2 } from "lucide-react"; // أيقونة مشاركة
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
export default function OrderDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(false);
  let params = useParams();

  const HistoryOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE3}/Logs/${params.id}/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setData(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalLogs(data.totalLogs || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setData(data);
        setTotalPages(1);
        setTotalLogs(data.length);
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
  const filteredData = Data.filter((log) => {
    return (
      searchTerm === "" ||
      log.newOrderId?.toString().includes(searchTerm) ||
      log.fullName?.includes(searchTerm) ||
      log.email?.includes(searchTerm) ||
      log.notes?.includes(searchTerm) ||
      log.message?.includes(searchTerm) ||
      log.timeStamp?.includes(searchTerm)
    );
  });

  useEffect(() => {
    HistoryOrders(currentPage);
  }, [currentPage, params.id]);

  return (
    <div className="table-responsive mt-3">
      <h5
        className="mb-4"
        style={{
          fontSize: "2rem",
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
        سجل الطلبات
      </h5>

      {/* Logs count info */}
      <div className="mb-4 text-center">
        <p className="text-white text-sm sm:text-base">
          إجمالي السجلات:{" "}
          <span className="font-bold text-blue-300">{totalLogs}</span>
        </p>
      </div>

      <div className="w-100 flex justify-center  ">
        <div className="w-100  flex items-center justify-start">
          <button className="flex items-center justify-center m-1 gap-2 bg-[#00AEEF] text-white text-lg font-medium px-6 py-3 rounded-[15px] w-[141px] h-[55px]">
            <Share2 size={24} className="transform scale-x-[-1]" />
            مشاركة
          </button>{" "}
          <button className="flex items-center justify-center m-1 gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-lg font-medium px-6 py-3 rounded-[15px] w-[141px] h-[55px]">
            <Import />
            تصدير
          </button>
        </div>

        <div className="w-100 flex items-center justify-right" dir="rtl">
          <div className=" w-100  max-w-2xl  p-4">
            <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث في السجلات (الاسم، البريد، الملاحظات، الرسالة)"
                className=" flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 "
              />
              <div className="flex items-center gap-2 text-black">
                <span className="text-lg font-medium">بحث</span>
                <svg
                  className="w-5 h-5"
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

      <table className="table table-bordered text-center shadow-sm">
        <thead className="bg-white border">
          <tr>
            <th>رقم الطلب</th>
            <th>الاسم</th>
            <th>الريد الالكتروني</th>
            <th>الملاحظات</th>
            <th>سجل الطلب</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="py-8">
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
              <td colSpan="6" className="text-center">
                {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد سجلات للعرض"}
              </td>
            </tr>
          ) : (
            filteredData.map((customer, index) => (
              <tr key={uuidv4()} className="bg-light hover:bg-gray-50">
                <td>{customer.newOrderId}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.notes}</td>
                <td>{customer.message}</td>
                <td>{customer.timeStamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Toaster />
      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
