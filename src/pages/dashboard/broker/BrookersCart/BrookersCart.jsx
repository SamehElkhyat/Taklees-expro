import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Row, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";
import { toast } from "react-hot-toast";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import PropTypes from "prop-types";

// Extracted OrderCard component
const OrderCard = ({ iconClass, title, value, gradientId, chartData }) => {
  return (
    <Card className="p-3">
      <Card.Body>
        <div className="position-absolute">
          <i
            className={`${iconClass} text-[clamp(24px, 5vw, 30px)] fa-3x mb-2`}
          ></i>
        </div>
        <p className="text-end font-bold mb-2 text-[clamp(1rem, 3vw, 1.2rem)]">
          {title}
        </p>
        <div className="card-body text-center">
          <p className="display-6 sm:display-5 fw-bold">{value}</p>
        </div>
        <div className="h-10 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#FF797B" stopOpacity={1.2} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill={`url(#${gradientId})`}
                strokeWidth={2}
                dot={false}
              />
              <Tooltip content={null} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

OrderCard.propTypes = {
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gradientId: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Extracted WalletInfo component
const WalletInfo = ({ orderStats, chartData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Row className="flex flex-col w-full m-2 sm:m-4 gap-4">
        <p className="text-end text-[var(--secondColor--)] font-bold text-lg sm:text-xl p-2">
          حاله الطلبات
        </p>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          {orderStats.map((stat, index) => (
            <div key={stat.title} className="w-full md:w-1/3">
              <OrderCard
                iconClass={stat.iconClass}
                title={stat.title}
                value={stat.value}
                gradientId={`gradient-${index}`}
                chartData={chartData}
              />
            </div>
          ))}
        </div>
      </Row>
    </motion.div>
  );
};

WalletInfo.propTypes = {
  orderStats: PropTypes.arrayOf(
    PropTypes.shape({
      iconClass: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const BrookersCart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  // SECURITY: Define allowlisted base URLs and validation functions
  const ALLOWED_BASE_URLS = {
    WALLET_API: "https://user.runasp.net/api/Wallet",
    MICROSERVICE_BASE: process.env.REACT_APP_API_URL_MICROSERVICE2,
  };

  // SECURITY: Validate and sanitize page parameter
  const validatePageParameter = (page) => {
    const pageNum = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 10000) {
      return 1; // Default to page 1 for invalid input
    }
    return pageNum;
  };

  // SECURITY: Construct safe URL with validated parameters
  const constructSafeWalletUrl = (page) => {
    const safePage = validatePageParameter(page);
    // Validate the page is within acceptable bounds
    if (safePage < 1 || safePage > 10000) {
      throw new Error("Page parameter out of valid range");
    }
    return `${ALLOWED_BASE_URLS.WALLET_API}/${safePage}`;
  };

  // State for wallet information
  const [InfoOrders, setInfoOrders] = useState({});

  const InformationAboutOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Count-Accept-Failed-Wait-Orders-Broker`,
        { withCredentials: true }
      );
      setInfoOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  // Chart data for components
  const chartData = [
    { value: 8 },
    { value: 4 },
    { value: 5 },
    { value: 10 },
    { value: 6 },
    { value: 8 },
    { value: 8 },
    { value: 20 },
    { value: 8 },
    { value: 8 },
    { value: 34 },
  ];

  // Order statistics for WalletInfo component
  const orderStats = [
    {
      iconClass: "fas fa-times-circle text-[#E31D1D]",
      title: "عدد الطلبات الملغاه",
      value: InfoOrders.failedOrder,
    },
    {
      iconClass: "fas fa-clock text-[orange]", 
      title: "عدد الطلبات المنتظره",
      value: InfoOrders.waitOrder,
    },
    {
      iconClass: "fas fa-check-circle text-[#76C248]",
      title: "عدد الطلبات الناجحه", 
      value: InfoOrders.acceptOrder,
    },
    {
      iconClass: "fa-solid fa-sack-dollar text-[#E31D1D]",
      title: "المبالغ التي لم يتم تحويلها",
      value: InfoOrders.totalFailedRequests,
    },
    {
      iconClass: "fa-solid fa-sack-dollar text-[orange]",
      title: "المبالغ المنتظره",
      value: InfoOrders.totalWaitRequests,
    },
    {
      iconClass: "fa-solid fa-sack-dollar text-[var(--succsses--)]",
      title: "المبالغ التي تم تحويلها",
      value: InfoOrders.totalSuccessfulRequests,
    },
  ];

  useEffect(() => {
    InformationAboutOrder();
  }, []);

  const allOrders = async (page = 1) => {
    setLoading(true);
    try {
      // SECURITY: Use safe URL construction with validation
      const safeUrl = constructSafeWalletUrl(page);

      const { data } = await axios.get(safeUrl, {
        withCredentials: true,
        timeout: 30000, // Add timeout
        maxRedirects: 0, // Prevent redirects
      });

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setOrders(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setOrders(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.error("Failed to fetch wallet orders:", error.message);
      toast.error("فشل في تحميل بيانات المحفظة");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // إغلاق نافذة التفاصيل
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // Handle page change
  const handlePageChange = (page) => {
    // SECURITY: Validate page parameter before setting state
    const validatedPage = validatePageParameter(page);
    setCurrentPage(validatedPage);
  };

  useEffect(() => {
    allOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = orders.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <div className="container mt-3 sm:mt-4 md:mt-5 p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <WalletInfo orderStats={orderStats} chartData={chartData} />

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className="w-full flex items-center justify-end">
          <div className="w-full max-w-2xl p-2 sm:p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (رقم الطلب)"
                className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
              />
              <div className="flex items-center gap-2 text-black">
                <span className="text-base sm:text-lg font-medium">بحث</span>
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

        <div className="overflow-x-auto">
          <Table striped bordered hover className="text-sm sm:text-base">
            <thead>
              <tr>
                <th className="text-xs sm:text-sm md:text-base">رقم الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">موقع الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">نوع الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">الحالة</th>
                <th className="text-xs sm:text-sm md:text-base">المبلغ</th>
                <th className="text-xs sm:text-sm md:text-base">التفاصيل</th>
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
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((order) => (
                  <tr key={order.id}>
                    <td className="text-xs sm:text-sm md:text-base">
                      {order.id}
                    </td>
                    <td className="text-xs sm:text-sm md:text-base">
                      {order.location}
                    </td>
                    <td className="text-xs sm:text-sm md:text-base">
                      {order.typeOrder}
                    </td>
                    <td className="text-xs sm:text-sm md:text-base">
                      {order.statuOrder}
                    </td>
                    <td className="text-xs sm:text-sm md:text-base">
                      {order.value} ريال
                    </td>
                    <td className="text-xs sm:text-sm md:text-base">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowDetails(order)}
                        className="text-xs sm:text-sm"
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination Component */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* نافذة تفاصيل الطلب */}
        <Modal
          show={selectedOrder !== null}
          onHide={handleCloseDetails}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-sm sm:text-base md:text-lg">
              تفاصيل الطلب
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-sm sm:text-base">
            {selectedOrder && (
              <>
                <p>
                  <strong>رقم الطلب:</strong> {selectedOrder.iDstring}
                </p>
                <p>
                  <strong>موقع الطلب:</strong> {selectedOrder.location}
                </p>
                <p>
                  <strong>نوع الطلب:</strong> {selectedOrder.typeOrder}
                </p>
                <p>
                  <strong>الحالة:</strong> {selectedOrder.statuOrder}
                </p>
                <p>
                  <strong>المبلغ:</strong> {selectedOrder.value} ريال
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseDetails}
              className="text-sm sm:text-base"
            >
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </div>
  );
};

export default BrookersCart;
