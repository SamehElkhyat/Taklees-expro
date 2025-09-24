import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import PaginationComponent from "../../../../Component/shared/PaginationComponent.jsx";
import {
  StyledTableCell,
  SearchBar,
  OrdersCountInfo,

} from "../shared/CustomerServiceComponents";
import toast, { Toaster } from "react-hot-toast"; 
import { v4 as uuidv4 } from "uuid";
export default function AllOrderDeleted() {
  const [DecodedTokken, setDecodedTokken] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  const getAllDeletedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Deleted-Orders/${page}`,
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
    getAllDeletedOrders(currentPage);
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
          الطلبات المحذوفه
        </h1>

        <OrdersCountInfo label="إجمالي الطلبات المحذوفة" count={totalOrders} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>رقم الطلب</th>
                <th>الموقع</th>
                <th>الملاحظات</th>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken === "Admin" ? (
                      <>
                        <th>خدمه العملاء</th>
                        <th>بريد خدمه العملاء</th>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <th>نوع الطلب</th>
                <th>التاريخ</th>
                <th>حاله الطلب</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={DecodedTokken === "Admin" ? 8 : 6}
                    className="py-8"
                  >
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
                    colSpan={DecodedTokken === "Admin" ? 8 : 6}
                    className="text-center"
                  >
                    {searchTerm
                      ? "لا توجد نتائج للبحث"
                      : "لا توجد طلبات محذوفة للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer) => (
                  <tr key={uuidv4()} className="bg-light">
                    <StyledTableCell>{customer.id}</StyledTableCell>
                    <StyledTableCell>{customer.location}</StyledTableCell>
                    <StyledTableCell>{customer.notes}</StyledTableCell>
                    {DecodedTokken ? (
                      <>
                        {DecodedTokken === "Admin" ? (
                          <>
                            <StyledTableCell>
                              {customer.customerServiceEmail}
                            </StyledTableCell>
                            <StyledTableCell>
                              {customer.customerServiceName}
                            </StyledTableCell>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <StyledTableCell>{customer.typeOrder}</StyledTableCell>

                    <StyledTableCell>{customer.date}</StyledTableCell>
                    <StyledTableCell>
                      <StyledTableCell>
                        <Button className="bg-danger text-white p-2">
                          {customer.statuOrder}
                        </Button>
                      </StyledTableCell>
                    </StyledTableCell>
                  </tr>
                ))
              )}

              {/* Modal */}
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

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
      <Toaster />
    </motion.div>
  );
}
