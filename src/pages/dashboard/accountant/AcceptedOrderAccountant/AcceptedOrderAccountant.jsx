import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import LoadingButton from "../../../../Component/shared/LoadingButton";
import { useOrderManagement } from "../../../../hooks/useOrderManagement";
import { useDataProcessing } from "../../../../hooks/useDataProcessing";
import PageWrapper from "../../../../Component/shared/PageWrapper";
import SearchBar from "../../../../Component/shared/SearchBar";
import OrdersCountInfo from "../../../../Component/shared/OrdersCountInfo";
import PageHeader from "../../../../Component/shared/PageHeader";
import "../../../../Component/shared/TableStyles.css";
import toast from "react-hot-toast";
export default function AcceptedOrderAccountant() {
  const [customers, setCustomers] = useState([]);
  const [order, setorder] = useState({});
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [ImageName, setImageName] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [DecodedTokken, setDecodedTokken] = useState();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  // Use the custom hook for order management
  const {
    selectedOrder,
    setSelectedOrder,
    getAllInformationBroker,
    handleNoteChange,
    toggleNoteField,
    getNote,
    isNoteFieldVisible,
  } = useOrderManagement();

  // Use the custom hook for data processing
  const { filteredCustomers } = useDataProcessing(customers, searchTerm, "id");

  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
      setorder(data.data.id);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const GetFileName = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Name-File-From-CustomerService`,
        {
          newOrderId: OrderId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      setIsLoading(false);
      setImageName(data);
    } catch (error) {
      console.error("خطأ:", error);
      setIsLoading(false);
      toast.error("حدث خطأ أثناء التحميل.");
    }
  };

  const DownloadFilesApi = async (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  // دالة تغيير الحالة وإرسال الملاحظات
  const ChangeStateNot = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "false",
          ID: id,
          Notes: getNote(id), // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders(currentPage); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("خطأ:", error);
      setIsLoading(false);
      toast.error("حدث خطأ أثناء تحديث الطلب.");
    }
  };

  // دالة تغيير الحالة إلى "تم التحويل"
  const ChangeStatedone = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "true",
          ID: id,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحويل الطلب بنجاح");
      getAllAcceptedOrders(currentPage); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("خطأ:", error);
      setIsLoading(false);
      toast.error("حدث خطأ أثناء تحويل الطلب.");
    }
  };

  // جلب جميع الطلبات المقبولة مع pagination
  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Done-Accept-Orders/${page}`,
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
      console.error("خطأ:", error);
      setIsLoading(false);
      toast.error("حدث خطأ أثناء تحميل الطلبات.");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render table body content based on loading and data state
  const renderTableBody = () => {
    const colSpanCount = DecodedTokken && DecodedTokken === "Admin" ? 11 : 9;

    if (loading) {
      return [
        <tr key="loading">
          <td colSpan={colSpanCount} className="py-8">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="mr-2 text-gray-600">جاري التحميل...</span>
            </div>
          </td>
        </tr>
      ];
    }

    if (filteredCustomers.length === 0) {
      const emptyMessage = searchTerm
        ? "لا توجد نتائج للبحث"
        : "لا توجد طلبات مقبولة";
      return [
        <tr key="empty">
          <td colSpan={colSpanCount} className="text-center">
            {emptyMessage}
          </td>
        </tr>
      ];
    }

    return filteredCustomers.map((customer, index) => (
      <tr key={customer.id}>
        <td className="table-data-cell">{customer.id}</td>
        <td className="table-data-cell">{customer.location}</td>
        <td className="table-data-cell">{customer.fullName}</td>
        <td className="table-data-cell">{customer.typeOrder}</td>
        <td className="table-data-cell">{customer.email}</td>
        <td className="table-data-cell">{customer.value}</td>
        {DecodedTokken && DecodedTokken === "Admin" && (
          <>
            <td className="table-data-cell">{customer.customerServiceName}</td>
            <td className="table-data-cell">{customer.customerServiceEmail}</td>
          </>
        )}
        <td className="table-data-cell">{customer.date}</td>
        <td className="table-action-cell">
          <Button
            className="bg-primary text-white p-1 sm:p-2 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => handleShowDetails(order, customer.brokerID)}
          >
            عرض التفاصيل
          </Button>
        </td>
        <td className="table-action-cell">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => toggleNoteField(customer.id)}
              className="bg-danger text-white text-xs sm:text-sm w-full sm:w-auto"
            >
              لم يتم التحويل
            </Button>

            {isNoteFieldVisible(customer.id) && (
              <Box mt={1} className="w-full">
                <TextField
                  label="اكتب ملاحظة"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={getNote(customer.id)}
                  onChange={(e) =>
                    handleNoteChange(customer.id, e.target.value)
                  }
                  sx={{ marginBottom: "10px" }}
                />
                <Button
                  onClick={() => ChangeStateNot(customer.id)}
                  className="bg-danger text-white text-xs sm:text-sm w-full"
                >
                  إرسال الملاحظة
                </Button>
              </Box>
            )}

            <Button
              onClick={() => ChangeStatedone(customer.id)}
              className="bg-success text-white text-xs sm:text-sm w-full sm:w-auto"
            >
              تم التحويل
            </Button>
          </div>
        </td>
        <td className="table-action-cell">
          <Button
            className="bg-primary text-white p-1 sm:p-2 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => handleShowBar(index, customer.id)}
          >
            عرض تفاصيل الملاحظات
          </Button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    if (OrderId == null) {
      return;
    } else {
      GetFileName();
    }
  }, [OrderId]);

  useEffect(() => {
    getAllAcceptedOrders(currentPage);
    navigationToLandingpage();
  }, [currentPage]);

  return (
    <PageWrapper>
      <div className="container px-4 sm:px-6 lg:px-8">
        <PageHeader title="قائمه الحوالات للمخلصين" />

        <OrdersCountInfo totalOrders={totalOrders} />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="ابحث عن طلب (رقم الطلب)"
        />

        {/* Responsive Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <Table
            className="table text-sm sm:text-base"
            striped
            bordered
            hover
            style={{ marginTop: "10px", width: "100%", minWidth: "800px" }}
          >
            <thead>
              <tr>
                <th className="table-header-cell">رقم الطلب</th>
                <th className="table-header-cell">موقع الطلب</th>
                <th className="table-header-cell">الاسم</th>
                <th className="table-header-cell">نوع الطلب</th>
                <th className="table-header-cell">البريد الالكتروني</th>
                <th className="table-header-cell">المبلغ</th>
                {DecodedTokken && DecodedTokken === "Admin" && (
                  <>
                    <th className="table-header-cell">خدمه العملاء</th>
                    <th className="table-header-cell">بريد خدمه العملاء</th>
                  </>
                )}
                <th className="table-header-cell">التاريخ</th>
                <th className="table-header-cell">تفاصيل المخلص</th>
                <th className="table-header-cell">الحالة</th>
                <th className="table-header-cell">الملفات</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </Table>
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPageInfo={true}
        />

        {/* Responsive Modal for order details */}
        <Modal
          className="text-end"
          show={selectedOrder !== null}
          onHide={handleCloseDetails}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-base sm:text-lg lg:text-xl">
              تفاصيل الطلب
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3 sm:p-4">
            {selectedOrder && (
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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
              </div>
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

        {/* Responsive Modal for file details */}
        <Modal
          className="text-center"
          show={Bar !== null}
          onHide={handleCloseBar}
          size="lg"
          centered
        >
          <Modal.Header
            closeButton
            className="bg-light rounded-top shadow-sm text-center"
          >
            <Modal.Title className="fs-4 sm:fs-3 fw-bold text-primary d-block">
              تفاصيل الطلب
              <br />
              <small className="d-block text-muted fs-6 sm:fs-6">
                إدارة الطلبات
              </small>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-3 sm:p-4 bg-light rounded-bottom text-center">
            <div className="mb-3 sm:mb-4">
              <h5 className="text-success fw-bold text-base sm:text-lg">
                الملاحظات
              </h5>
              <br />
              <p className="text-muted fs-6 sm:fs-6">{ImageName.notes}</p>
            </div>

            <div className="d-inline-block">
              <h5 className="text-success mb-2 sm:mb-3 text-base sm:text-lg">
                تحميل الملف
                <br />
                <span
                  style={{
                    color: "red",
                    margin: "5px",
                    fontSize: "clamp(0.75rem, 2vw, 1rem)",
                  }}
                >
                  {ImageName.fileName}
                </span>
              </h5>

              <LoadingButton
                variant="success"
                onClick={() => DownloadFilesApi(ImageName.fileUrl)}
                isLoading={IsLoading}
                loadingText="جارٍ التحميل..."
              >
                عرض الملف
              </LoadingButton>
            </div>
          </Modal.Body>

          <Modal.Footer className="bg-light border-0 text-center">
            <Button
              variant="danger"
              onClick={handleCloseBar}
              className="px-3 sm:px-4 py-2 rounded-pill shadow text-sm sm:text-base"
            >
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </PageWrapper>
  );
}
