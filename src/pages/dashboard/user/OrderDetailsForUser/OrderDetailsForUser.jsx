import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSafeNavigation } from "../../../../hooks/useSafeNavigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderDetailsForUser() {
  const [data, setdata] = useState([]);
  const [allOrders, setallOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { navigate } = useSafeNavigation();
  let params = useParams();

  // Helper functions to avoid bracket notation
  const getArrayElement = (arr, index) => {
    return Array.isArray(arr) ? arr.at(index) : undefined;
  };

  const getObjectProperty = (obj, key) => {
    return Reflect.get(obj, key);
  };


  const FilesName = {
    commerce: [
      "السجل التجاري",
      "السجل الضريبي",
      "البوليصه",
      "شهاده المنشأ",
      "ملفات اخري",
    ],
  };
  let AllFilesHere = [];
  let NewId = [];
  let NewAllfile = [];
  let FileUrl = [];

  const DownloadFilesApi = (index) => {
    window.open(index, "_blank");
  };

  const SendValue = async (page = 1) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-all-Values/${params.id}/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data.data && data.data.totalPages !== undefined) {
        // Paginated response
        if (JSON.stringify(data.data.data) !== JSON.stringify(allOrders)) {
          setallOrders(data.data.data);
        }
        setTotalPages(data.data.totalPages || 1);
        setTotalOffers(data.data.totalOffers || data.data.data.length);
      } else {
        // Non-paginated response (fallback)
        if (JSON.stringify(data.data) !== JSON.stringify(allOrders)) {
          setallOrders(data.data);
        }
        setTotalPages(1);
        setTotalOffers(data.data.length);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const SendId = async (BrokerId, value) => {
    try {
      const firstNewId = getArrayElement(NewId, 0);
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Satue`,
        {
          Value: value,
          BrokerID: BrokerId,
          ID: firstNewId,
        },
        {
          withCredentials: true,
        }
      );

      if (data.status == 200) {
        toast.success("تم قبول الطلب بنجاح");
        setTimeout(() => {
          navigate("/CurrentOrdersForUsers");
        }, 1000);
      }
    } catch (error) {}
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
      offer.count?.toString().includes(searchTerm) ||
      offer.value?.toString().includes(searchTerm)
    );
  });

  useEffect(() => {
    SendValue(currentPage);
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
                  <p key={"1000"}>no data</p>
                </>
              ) : (
                <>
                  {data.map((data, i) => (
                    <>
                      <p style={{ display: "none" }}>
                        {NewId.push(data.id)}
                        {AllFilesHere.push(data)}
                        {NewAllfile.push(
                          getArrayElement(AllFilesHere, 0).fileName
                        )}
                        {FileUrl.push(data.fileUrl)}
                      </p>

                      <div key={i} className="row w-100">
                        <h5 className="text-[var(--secondColor--)] font-bold  text-end mb-3">
                          معلومات الطلب
                        </h5>

                        <div className="w-[45%] mr-[30px]">
                          <table className="table-details-user  w-100">
                            <tbody key={i}>
                              <tr className=" flex flex-col">
                                <th>رقم الطلب</th>
                                <td>{data.id}</td>
                              </tr>
                              <tr className=" flex flex-col">
                                <th>تاريخ الطلب</th>
                                <td>{data.date}</td>
                              </tr>
                              <tr className=" flex flex-col">
                                <th>نوع الشحنة</th>
                                <td>{data.typeOrder}</td>
                              </tr>
                              {data.town == null ? (
                                <></>
                              ) : (
                                <>
                                  <h5 className="text-black pt-3 ">
                                    معلومات النقل
                                  </h5>
                                  <tr className=" flex flex-col">
                                    <th>الحي</th>
                                    <td>{data.town}</td>
                                  </tr>
                                </>
                              )}
                              {data.zipCode == null ? (
                                <></>
                              ) : (
                                <>
                                  <tr className=" flex flex-col">
                                    <th> الرمز البريدي</th>
                                    <td>{data.zipCode}</td>
                                  </tr>
                                </>
                              )}
                              {data.city == null ? (
                                <></>
                              ) : (
                                <>
                                  <tr className=" flex flex-col">
                                    <th>المدينه</th>
                                    <td>{data.city}</td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="w-[50%] border-l border-gray-400">
                          <table className="table-details-user  w-100">
                            <tbody>
                              <tr className=" flex flex-col">
                                <th>الميناء/المطار</th>
                                <td>{data.location}</td>
                              </tr>
                              <tr className=" flex flex-col">
                                <th>رقم البوليصة</th>
                                <td>{data.numberOflicense}</td>
                              </tr>

                              {data.size == null ? (
                                <></>
                              ) : (
                                <>
                                  {" "}
                                  <tr className=" flex flex-col">
                                    <th>وزن الشحنة</th>
                                    <td>{data.size}</td>
                                  </tr>
                                </>
                              )}
                              <tr className="flex flex-col">
                                <th>عدد القطع</th>
                                <td>{data.number}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <hr className="h-100 m-3" />
                    </>
                  ))}

                  <div className="grid gap-3">
                    {getArrayElement(NewAllfile, 0)?.map((fileName, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                      >
                        {console.log(NewAllfile)}
                        {FileUrl.map((file) => (
                          <>
                            {file == null ? (
                              <></>
                            ) : (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  DownloadFilesApi(getArrayElement(file, i))
                                }
                                style={{
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                  transition:
                                    "transform 0.3s ease, color 0.3s ease",
                                  display: "inline-block",
                                  background: "transparent",
                                  border: "none",
                                  padding: 0,
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform =
                                    "scale(1.2) rotate(-10deg)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform =
                                    "scale(1) rotate(0deg)";
                                }}
                              >
                                <i
                                  className="fa-solid fa-eye"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </>
                        ))}

                        <div className="text-right">
                          <h3 className="text-sm font-bold text-gray-900">
                            {i <= 4
                              ? getArrayElement(
                                  getObjectProperty(FilesName, "commerce"),
                                  i
                                )
                              : "ملفات أخرى"}
                          </h3>
                          <p className="text-xs text-gray-500">{fileName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {NewAllfile.length > 3 && (
                <tr>
                  <td colSpan="3">
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      إضافة ملف إضافي
                    </button>
                  </td>
                </tr>
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

                  {/* Search Bar */}
                  <div className="w-100 flex items-center justify-end mb-4">
                    <div className="w-100 max-w-2xl p-4">
                      <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                        <input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          type="text"
                          placeholder="ابحث في العروض (رقم المعرف، عدد الطلبات، السعر)"
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
                      <tr key={"300"} className="text-center">
                        <th>رقم المعرف</th>
                        <th>عدد الطلبات الناجحه</th>
                        <th>التقييم</th>
                        <th>سعر العرض</th>
                        <th>الحاله</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="py-8">
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
                          <td colSpan="5" className="text-center">
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
                              <span className="text-warning">
                                {item.count === 0 && (
                                  <>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                  </>
                                )}

                                {item.count > 0 && item.count <= 5 && (
                                  <>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                  </>
                                )}

                                {item.count > 5 && item.count <= 25 && (
                                  <>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                  </>
                                )}

                                {item.count > 25 && item.count <= 50 && (
                                  <>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                  </>
                                )}

                                {item.count > 50 && item.count <= 100 && (
                                  <>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="far fa-star" loading="lazy"></i>
                                  </>
                                )}

                                {item.count > 100 && (
                                  <>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                    <i className="fas fa-star" loading="lazy"></i>
                                  </>
                                )}
                              </span>
                            </td>
                            <td>{item.value}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  SendId(item.brokerID, item.value);
                                }}
                                className="w-100 m-0"
                                variant="success"
                              >
                                قبول
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination Component */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 mb-4">
                      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
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
                              key={index}
                              onClick={() =>
                                typeof page === "number" &&
                                handlePageChange(page)
                              }
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
                          onClick={() => handlePageChange(currentPage + 1)}
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
                  )}

                  {/* Page Info */}
                  {totalPages > 1 && (
                    <div className="text-center text-black text-sm mb-4">
                      <span>
                        الصفحة {currentPage} من {totalPages}
                      </span>
                    </div>
                  )}
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
