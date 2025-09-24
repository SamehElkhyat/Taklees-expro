import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Row, Modal, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const MiniAreaChart = ({ color = "#8884d8", data }) => (
  <ResponsiveContainer width="100%" height={50}>
    <AreaChart data={data}>
      <defs>
        <linearGradient
          id={`chartGradient-${color}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor="#FF797B" stopOpacity={1.2} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        stroke={color}
        fill={`url(#chartGradient-${color})`}
        strokeWidth={2}
        dot={false}
      />
      <Tooltip content={null} />
    </AreaChart>
  </ResponsiveContainer>
);

MiniAreaChart.propTypes = {
  color: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const InfoCard = ({
  iconClass,
  title,
  value,
  chartData,
  iconColor = "#8884d8",
}) => (
  <Card className="p-3 position-relative">
    <Card.Body>
      <div className="position-absolute">
        <i
          className={`fa-3x mb-2 ${iconClass}`}
          style={{ color: iconColor }}
        ></i>
      </div>
      <p
        className="text-end font-bold mb-2"
        style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)" }}
      >
        {title}
      </p>
      <div className="card-body text-center">
        <p className="display-6 sm:display-5 fw-bold">{value ?? 0}</p>
      </div>
      <div className="h-10 mt-2">
        <MiniAreaChart data={chartData} color={iconColor} />
      </div>
    </Card.Body>
  </Card>
);

InfoCard.propTypes = {
  iconClass: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const WalletInfo = ({ currentPage }) => {
  const [InfoOrders, setInfoOrders] = useState({});
  // Generate predictable dummy chart data for visualization (not security-sensitive)
  const dummyChart = Array.from({ length: 10 }, (_, index) => ({
    value: 10 + (index % 3) * 5 + ((index * 7) % 11), // Predictable pattern for charts
  }));

  WalletInfo.propTypes = {
    currentPage: PropTypes.number.isRequired,
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Count-Accept-Failed-Wait-Orders-Broker/${currentPage}`,
          { withCredentials: true }
        );
        setInfoOrders(data);
      } catch (error) {
        console.log(error);
        toast.error("حدث خطأ أثناء تحميل البيانات");
      }
    };
    fetchInfo();
  }, [currentPage]);

  const orderStats = [
    {
      iconClass: "fas fa-times-circle",
      iconColor: "#E31D1D",
      title: "عدد الطلبات الملغاه",
      value: InfoOrders.failedOrder,
    },
    {
      iconClass: "fas fa-clock",
      iconColor: "orange",
      title: "عدد الطلبات المنتظره",
      value: InfoOrders.waitOrder,
    },
    {
      iconClass: "fas fa-check-circle",
      iconColor: "#76C248",
      title: "عدد الطلبات الناجحه",
      value: InfoOrders.acceptOrder,
    },
  ];

  const paymentStats = [
    {
      title: "المبالغ التي لم يتم تحويلها",
      iconColor: "#E31D1D",
      value: InfoOrders.totalFailedRequests,
    },
    {
      title: "المبالغ المنتظره",
      iconColor: "orange",
      value: InfoOrders.totalWaitRequests,
    },
    {
      title: "المبالغ التي تم تحويلها",
      iconColor: "var(--succsses--)",
      value: InfoOrders.totalSuccessfulRequests,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.7 } }}
    >
      <Row className="m-2 gap-4">
        <p className="text-end text-[var(--secondColor--)] font-bold text-xl p-2">
          حاله الطلبات
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          {orderStats.map((stat) => (
            <InfoCard key={stat.title} {...stat} chartData={dummyChart} />
          ))}
        </div>

        <p className="text-end text-[var(--secondColor--)] font-bold text-xl p-2">
          حاله المدفوعات
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          {paymentStats.map((stat) => (
            <InfoCard
              key={stat.title}
              iconClass="fa-solid fa-sack-dollar"
              {...stat}
              chartData={dummyChart}
            />
          ))}
        </div>
      </Row>
    </motion.div>
  );
};

const Portfolio = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Wallet/${page}`,
        { withCredentials: true }
      );
      if (data.data && data.totalPages !== undefined) {
        setOrders(data.data);
        setTotalPages(data.totalPages);
        setTotalOrders(data.totalOrders);
      } else {
        setOrders(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
      toast.error("فشل تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const filteredOrders = orders.filter(
    (order) => searchTerm === "" || order.id.includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.7 } }}
    >
      <div className="container mt-4 p-3 sm:p-4">
        <WalletInfo currentPage={currentPage} />

        <div className="mb-4 text-center text-white">
          إجمالي الطلبات:{" "}
          <span className="font-bold text-blue-300">{totalOrders}</span>
        </div>

        <div className="w-full flex justify-end mb-3">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (رقم الطلب)"
                className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400"
              />
              <div className="flex items-center gap-2 text-black">
                <span className="font-medium">بحث</span>
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

        <div className="overflow-x-auto">
          <Table striped bordered hover className="text-sm sm:text-base">
            <thead>
              <tr>
                {[
                  "رقم الطلب",
                  "موقع الطلب",
                  "نوع الطلب",
                  "الملاحظات",
                  "الحالة",
                  "المبلغ",
                  "التفاصيل",
                ].map((title) => (
                  <th key={uuidv4()} className="text-center">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (loading) {
                  return [
                    <tr key="loading">
                      <td colSpan="7" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
                          جاري التحميل...
                        </div>
                      </td>
                    </tr>
                  ];
                }

                if (filteredOrders.length === 0) {
                  return [
                    <tr key="no-data">
                      <td colSpan="7" className="text-center">
                        {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات للعرض"}
                      </td>
                    </tr>
                  ];
                }

                return filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.location}</td>
                    <td>{order.typeOrder}</td>
                    <td>{order.notes}</td>
                    <td>{order.statuOrder}</td>
                    <td>{order.value} ريال</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => setSelectedOrder(order)}
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </Table>
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <Modal
          show={!!selectedOrder}
          onHide={() => setSelectedOrder(null)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <p>
                  <strong>رقم الطلب:</strong> {selectedOrder.id}
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
            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default Portfolio;
