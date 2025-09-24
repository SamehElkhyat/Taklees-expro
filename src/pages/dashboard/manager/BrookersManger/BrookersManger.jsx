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
import toast, { Toaster } from "react-hot-toast";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
import LoadingButton from "../../../../Component/shared/LoadingButton";
export default function BrookersManger() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBrokers, setTotalBrokers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const styles = {
    cards1: {
      backgroundColor: Ishovered1 ? "#1ea9e2" : "white",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
  
    icons: {
      fontSize: "50px",
      padding: "20px",
    },}

  const Block = async (email) => {
    
    try {
      const { data } = await axios.post(
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
      toast.error("حدث خطأ ما");
    }
  };

  const UnBlock = async (email) => {

    try {
      const { data } = await axios.post(
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
      toast.error("حدث خطأ ما");
    }
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Broker/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setSelectedOrder(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalBrokers(data.totalBrokers || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setSelectedOrder(data);
        setTotalPages(1);
        setTotalBrokers(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Filter data based on search term
  const filteredData = selectedOrder.filter((customer) => {
    return (
      searchTerm === "" ||
      customer.fullName?.includes(searchTerm) ||
      customer.email?.includes(searchTerm) ||
      customer.identity?.includes(searchTerm) ||
      customer.phoneNumber?.includes(searchTerm)
    );
  });

  useEffect(() => {
    CustomerService(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box width="100%" textAlign="center" p={4}>
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 border-b-4 border-blue-500 inline-block pb-2">
  المخلصين
</h1>

        {/* Brokers count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي المخلصين:{" "}
            <span className="font-bold text-blue-300">{totalBrokers}</span>
          </p>
        </div>

        <Col md={12} sm={12} xs={12} className="mb-3 d-flex justify-content-center w-100">
        <Card
  className="transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
  style={{
    backgroundColor: Ishovered1 ? "#e0f7ff" : "#ffffff",
    borderRadius: "12px",
    cursor: "pointer"
  }}
  onMouseLeave={() => setIshovered1(false)}
  onMouseEnter={() => setIshovered1(true)}
>
  <Card.Body className="text-center">
    <i className="fa-solid fa-tty text-blue-600" style={styles.icons}></i>
    <Card.Title className="font-bold mb-2">تفاصيل المخلصين</Card.Title>
    <Card.Text className="text-gray-600 mb-3">الذهاب الي المخلصين</Card.Text>
    <Link to="/brookersLandingPage" className="btn btn-primary text-white">
      الذهاب إلى جميع تفاصيل المخلصين
    </Link>
  </Card.Body>
</Card>

        </Col>

        {/* Search Bar */}
        <div className="w-100 flex items-center justify-end mb-4">
          <div className="w-100 max-w-2xl p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن مخلص (الاسم، البريد، الهوية، الهاتف)"
                className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400"
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

        <Table style={{ marginTop: "20px", width: "100%" }}>
          <TableHead
            sx={{
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              borderLeft: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableRow>
              <TableCell align="center">الاسم</TableCell>
              <TableCell align="center">البريد الالكتروني</TableCell>
              <TableCell align="center">رقم الهويه</TableCell>
              <TableCell align="center">الهاتف</TableCell>
              <TableCell align="center">حظر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="py-8">
                  <LoadingButton
                    loadingText="جاري التحميل..."
                  />

                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد مخلصين للعرض"}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((customer,index) => (
                <TableRow 
                  onClick={()=>navigate(`/ProfileUsers/${customer.id}`)} 
                  sx={{ backgroundColor: "#f0f0f0", cursor: "pointer" }} 
                  key={uuidv4()}
                  className="hover:bg-gray-50"
                >
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.fullName}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.email}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.identity}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.isBlocked ? (
                      <>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            UnBlock(customer.email);
                          }} 
                          className="bg-success text-black"
                        >
                          فك الحظر
                        </Button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            Block(customer.email);
                          }}
                          className="bg-danger text-black"
                        >
                          حظر
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

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
