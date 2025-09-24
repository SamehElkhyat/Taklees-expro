import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";

export default function CurrentOffers() {
  const [date, setDate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [orders2, setOrders2] = useState([]);
  const [DecodedTokken, setDecodedTokken] = useState();
  const [Tracking, setTracking] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [Step1, setStep1] = useState(false);
  const [Step2, setStep2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const SendIdSuccses = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "true",
        },
        {
          withCredentials: true,
        }
      );

      toast("تم التنفيذ");
      GetValueCurrentOffers(currentPage);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // cancle//
  const SendIdCancel = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "false",
        },
        {
          withCredentials: true,
        }
      );
      toast("تم الالغاء");
      GetValueCurrentOffers(currentPage);
    } catch (error) {}
  };
  const GetValueCurrentOffers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Order-Requests/${page}`,
        {
          withCredentials: true,
        }
      );
      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setOrders2(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setOrders2(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const GetTrackingstep1 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: null,
          step3: null,
        },
        {
          withCredentials: true,
        }
      );
      setStep1(true);
    } catch (error) {}
  };
  const GetTrackingstep2 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: "step2",
          step3: null,
        },
        {
          withCredentials: true,
        }
      );
      setStep2(true);
    } catch (error) {}
  };
  const GetTrackingstep3 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: "step2",
          step3: "step3",
        },
        {
          withCredentials: true,
        }
      );
      setTracking(data);
    } catch (error) {}
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  useEffect(() => {
    console.log(currentPage);
    console.log(totalPages);
    console.log(totalOrders);
    console.log(orders2);
    console.log(searchTerm);
    console.log(searchTerm2);
    console.log(DecodedTokken);
    GetValueCurrentOffers(currentPage);
    const t = moment();
    setDate(new Date().toLocaleString());
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = orders2.filter((order) => {
    return searchTerm2 === "" || order.id.includes(searchTerm2);
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <h3 className="font-bold text-[var(--secondColor--)] text-right text-xl sm:text-2xl lg:text-3xl mb-6">
            قائمة العروض الجاريه
          </h3>

          {/* Orders count info */}
          <div className="mb-4 text-center">
            <p className="text-white text-sm sm:text-base">
              إجمالي العروض:{" "}
              <span className="font-bold text-blue-300">{totalOrders}</span>
            </p>
          </div>

          {/* Search Section */}
          <div className="flex justify-end mb-8">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="ابحث عن طلب (رقم الطلب)..."
                    className="w-full px-6 py-4 pr-16 text-right bg-transparent border-0 rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 placeholder:text-sm focus:placeholder:text-gray-300 text-gray-700 font-medium"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                      </svg>
                      <span className="text-sm font-semibold">بحث</span>
                    </div>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {searchTerm && (
                <div className="mt-2 text-right">
                  <span className="text-sm text-gray-500">
                    البحث عن:{" "}
                    <span className="font-semibold text-blue-600">
                      {searchTerm}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <Table
              className="text-sm sm:text-base mb-0"
              striped
              bordered
              hover
              responsive
            >
              <thead className="bg-gray-50">
                <tr className="text-center">
                  <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                    التاريخ
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                    اسم (الميناء/المطار)
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                    الملاحظات
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                    رقم الطلب
                  </th>
                  {DecodedTokken ? (
                    <>
                      {DecodedTokken.Role === "Admin" ? (
                        <>
                          <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                            بريد صاحب الطلب
                          </th>
                          <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                            اسم صاحب الطلب
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                            الحالة
                          </th>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                        الحالة
                      </th>
                    </>
                  )}
                  <th className="px-3 py-4 text-sm font-semibold text-gray-700">
                    مراحل الطلب
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-8">
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
                    <td
                      colSpan="7"
                      className="px-3 py-8 text-center text-gray-500"
                    >
                      {searchTerm2
                        ? "لا توجد نتائج للبحث"
                        : "لا توجد عروض جارية"}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-3 py-4 text-sm">{order.date}</td>
                      <td className="px-3 py-4 text-sm">{order.location}</td>
                      <td className="px-3 py-4 text-sm">
                        {order.notes == null ? (
                          <span className="text-gray-500">لا توجد ملاحظات</span>
                        ) : (
                          <span>{order.notes}</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium">
                        {order.id}
                      </td>
                      {DecodedTokken ? (
                        <>
                          {DecodedTokken.Role === "Admin" ? (
                            <>
                              <td className="px-3 py-4 text-sm">
                                {order.email}
                              </td>
                              <td className="px-3 py-4 text-sm">
                                {order.fullName}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-3 py-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <button
                                    onClick={() => SendIdSuccses(order.id)}
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                                  >
                                    تنفيذ
                                  </button>
                                  <button
                                    onClick={() => SendIdCancel(order.id)}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                                  >
                                    ألغاء
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-4">
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                onClick={() => SendIdSuccses(order.id)}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                              >
                                تنفيذ
                              </button>
                              <button
                                onClick={() => SendIdCancel(order.id)}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                              >
                                ألغاء
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      <td className="px-3 py-4">
                        <button
                          onClick={() => handleShowDetails(order.id)}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                        >
                          مراحل الطلب
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Modal */}
          <Modal
            className="text-right"
            show={selectedOrder !== null}
            onHide={handleCloseDetails}
            size="lg"
            centered
          >
            <Modal.Header closeButton className="border-b-2 border-gray-200">
              <Modal.Title className="text-xl font-bold text-gray-800">
                تفاصيل الطلب
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-6">
              <div className="space-y-4">
                <Button
                  variant="warning"
                  className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  onClick={GetTrackingstep1}
                >
                  تم إخراج الطلب من الأرضيات
                </Button>

                {Step1 && (
                  <Button
                    variant="info"
                    className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={GetTrackingstep2}
                  >
                    {" "}
                    الطلب تحت الفحص
                  </Button>
                )}

                {Step2 && (
                  <Button
                    variant="success"
                    className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={GetTrackingstep3}
                  >
                    إنهاء الطلب
                  </Button>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer className="border-t-2 border-gray-200 p-4">
              <Button
                variant="secondary"
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={handleCloseDetails}
              >
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "10px",
                padding: "16px",
              },
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
