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
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
export default function AllClientsManger() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
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
    },
  };

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
    } catch (error) {}
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
    } catch (error) {}
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

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setSelectedOrder(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalClients(data.totalClients || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setSelectedOrder(data);
        setTotalPages(1);
        setTotalClients(data.length);
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
      customer.location?.includes(searchTerm) ||
      customer.typeOrder?.includes(searchTerm)
    );
  });

  useEffect(() => {
    CustomerService(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box width="100%" textAlign="center" p={4}>
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
          تفاصيل العملاء
        </h1>

        {/* Clients count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي العملاء:{" "}
            <span className="font-bold text-blue-300">{totalClients}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-100 flex items-center justify-end mb-4">
          <div className="w-100 max-w-2xl p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن عميل (الاسم، البريد، الموقع، النوع)"
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

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th align="center">الاسم</th>
                <th align="center">البريد الالكتروني</th>
                <th align="center">موقع الطلب</th>
                <th align="center">نوع الطلب</th>
                <th align="center">المخلص</th>
                <th align="center">البريد الخاص بالمخلص</th>
                <th align="center">حظر</th>
                <th align="center">الحاله</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-8">
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
                  <td colSpan="8" className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد عملاء للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer, index) => (
                  <tr
                    onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                    key={uuidv4()}
                    className="bg-light cursor-pointer hover:bg-gray-50"
                  >
                    <td align="center">{customer.fullName}</td>
                    <td align="center">{customer.email}</td>
                    <td align="center">{customer.location}</td>
                    <td align="center">{customer.typeOrder}</td>

                    <td align="center">
                      {customer.brokerName == null ? (
                        <>لايوجد مخلص الان</>
                      ) : (
                        <>{customer.brokerName}</>
                      )}
                    </td>
                    <td align="center">
                      {customer.brokerEmail == null ? (
                        <>لايوجد مخلص الان</>
                      ) : (
                        <>{customer.brokerEmail}</>
                      )}
                    </td>
                    <td align="center">
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
                    </td>
                    <td align="center">
                      <Button className="btn bg-success">
                        {" "}
                        {customer.statuOrder}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
}
