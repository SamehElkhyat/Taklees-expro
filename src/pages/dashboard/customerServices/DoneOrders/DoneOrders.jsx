import { useEffect, useState } from "react";
import { Button, TableCell, Box, TextField } from "@mui/material";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import PaginationComponent from "../../../../Component/shared/PaginationComponent.jsx";
import { v4 as uuidv4 } from "uuid";
export default function DoneOrders() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [Bar, setBar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [ImageName, setImageName] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [OrderId, setOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  // Helper functions to avoid bracket notation
  const getObjectProperty = (obj, key) => {
    return Reflect.get(obj, key);
  };

  const setObjectProperty = (obj, key, value) => {
    return { ...obj, [key]: value };
  };

  const baseUrl = process.env.REACT_APP_API_URL_MICROSERVICE2;

  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };
  const GetFileName = async () => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/Get-Name-File-From-CustomerService`,
        {
          newOrderId: OrderId,
        },
        {
          withCredentials: true,
        }
      );

      setIsLoading(false);
      setImageName(data);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const DownloadFilesApi = async (fileUrl) => {
    window.open(fileUrl, "_blank");
  };
  ////////////////////////files //////////////////////
  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const DeleteNotes = async () => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/Delete-Notes-For-Admin`,
        {
          ID: OrderId,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  };
  const getAllInformationBroker = async (BrokerId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          withCredentials: true,
        }
      );
      setSelectedOrder(data);
    } catch (error) {}
  };
  ///////////////////////notes //////////////////////
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => setObjectProperty(prevNotes, id, value));
  };
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => {
      const currentValue = getObjectProperty(prev, id) || false;
      return setObjectProperty(prev, id, !currentValue);
    });
  };
  const ChangeStateNotDone = async (id) => {
    try {
      const noteValue = getObjectProperty(notes, id) || "";
      const request = await axios.post(
        `${baseUrl}/Change-Statu-CustomerService`,
        {
          statuOrder: "false",
          ID: id,
          Notes: noteValue, // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();
    } catch (error) {}
  };
  const ChangeStateDone = async (values) => {
    try {
      const request = await axios.post(
        `${baseUrl}/Change-Statu-CustomerService`,
        {
          statuOrder: "true",
          ID: values,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();
    } catch (error) {}
  };

  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/Get-All-Accept-Orders/${page}`,
        {
          withCredentials: true,
        }
      );

      if (data.data && data.totalPages !== undefined) {
        setCustomers(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const customerData = [
    "رقم الطلب",
    "موقع الطلب",
    "الاسم",
    "الملاحظات",
    "نوع الطلب",
    "بريد الاكتروني",
    "التاريخ",
    "تفاصيل المخلص",
    "تفاصيل الملاحظات",
    "الحاله",
  ];
  // Generate page numbers for pagination

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
    GetFileName();
    getAllAcceptedOrders(currentPage);
  }, [OrderId, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Box width="100%" textAlign="center" p={4}>
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          الطلبات المنفذه
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات المنفذة:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className=" w-100 flex items-center justify-end">
          <div className=" w-100  max-w-2xl  p-4">
            <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                className=" flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 "
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
                {customerData.map((data, index) => (
                  <th align="center" key={uuidv4()}>
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="py-8">
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
                  <td colSpan="10" className="text-center">
                    {searchTerm
                      ? "لا توجد نتائج للبحث"
                      : "لا توجد طلبات منفذة للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer, index) => (
                  <tr style={{ backgroundColor: "#f0f0f0" }} key={customer.id}>               
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.id}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.location}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.fullName}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.notes === "" ? (
                        <>لا يوجد ملاحظات</>
                      ) : (
                        <>{customer.notes}</>
                      )}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.typeOrder}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.email}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.date}
                    </td>
                    <td style={{ backgroundColor: "#f0f0f0" }} align="center">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() =>
                          handleShowDetails(order, customer.brokerID)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                    <td align="center">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() => handleShowBar(index, customer.id)}
                      >
                        عرض تفاصيل الملاحظات
                      </Button>
                    </td>

                    {getObjectProperty(showNoteField, customer.id) && (
                      <Box mt={1}>
                        <TextField
                          label="اكتب ملاحظة"
                          variant="outlined"
                          fullWidth
                          value={getObjectProperty(notes, customer.id) || ""}
                          onChange={(e) =>
                            handleNoteChange(customer.id, e.target.value)
                          }
                          style={{ marginBottom: "10px" }}
                        />
                        <Button
                          onClick={() => ChangeStateNotDone(customer.id)}
                          className="bg-danger text-white"
                        >
                          إرسال الملاحظة
                        </Button>
                      </Box>
                    )}

                    <TableCell
                      style={{ backgroundColor: "#f0f0f0" }}
                      className="p-3"
                      align="center"
                    >
                      <Button
                        onClick={() => toggleNoteField(customer.id)}
                        className="m-1 bg-danger text-white"
                      >
                        لم يتم التنفيذ
                      </Button>
                      <Button
                        onClick={() => ChangeStateDone(customer.id)}
                        className="m-1 bg-success text-white"
                      >
                        تم التنفيذ
                      </Button>
                    </TableCell>
                  </tr>
                ))
              )}

              <Modal
                className="text-end"
                show={selectedOrder !== null}
                onHide={handleCloseDetails}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100">
                    تفاصيل المخلص
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedOrder && (
                    <>
          
                    {Object.entries(selectedOrder).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDetails}>
                    إغلاق
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                className="text-center"
                show={Bar !== null}
                onHide={handleCloseBar}
              >
                {/* رأس المودال مع تصميم مميز */}
                <Modal.Header
                  closeButton
                  className="bg-light rounded-top shadow-sm text-center"
                >
                  <Modal.Title className="fs-3 fw-bold text-primary d-block w-100">
                    تفاصيل ملاحظات{" "}
                    <small className="d-block text-muted fs-6">
                      إدارة الملاحظات والملفات
                    </small>
                  </Modal.Title>
                </Modal.Header>

                {/* جسم المودال مع تنسيق أفضل */}
                <Modal.Body className="p-4 bg-light rounded-bottom text-center">
                  {/* عرض تفاصيل الملاحظات */}
                  <div className="mb-4">
                    <h5 className="text-success fw-bold">الملاحظات</h5>

                    {ImageName.fileName == null ? (
                      <>
                        {" "}
                        <p className="text-muted fs-6">لا توجد ملاحظات</p>
                      </>
                    ) : (
                      <>
                        <p className="text-muted fs-6">{ImageName.notes}</p>

                        <Button
                          onClick={() => DeleteNotes()}
                          className="btn bg-danger text-white"
                        >
                          حذف الملاحظات
                        </Button>
                      </>
                    )}
                  </div>

                  {/* قسم التحميل مع زر مميز */}
                  <div className="d-inline-block">
                    <h5 className="text-success mb-3">
                      <span style={{ color: "red", margin: "10px" }}>
                        {ImageName.fileName == null ? (
                          <>لا يوجد ملف </>
                        ) : (
                          <>{ImageName.fileName}</>
                        )}
                      </span>
                    </h5>
                    {ImageName.fileName == null ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        انتظر قليلا لعرض الملف
                      </>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          onClick={() => DownloadFilesApi(ImageName.fileUrl)}
                          disabled={IsLoading}
                          className="px-4 py-2 rounded-pill shadow"
                        >
                          {IsLoading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              جارٍ التحميل...
                            </>
                          ) : (
                            "عرض الملف"
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </Modal.Body>

                {/* قدم المودال مع زر إغلاق مميز */}
                <Modal.Footer className="bg-light border-0 text-center">
                  <Button
                    variant="danger"
                    onClick={handleCloseBar}
                    className="px-4 py-2 rounded-pill shadow"
                  >
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
