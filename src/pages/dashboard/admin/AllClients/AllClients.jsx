import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import ActionButtons from "../../../../Component/shared/ActionButtons";

export default function AllClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

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
      toast.success("تم حظر المستخدم بنجاح");
      CustomerService(currentPage);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("خطأ في حظر المستخدم");
    }
  };


  const HistoryOrders = async (id) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE3}/Logs`,
        { newOrderId: id },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("خطأ في جلب سجل الطلبات");
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
      toast.success("تم فك حظر المستخدم بنجاح");
      CustomerService(currentPage);
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("خطأ في فك حظر المستخدم");
    }
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Orders-Admin/${page}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setSelectedOrder(data.data || data);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUser || data.length);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
  const filteredData = selectedOrder.filter((customer) => {
    return (
      searchTerm === "" ||
      customer.fullName?.includes(searchTerm) ||
      customer.email?.includes(searchTerm) ||
      customer.location?.includes(searchTerm) ||
      customer.typeOrder?.includes(searchTerm) ||
      customer.brokerName?.includes(searchTerm) ||
      customer.brokerEmail?.includes(searchTerm) ||
      customer.statuOrder?.includes(searchTerm)
    );
  });

  useEffect(() => {
    CustomerService(currentPage);
  }, [currentPage]);

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
            تفاصيل العملاء
          </h1>

         
          <div className="mb-4 text-center">
            <p className="text-white text-sm sm:text-base">
              إجمالي العملاء:{" "}
              <span className="font-bold text-blue-300">{totalUsers}</span>
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
            <ActionButtons 
              onShare={() => toast.success("تم تنفيذ عملية المشاركة")}
              onExport={() => toast.success("تم تنفيذ عملية التصدير")}
            />
            <div
              className="w-full lg:w-auto flex items-center justify-center"
              dir="rtl"
            >
              <div className="w-full max-w-2xl p-2 sm:p-4">
                <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="ابحث في العملاء (الاسم، البريد، الموقع، النوع، الحالة)"
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

            
          <div className="table-responsive mt-3 overflow-x-auto">
            <div className="min-w-full">
              <table className="table table-bordered text-center shadow-sm w-full">
                <thead className="bg-white border">
                  <tr>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      الاسم
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      البريد الالكتروني
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      موقع الطلب
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      نوع الطلب
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      المخلص
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      البريد الخاص بالمخلص
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      حظر
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      الحاله
                    </th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      سجل الطلبات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="py-8">
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
                      <td colSpan="9" className="text-center">
                        {searchTerm
                          ? "لا توجد نتائج للبحث"
                          : "لا توجد عملاء للعرض"}
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((customer, index) => (
                      <tr key={customer.id || customer.email || `customer-${index}`} className="bg-light hover:bg-gray-50">
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.fullName}
                        </td>
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.email}
                        </td>
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.location}
                        </td>
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.typeOrder}
                        </td>
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.brokerName == null ? 'لايوجد مخلص الان' : customer.brokerName}
                        </td>
                        <td
                          className="px-2 py-3 text-xs sm:text-sm md:text-base"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.brokerEmail == null ? 'لايوجد مخلص الان' : customer.brokerEmail}
                        </td>
                        <td
                          className="px-2 py-3"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          {customer.isBlocked ? (
                            <Button
                              onClick={() => UnBlock(customer.email)}
                              className="bg-success text-black text-xs sm:text-sm md:text-base"
                            >
                              فك الحظر
                            </Button>
                          ) : (
                            <Button
                              onClick={() => Block(customer.email)}
                              className="bg-danger text-black text-xs sm:text-sm md:text-base"
                            >
                              حظر
                            </Button>
                          )}
                        </td>
                        <td
                          className="px-2 py-3"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          <Button className="btn bg-success text-xs sm:text-sm md:text-base">
                            {" "}
                            {customer.statuOrder}
                          </Button>
                        </td>{" "}
                        <td
                          className="px-2 py-3"
                          style={{ backgroundColor: "#f0f0f0" }}
                          align="center"
                        >
                          <Button
                            onClick={() => HistoryOrders(customer.id)}
                            className="btn bg-success text-xs sm:text-sm md:text-base"
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
