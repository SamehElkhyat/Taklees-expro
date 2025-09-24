import { useEffect, useState } from "react";
import { Table } from "@mui/material";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

import PaginationComponent from "../../../../Component/shared/PaginationComponent";

export default function HistoryDoneOrder() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder] = useState("newest"); // Removed unused setSortOrder
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [DecodedTokken] = useState(); // Removed unused setDecodedTokken

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleShowDetails = (BrokerId) => {
    setSelectedOrder(BrokerId);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const navigationToLandingpage = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      // Removed unused data assignment
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const getAllInformationBroker = async (BrokerId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
    } catch (error) {
      console.error("Error fetching broker information:", error);
      toast.error("خطأ في جلب بيانات المخلص");
    }
  };

  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Done-Transfer-Orders/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setCustomers(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setCustomers(data);
        setTotalPages(1);
        setTotalOrders(data.length);
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



  useEffect(() => {
    getAllAcceptedOrders(currentPage);
  }, [currentPage]);

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // Filter data based on search term
  const filteredCustomers = sortedCustomers.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          سجل الحوالات المنفذه
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className="w-100 flex items-center justify-end">
          <div className="w-100  max-w-2xl  p-4">
            <div className="flex items-center justify-between border border-[blue]-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (رقم الطلب)"
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

        <Table striped bordered hover className="table">
          <thead>
            <tr className="text-center">
              <th>رقم الطلب</th>
              <th>موقع الطلب</th>
              <th>نوع الطلب</th>
              <th>الحالة</th>
              <th>الملاحظات</th> {/* هذا العمود الجديد */}
              <th>المبلغ</th>
              <th>التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-8">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="mr-2 text-gray-600">جاري التحميل...</span>
                  </div>
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات منفذة"}
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  {console.log(customer.brokerID)}
                  <td>{customer.id}</td>
                  <td>{customer.location}</td>
                  <td>{customer.typeOrder}</td>
                  <td>{customer.statuOrder}</td>
                  <td>{customer.notes}</td>{" "}
                  {/* ملاحظة أو حقل إضافي كما في التصميم الثاني */}
                  <td>{customer.value}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetails(customer.brokerID)}
                    >
                      عرض التفاصيل
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          
        />

        <Modal
          className="text-end"
          show={selectedOrder !== null}
          onHide={handleCloseDetails}
        >
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <p>
                  {selectedOrder.email} <strong>:البريد الإكتروني</strong>
                </p>
                <p>
                  <strong>الاسم:</strong> {selectedOrder.fullName}
                </p>
                <p>
                  <strong>رقم الهويه:</strong> {selectedOrder.identity}
                </p>
                <p>
                  <strong>رقم الهاتف:</strong> {selectedOrder.phoneNumber}
                </p>
                <p>
                  <strong>رخصه المخلص:</strong> {selectedOrder.license}
                </p>
                <p>
                  <strong>الرقم الضريبي:</strong> {selectedOrder.taxRecord}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
}
