import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import toast from "react-hot-toast";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import NotesForm from "../../../../Component/shared/NotesForm";
import { useOrderStatusActions, OrderActionButtons } from "../../../../Component/shared/OrderStatusActions";
import SearchInput from "../../../../Component/shared/SearchInput";
import OrdersCountInfo from "../../../../Component/shared/OrdersCountInfo";
import PageHeader from "../../../../Component/shared/PageHeader";

export default function TransferOrders() {
  const [CustomersOrders, setCustomersOrders] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [DecodedTokken, setDecodedTokken] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  // Use shared order status actions hook
  const { executeOrder, cancelOrder } = useOrderStatusActions(
    `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
    () => getCustomersOrders(currentPage)
  );

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      formik.setFieldValue("formFile", e.target.files[0]);
    }
  };

  const handleShowBar = (items, orderdid) => {
    setOrderId(orderdid);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const getCustomersOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Order-Transfer-From-CustomerService/${page}`,
        {
          withCredentials: true,
        }
      );
      
      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setCustomersOrders(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setCustomersOrders(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const SendFile = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("formFile", values.formFile); // تعيين الملف الصحيح
    formData.append("Notes", values.Notes);
    formData.append("newOrderId", OrderId);
    // التأكد من إرسال OrderId الصحيح

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Notes-From-CustomerService`,
        formData,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      toast.success("تم تقديم الملاحظات بنجاح");
      setBar(null);
    } catch (error) {
      
      setIsLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      Notes: "",
      formFile: "",
    },
    onSubmit: SendFile,
  });

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getCustomersOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = CustomersOrders.filter((order) => {
    return searchTerm3 === "" || order.id.includes(searchTerm3);
  });

  return (
    <>
      <PageHeader 
        title="عروض تم تحويلها من خدمه العملاء" 
        className="font-bold text-[var(--secondColor--)] text-end text-2xl mt-5 p-3"
      />
      
      <OrdersCountInfo totalCount={totalOrders} />

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="ابحث عن طلب (رقم الطلب)"
      />

      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>التاريخ</th>
            <th>الملاحظات</th>
            <th>اسم (الميناء/المطار)</th>
            <th>رقم الطلب</th>
            {DecodedTokken ? (
              <>
                {DecodedTokken.Role === "Admin" ? (
                  <>
                    <th>بريد المخلص</th>
                    <th>اسم المخلص</th>
                    <th>بريد خدمه العملاء</th>
                    <th>خدمه العملاء</th>
                  </>
                ) : (
                  <>
                    <th>الحالة</th>
                  </>
                )}
              </>
            ) : (
              <>
                <th>الحالة</th>
              </>
            )}
            <th>إضافه ملاحظات</th>
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
                {searchTerm3 ? "لا توجد نتائج للبحث" : "لا توجد عروض تم تحويلها من خدمه العملاء"}
              </td>
            </tr>
          ) : (
            filteredData.map((order) => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>
                  {order.notes == null ? (
                    <>لا توجد ملاحظات</>
                  ) : (
                    <>{order.notes}</>
                  )}
                </td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken.Role === "Admin" ? (
                      <>
                        <td>{order.brokerEmail}</td>
                        <td>{order.brokerName}</td>
                        <td>{order.customerServiceEmail}</td>
                        <td>{order.customerServiceName}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          <OrderActionButtons
                            orderId={order.id}
                            onExecute={executeOrder}
                            onCancel={cancelOrder}
                          />
                        </td>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <td>
                      <OrderActionButtons
                        orderId={order.id}
                        onExecute={executeOrder}
                        onCancel={cancelOrder}
                      />
                    </td>
                  </>
                )}

                <td>
                  <button
                    onClick={() => handleShowBar(order.notes, order.id)}
                    className="btn bg-primary w-100"
                  >
                    إضافه ملاحظات
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal className="text-end" show={Bar !== null} onHide={handleCloseBar}>
        <Modal.Header
          closeButton
          className="bg-primary text-white text-center"
          style={{ borderRadius: "8px 8px 0 0", padding: "15px" }}
        >
          <Modal.Title className="w-100 fs-5">تقديم الملاحظات</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-4 bg-light"
          style={{ borderRadius: "0 0 8px 8px" }}
        >
          <NotesForm 
            formik={formik}
            isLoading={IsLoading}
            onFileChange={handleFileChange}
          />
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={handleCloseBar}
            className="fw-bold shadow-sm px-4"
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
