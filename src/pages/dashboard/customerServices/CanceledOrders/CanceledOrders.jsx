import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PaginationComponent from "../../../../Component/shared/PaginationComponent.jsx";
import {
  NoteField,
  SearchBar,
  OrdersCountInfo,
  LoadingTableRow,
  EmptyTableRow,
  StyledTableCell,
} from "../shared/CustomerServiceComponents";
export default function CanceledOrders() {
  const [showNoteField, setShowNoteField] = useState(new Map()); // حالة لإظهار حقل الإدخال عند الحاجة
    // const [showNoteField2, setShowNoteField2] = useState(new Map()); // حالة لإظهار حقل الإدخال عند الحاجة
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState(new Map());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
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

  // Consolidated function to handle status changes with different statuses
  const changeOrderStatus = async (id, statusOrder) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes.get(id) || "",
          statuOrder: statusOrder,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("خطأ في تحديث حالة الطلب");
    }
  };

  // Wrapper functions that maintain the original API
  const sendToBroker = (id) => changeOrderStatus(id, "transfer");
  const ChangeStatueNot = (id) => changeOrderStatus(id, "delete");

  const getCustomers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Refuse-Orders/${page}`,
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
      console.error("Error fetching canceled orders:", error);
      toast.error("خطأ في جلب الطلبات الملغاة");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => {
      const newNotes = new Map(prevNotes);
      newNotes.set(id, value);
      return newNotes;
    });
  };
  // Safe toggle functions - explicit approach instead of generic object injection
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => {
      const newState = new Map(prev);
      newState.set(id, !newState.get(id));
      return newState;
    });
  };
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // Filter data based on search term
  const filteredData = sortedCustomers.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  useEffect(() => {
    getCustomers(currentPage);
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      {" "}
      <Box width="100%" textAlign="center" p={4}>
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          الطلبات الملغاه
        </h1>

        <OrdersCountInfo label="إجمالي الطلبات الملغاة" count={totalOrders} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>رقم الطلب</th>
                <th>الاسم</th>
                <th>الموقع</th>

                <th>البريد الالكتروني</th>
                <th>التاريخ</th>
                <th>تفاصيل المخلص</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <LoadingTableRow colSpan="7" />
              ) : filteredData.length === 0 ? (
                <EmptyTableRow
                  colSpan="7"
                  searchTerm={searchTerm}
                  emptyMessage="لا توجد طلبات ملغاة للعرض"
                />
              ) : (
                filteredData.map((customer) => (
                  <tr style={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                    <StyledTableCell>{customer.id}</StyledTableCell>
                    <StyledTableCell>{customer.fullName}</StyledTableCell>
                    <StyledTableCell>{customer.location}</StyledTableCell>
                    <StyledTableCell>{customer.email}</StyledTableCell>
                    <StyledTableCell>{customer.date}</StyledTableCell>
                    <StyledTableCell className="p-3">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() =>
                          handleShowDetails(order, customer.brokerID)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                    </StyledTableCell>

                    <StyledTableCell className="p-3">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() =>
                          handleShowDetails(order, customer.brokerID)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                    </StyledTableCell>

                    <Button
                      onClick={() => toggleNoteField(customer.id)}
                      className="bg-danger text-white"
                      style={{ marginRight: "10px" }}
                    >
                      إلغاء
                    </Button>
                    <NoteField
                      isVisible={showNoteField.get(customer.id)}
                      customerId={customer.id}
                      noteValue={notes.get(customer.id) || ""}
                      onNoteChange={handleNoteChange}
                      onSubmit={ChangeStatueNot}
                    />

                    <NoteField
                      // isVisible={showNoteField2.get(customer.id)}
                      customerId={customer.id}
                      noteValue={notes.get(customer.id) || ""}
                      onNoteChange={handleNoteChange}
                      onSubmit={sendToBroker}
                    />
                  </tr>
                ))
              )}

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
                        <strong>الرقم الضريبي:</strong>{" "}
                        {selectedOrder.taxRecord}
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
    </motion.div>
  );
}
