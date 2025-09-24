import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import toast, { Toaster } from "react-hot-toast";

export default function HistoryOfOrders() {
  const [order, setorder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Tracking, setTracking] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [Step1, setStep1] = useState(false);
  const [Step2, setStep2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
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
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
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
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  const HistoryOfAllOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Orders-Brokers/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setorder(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        if (JSON.stringify(data) !== JSON.stringify(order)) {
          setorder(data);
        }
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  useEffect(() => {
    HistoryOfAllOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = order.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <>
      <div className="container mt-5 text-center">
        <h3 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          سجل العروض
        </h3>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className="w-100 flex items-center justify-end">
          <div className="w-100  max-w-2xl  p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
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

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>رقم الطلب</th>
              <th>اسم الميناء</th>
              <th>الملاحظات</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>مراحل الطلب</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-8">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="mr-2 text-gray-600">جاري التحميل...</span>
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
                  <td>{order.id}</td>
                  <td>{order.location}</td>
                  <td>{order.notes}</td>
                  <td>{order.date}</td>
                  <td>
                    <button className="btn bg-success w-100">
                      {order.statuOrder}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleShowDetails(order.id)}
                      className="btn bg-primary w-100"
                    >
                      مراحل الطلب
                    </button>
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
          <Modal.Body className="d-flex flex-column align-items-center gap-3">
            <Button
              variant="warning"
              className="w-100 py-2"
              onClick={GetTrackingstep1}
            >
              تم إخراج الطلب من الأرضيات
            </Button>

            {Step1 && (
              <Button
                variant="info"
                className="w-100 py-2"
                onClick={GetTrackingstep2}
              >
                الطلب تحت الفحص
              </Button>
            )}

            {Step2 && (
              <Button
                variant="success"
                className="w-100 py-2"
                onClick={GetTrackingstep3}
              >
                تم إنهاء الطلب
              </Button>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="secondary"
              className="px-4 py-2"
              onClick={handleCloseDetails}
            >
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Toaster />
    </>
  );
}
