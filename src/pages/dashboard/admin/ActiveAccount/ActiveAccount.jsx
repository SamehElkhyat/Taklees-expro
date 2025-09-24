import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Import, Share2 } from "lucide-react"; // أيقونة مشاركة
import PaginationComponent from "../../../../Component/shared/PaginationComponent";

export default function ActiveAccount() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const Block = async (email) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Blocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("خطأ في حظر المستخدم");
    }
  };

  const UnBlock = async (email) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Unblocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("خطأ في فك حظر المستخدم");
    }
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const safePage =
        Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const params = new URLSearchParams({ page: safePage });
      const url = `${
        process.env.REACT_APP_API_URL
      }/Get-Manager?${params.toString()}`;

      const { data } = await axios.get(
        url,

        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data.data || data);
      setTotalUsers(data.totalUser || data.length);
      setCurrentPage(page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CustomerService(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box width="100%" textAlign="center" p={4}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <h1
          className="text-xl font-bold mb-4"
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
          العملاء النشطين
        </h1>
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
                  placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
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

        {/* Users count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي العملاء:{" "}
            <span className="font-bold text-blue-300">{totalUsers}</span>
          </p>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>الاسم</th>
                <th>البريد الالكتروني</th>
                <th>رقم الهوية</th>
                <th>الهاتف</th>
                <th>حظر</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (loading) {
                  return [
                    <tr key="loading">
                      <td colSpan="5" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-2">جاري التحميل...</span>
                        </div>
                      </td>
                    </tr>
                  ];
                }

                if (selectedOrder.length === 0) {
                  return [
                    <tr key="no-data">
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        لا توجد بيانات للعرض
                      </td>
                    </tr>
                  ];
                }

                return selectedOrder.map((customer) => (
                  <tr
                    onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                    key={customer.id || customer.email}
                    className="bg-light"
                  >
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.identity}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>
                      {customer.isBlocked ? (
                        <button
                          id="Button-Block-groupe"
                          onClick={() => UnBlock(customer.email)}
                          className="btn btn-success text-black"
                        >
                          فك الحظر
                        </button>
                      ) : (
                        <button
                          id="Button-Block-groupe"
                          onClick={() => Block(customer.email)}
                          className="btn z-index-9999 btn-danger text-black"
                        >
                          حظر
                        </button>
                      )}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </motion.div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Toaster />
    </Box>
  );
}
