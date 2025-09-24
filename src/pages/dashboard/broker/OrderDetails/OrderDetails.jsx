import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

// ✅ مكون TableRow لتقليل التكرار في عرض المعلومات
const TableRow = ({ label, value, condition = true }) => {
  if (!condition || !value) return null;
  return (
    <tr className="flex flex-col">
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  );
};

TableRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  condition: PropTypes.bool,
};

// ✅ مكون StarRating لعرض التقييم
const StarRating = ({ count }) => {
  const getStarRating = (count) => {
    if (count === 0) return { filled: 0, empty: 5 };
    if (count > 0 && count <= 5) return { filled: 1, empty: 4 };
    if (count > 5 && count <= 25) return { filled: 2, empty: 3 };
    if (count > 25 && count <= 50) return { filled: 3, empty: 2 };
    if (count > 50 && count <= 100) return { filled: 4, empty: 1 };
    if (count > 100) return { filled: 5, empty: 0 };
    return { filled: 0, empty: 5 };
  };

  const { filled, empty } = getStarRating(count);

  return (
    <span className="text-warning">
      {Array(filled).fill().map((_, i) => (
        <i key={`filled-star-${count}-${i}`} className="fas fa-star"></i>
      ))}
      {Array(empty).fill().map((_, i) => (
        <i key={`empty-star-${count}-${i}`} className="far fa-star"></i>
      ))}
    </span>
  );
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
};

// ✅ مكون SearchBar 
const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="w-100 flex items-center justify-end mb-4">
    <div className="w-100 max-w-2xl p-4">
      <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="ابحث في العروض (رقم المعرف، عدد الطلبات)"
          className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400"
        />
        <div className="flex items-center gap-2 text-black">
          <span className="text-lg font-medium">بحث</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

// ✅ مكون Pagination
const PaginationComponent = ({ currentPage, totalPages, onPageChange, getPageNumbers }) => {
  if (totalPages <= 1) return null;

  return (
    <>
      <div className="flex justify-center items-center mt-6 mb-4">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
            }`}
          >
            <ChevronRight size={20} />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
            <button
              key={`page-${page}-${index}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 text-sm font-medium ${
                page === "..."
                  ? "text-gray-400 cursor-default"
                  : page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {page}
            </button>
          ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
      <div className="text-center text-black text-sm mb-4">
        <span>الصفحة {currentPage} من {totalPages}</span>
      </div>
    </>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  getPageNumbers: PropTypes.func.isRequired,
};

// ✅ مكون FileViewer
const FileViewer = ({ fileName, fileUrl, onDownload, fileType }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
    {fileUrl && (
      <button
        onClick={() => onDownload(fileUrl)}
        className="bg-transparent border-none p-0 m-0 text-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-[-10deg]"
        aria-label="عرض الملف"
      >
        <i className="fa-solid fa-eye"></i>
      </button>
    )}
    <div className="text-right">
      <h3 className="text-sm font-bold text-gray-900">{fileType}</h3>
      <p className="text-xs text-gray-500">{fileName}</p>
    </div>
  </div>
);

FileViewer.propTypes = {
  fileName: PropTypes.string.isRequired,
  fileUrl: PropTypes.string,
  onDownload: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired,
};

export default function OrderDetails() {
  const [data, setdata] = useState([]);
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let params = useParams();

  // Constants
  const FILE_TYPES = [
    "السجل التجاري",
    "السجل الضريبي", 
    "البوليصه",
    "شهاده المنشأ",
    "ملفات اخري",
  ];

  // Helper functions
  const downloadFile = (url) => window.open(url, "_blank");

  const SendValue = async (cost, orderValue) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Apply-Order`,
        {
          value: cost,
          newOrderId: orderValue,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("تم تقديم الطلب بنجاح");
      getValue();
    } catch (error) {}
  };

  const getValue = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-all-Values/${params.id}/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        if (JSON.stringify(data.data) !== JSON.stringify(allOrders)) {
          setallOrders(data.data);
        }
        setTotalPages(data.totalPages || 1);
        setTotalOffers(data.totalOffers || data.data.length);
      } else {
        // Non-paginated response (fallback)
        if (JSON.stringify(data) !== JSON.stringify(allOrders)) {
          setallOrders(data);
        }
        setTotalPages(1);
        setTotalOffers(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Details/${params.id}`,
        {
          withCredentials: true,
        }
      );

      setdata(data);
    } catch (error) {}
  };

  const handleChange = (value) => {
    setcost(value.target.value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Filter data based on search term
  const filteredOffers = allOrders.filter((offer) => {
    return (
      searchTerm === "" ||
      offer.brokerID?.toString().includes(searchTerm) ||
      offer.count?.toString().includes(searchTerm)
    );
  });

  useEffect(() => {
    getValue(currentPage);
    getOrders();
  }, [currentPage, params.id]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="container mt-5">
          <div className="card">
            <div className="font-bold text-2xl m-2 text-black">
              <h3 className="mb-0 text-center">تفاصيل الطلب</h3>
            </div>
            <div className="card-body">
              {data.length == 0 ? (
                <>
                  <p key={1}>no data</p>
                </>
              ) : (
                <>
                  {data.map((orderData, i) => (
                    <React.Fragment key={`order-${orderData.id || i}`}>

                      <div className="row w-100">
                        <h5 className="text-[var(--secondColor--)] font-bold text-end mb-3">
                          معلومات الطلب
                        </h5>

                        <div className="w-[45%] mr-[30px]">
                          <table className="table-details-user w-100">
                            <tbody>
                              <TableRow label="رقم الطلب" value={orderData.id} />
                              <TableRow label="تاريخ الطلب" value={orderData.date} />
                              <TableRow label="نوع الشحنة" value={orderData.typeOrder} />
                              
                              {orderData.town && (
                                <>
                                  <tr>
                                    <th colSpan="2">
                                      <h5 className="text-[var(--secondColor--)] font-bold text-end pt-3 mb-3">
                                        معلومات النقل
                                      </h5>
                                    </th>
                                  </tr>
                                  <TableRow label="الحي" value={orderData.town} />
                                </>
                              )}
                              <TableRow label="الرمز البريدي" value={orderData.zipCode} />
                              <TableRow label="المدينه" value={orderData.city} />
                            </tbody>
                          </table>
                        </div>

                        <div className="w-[50%] border-l border-gray-400">
                          <table className="table-details-user w-100">
                            <tbody>
                              <TableRow label="الميناء/المطار" value={orderData.location} />
                              <TableRow label="رقم البوليصة" value={orderData.numberOflicense} />
                              <TableRow label="وزن الشحنة" value={orderData.size} />
                              <TableRow label="عدد القطع" value={orderData.number} />
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <hr className="h-100 m-3" />
                    </React.Fragment>
                  ))}

                  {/* Files Display */}
                  <div className="grid gap-3">
                    {data[0]?.fileName?.map((fileName, i) => (
                      <FileViewer
                        key={`file-${fileName}-${i}`}
                        fileName={fileName}
                        fileUrl={data[0]?.fileUrl?.[i]}
                        onDownload={downloadFile}
                        fileType={FILE_TYPES[i] || "ملفات أخرى"}
                      />
                    ))}
                  </div>
                </>
              )}

              {data[0]?.fileName?.length > 3 && (
                <div className="mt-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white border-none rounded cursor-pointer hover:bg-green-600"
                  >
                    إضافة ملف إضافي
                  </button>
                </div>
              )}

              <div className="row mt-4">
                <div className="col-12">
                  <h5 className="text-black mb-3">العروض المقدمة</h5>

                  {/* Offers count info */}
                  <div className="mb-4 text-center">
                    <p className="text-black text-sm sm:text-base">
                      إجمالي العروض:{" "}
                      <span className="font-bold text-blue-600">
                        {totalOffers}
                      </span>
                    </p>
                  </div>

                  <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                  />

                  <Table striped bordered hover>
                    <thead>
                      <tr key={"300"} className="text-center">
                        <th>رقم المعرف</th>
                        <th>عدد الطلبات الناجحه</th>
                        <th>التقييم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="3" className="py-8">
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                              <span className="mr-2 text-gray-600">
                                جاري التحميل...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredOffers.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center">
                            {searchTerm
                              ? "لا توجد نتائج للبحث"
                              : "لا توجد عروض مقدمه"}
                          </td>
                        </tr>
                      ) : (
                        filteredOffers.map((item, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td>{item.brokerID}</td>
                            <td>{item.count}</td>
                            <td>
                              <StarRating count={item.count} />
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
                    getPageNumbers={getPageNumbers}
                  />

                  <div className="mt-4">
                    <h5 className="text-black mb-3">تقديم عرض جديد</h5>
                    <div className="input-group mb-3">
                      <input
                        onChange={(e) => handleChange(e)}
                        type="number"
                        className="form-control"
                        placeholder="ادخل سعر العرض بالريال"
                        aria-label="سعر العرض"
                      />
                      <Button
                        onClick={() => SendValue(cost, data[0]?.id)}
                        variant="contained"
                        disabled={!cost}
                      >
                        تقديم العرض
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Toaster />
    </>
  );
}
