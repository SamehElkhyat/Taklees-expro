import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import ActionButtons from "../../../../Component/shared/ActionButtons";

export default function Brookers() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

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
      toast.success("تم حظر المخلص بنجاح");
      CustomerService();
    } catch (error) {
      console.error("Error blocking user:", error);
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
      toast.success("تم فك حظر المخلص بنجاح");
      CustomerService();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };
  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      // تأمين القيم المدخلة
      const safePage = Number.isInteger(page) && page > 0 ? page : 1;
      // إنشاء رابط آمن باستخدام query parameters
      const params = new URLSearchParams({ page: safePage});
      const url = `${process.env.REACT_APP_API_URL}/Get-Broker?${params.toString()}`;
  
      // الطلب
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
  
      // التعامل مع البيانات
      setSelectedOrder(data.data || data);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUser || (Array.isArray(data) ? data.length : 0));
      setCurrentPage(safePage);
    } catch (error) {
      console.error("Fetch failed:", error);
      // ممكن تضيف toast أو alert هنا حسب المشروع
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
            المخلصين
          </h1>

          <div className="d-flex justify-content-center">
            <Col md={3} sm={12} xs={12} className="Col1 mb-3">
              {" "}
              <Link
                className="text-white text-decoration-none"
                to="/brookersLandingPage"
              >
                <Card className="shadow-lg">
                  <Card.Body>
                    <i className="fa-solid fa-tty text-success"></i>
                    <div className="content">
                      <p>قم باداره خدمه العملاء</p>
                    </div>
                    <Card.Title>تفاصيل المخلصين</Card.Title>
                    <Card.Text>الذهاب الي المخلصين.</Card.Text>
                    <div className="info d-flex justify-content-end">
                      <Button className="bg-black text-white border-none ">
                        <ArrowRightAltIcon />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </div>

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
                    onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Users count info */}
          <div className="mb-4 text-center">
            <p className="text-white text-sm sm:text-base">
              إجمالي المخلصين:{" "}
              <span className="font-bold text-blue-300">{totalUsers}</span>
            </p>
          </div>
          {/* Responsive table container */}
          <div className="table-responsive mt-3 overflow-x-auto">
            <div className="min-w-full">
              <Table className="table table-bordered w-full">
                <TableHead className="bg-white shadow-sm">
                  <TableRow>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      الاسم
                    </TableCell>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      البريد الإلكتروني
                    </TableCell>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      رقم الهوية
                    </TableCell>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      الهاتف
                    </TableCell>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      الملف الشخصي
                    </TableCell>
                    <TableCell className="text-center fw-bold text-xs sm:text-sm md:text-base">
                      الإجراء
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-2">جاري التحميل...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : selectedOrder.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan="6"
                        className="text-center py-4 text-gray-500"
                      >
                        لا توجد بيانات للعرض
                      </TableCell>
                    </TableRow>
                  ) : (
                    selectedOrder.map((customer, index) => (
                      <TableRow className="bg-light" key={customer.id || customer.email || `broker-${index}`}>
                        <TableCell className="text-center align-middle text-xs sm:text-sm md:text-base">
                          {customer.fullName}
                        </TableCell>
                        <TableCell className="text-center align-middle text-xs sm:text-sm md:text-base">
                          {customer.email}
                        </TableCell>
                        <TableCell className="text-center align-middle text-xs sm:text-sm md:text-base">
                          {customer.identity}
                        </TableCell>
                        <TableCell className="text-center align-middle text-xs sm:text-sm md:text-base">
                          {customer.phoneNumber}
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          <Button
                            onClick={() =>
                              navigate(`/ProfileUsers/${customer.id}`)
                            }
                            className="btn btn-primary text-white text-xs sm:text-sm md:text-base"
                          >
                            عرض الملف الشخصي
                          </Button>
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          {customer.isBlocked ? (
                            <Button
                              onClick={() => UnBlock(customer.email)}
                              className="btn btn-success text-white text-xs sm:text-sm md:text-base"
                            >
                              فك الحظر
                            </Button>
                          ) : (
                            <Button
                              onClick={() => Block(customer.email)}
                              className="btn btn-danger text-white text-xs sm:text-sm md:text-base"
                            >
                              حظر
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <PaginationComponent 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />


        </motion.div>

        <Toaster />
      </Box>
    </>
  );
}
