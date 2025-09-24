import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ModuleOrderDetails from "../../../../Component/shared/Module/ModuleOrderDetails.jsx";
import SendNotesmodule from "../../../../Component/shared/Module/SendNotesmodule.jsx";
import PaginationComponent from "../../../../Component/shared/PaginationComponent.jsx";
import { 
  NoteField, 
  StyledTableCell, 
  SearchBar, 
  OrdersCountInfo, 
  LoadingTableRow, 
  EmptyTableRow 
} from "../shared/CustomerServiceComponents";

export default function AllOrderTransfers() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNoteField, setShowNoteField] = useState(new Map()); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState(new Map()); // حالة لتخزين الملاحظات لكل طلب
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState();
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
  //>>>>>>>>>>>>>>>>BAR>>>>>>>>>>>//
  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setorder(data.data.id);

      setDecodedTokken(data.data.role);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
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
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => {
      const newNotes = new Map(prevNotes);
      newNotes.set(id, value);
      return newNotes;
    });
  };

  const toggleNoteField = (id) => {
    setShowNoteField((prev) => {
      const newShowNoteField = new Map(prev);
      newShowNoteField.set(id, !newShowNoteField.get(id));
      return newShowNoteField;
    });
  };

  const ChangeState = async (id, statusOrder) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService`,
        {
          statuOrder: statusOrder,
          ID: id,
          Notes: notes.get(id) || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم ارسال الملاحظات");
      getAllAcceptedOrders();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };
  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Transfer-From-Account/${page}`,
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
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
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
    getAllAcceptedOrders(currentPage);
    navigationToLandingpage();
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Box width="100%" textAlign="center" p={4}>
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          الطلبات المحوله
        </h1>

        <OrdersCountInfo 
          label="إجمالي الطلبات المحولة" 
          count={totalOrders} 
        />

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>رقم الطلب</th>
                <th>موقع الطلب</th>
                <th>الملاحظات</th>
                <th>اضافه مرفقات</th>

                <th>الاسم</th>
                <th>نوع الطلب</th>

                {DecodedTokken ? (
                  <>
                    {DecodedTokken === "Admin" ? (
                      <>
                        <th>المحاسب</th>
                        <th>بريد المحاسب</th>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <th>البريد الالكتروني</th>
                <th>التاريخ</th>
                <th>تفاصيل المخلص</th>
                <th>الحاله</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <LoadingTableRow colSpan={DecodedTokken === "Admin" ? 12 : 10} />
              ) : filteredData.length === 0 ? (
                <EmptyTableRow 
                  colSpan={DecodedTokken === "Admin" ? 12 : 10}
                  searchTerm={searchTerm}
                  emptyMessage="لا توجد طلبات محولة للعرض"
                />
              ) : (
                filteredData.map((customer) => (
                  <tr style={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                    <StyledTableCell>{customer.id}</StyledTableCell>
                    <StyledTableCell>{customer.location}</StyledTableCell>
                    <StyledTableCell>{customer.notes}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() =>
                          handleShowBar(customer.notes, customer.id)
                        }
                      >
                        اضافه ملفات
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>{customer.fullName}</StyledTableCell>
                    <StyledTableCell>{customer.typeOrder}</StyledTableCell>
                    {DecodedTokken ? (
                      <>
                        {DecodedTokken === "Admin" ? (
                          <>
                            <StyledTableCell>{customer.accountName}</StyledTableCell>
                            <StyledTableCell>{customer.accountEmail}</StyledTableCell>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <StyledTableCell>{customer.email}</StyledTableCell>
                    <StyledTableCell>{customer.date}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() =>
                          handleShowDetails(order, customer.brokerID)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                    </StyledTableCell>
                    <NoteField
                      isVisible={showNoteField.get(customer.id)}
                      customerId={customer.id}
                      noteValue={notes.get(customer.id) || ""}
                      onNoteChange={handleNoteChange}
                      onSubmit={(id) => ChangeState(id, "false")}
                    />
                    <StyledTableCell className="p-3">
                      <Button
                        onClick={() => toggleNoteField(customer.id)}
                        className="m-1 bg-danger text-white"
                      >
                        تحويل الي المخلص
                      </Button>
                      <Button
                        onClick={() => ChangeState(customer.id, "true")}
                        className="m-1 bg-success text-white"
                      >
                        تحويل الي المحاسب
                      </Button>
                    </StyledTableCell>
                  </tr>
                ))
              )}

              <ModuleOrderDetails
                selectedOrder={selectedOrder}
                handleCloseDetails={handleCloseDetails}
              />

              <SendNotesmodule
                Bar={Bar}
                handleCloseBar={handleCloseBar}
                OrderId={OrderId}
              />
            </tbody>
          </table>
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Toaster />
      </Box>
    </motion.div>
  );
}
