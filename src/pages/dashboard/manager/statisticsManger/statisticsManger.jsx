import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../../Component/shared/LoadingButton";
export default function StatisticsManger() {
  const [Statics, setStatics] = useState({});
  const [Brookers, setBrookers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBrokers, setTotalBrokers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const GetStatics = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Statistics`,
        {
          withCredentials: true,
        }
      );
      setStatics(data);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  const GetBrookers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Evaluation-Broker/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setBrookers(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalBrokers(data.totalBrokers || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setBrookers(data);
        setTotalPages(1);
        setTotalBrokers(data.length);
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
  // Filter data based on search term
  const filteredBrokers = Brookers.filter((broker) => {
    return (
      searchTerm === "" ||
      broker.fullName?.includes(searchTerm) ||
      broker.email?.includes(searchTerm) ||
      broker.count?.toString().includes(searchTerm)
    );
  });

  useEffect(() => {
    GetStatics();
    GetBrookers(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="container-fluid py-5">
        <h2
          className="text-center mb-4"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          إحصائيات النظام
        </h2>

        <div className="row g-4">
          {/* Total Clients Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-primary mb-2">
                  <i className="fas fa-users" loading="lazy"></i>
                </div>
                <h5 className="card-title">إجمالي العملاء</h5>
                <h3 className="text-primary">{Statics.countAllUsers}</h3>
                <p className="text-muted small">زيادة 12% عن الشهر السابق</p>
              </div>
            </div>
          </div>

          {/* Active Orders Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-success mb-2">
                  <i className="fas fa-clipboard-list" loading="lazy"></i>
                </div>
                <h5 className="card-title">الطلبات النشطة</h5>
                <h3 className="text-success">{Statics.countActiveOrders}</h3>
                <p className="text-muted small">في طور المعالجة</p>
              </div>
            </div>
          </div>

          {/* Completed Orders Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-info mb-2">
                  <i className="fas fa-check-circle" loading="lazy"></i>
                </div>
                <h5 className="card-title">الطلبات المكتملة</h5>
                <h3 className="text-info">{Statics.countDoneOrders}</h3>
                <p className="text-muted small">هذا العام</p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-warning mb-2">
                  <i className="fas fa-dollar-sign" loading="lazy"></i>
                </div>
                <h5 className="card-title">الإيرادات</h5>
                <h3 className="text-warning">{Statics.exports}</h3>
                <p className="text-muted small">ريال سعودي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#2c3e50",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                    borderBottom: "3px solid #3498db",
                    paddingBottom: "10px",
                    width: "fit-content",
                    margin: "0 auto 2rem auto",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    border: "1px solid #3498db",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    },
                  }}
                  className="card-title mb-4"
                >
                  أداء الوسطاء
                </h5>

                {/* Brokers count info */}
                <div className="mb-4 text-center">
                  <p className="text-black text-sm sm:text-base">
                    إجمالي الوسطاء:{" "}
                    <span className="font-bold text-blue-600">
                      {totalBrokers}
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
                        placeholder="ابحث في الوسطاء (الاسم، البريد، عدد الطلبات)"
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
                      <th>الوسيط</th>
                      <th>البريد الالكتروني</th>
                      <th>التقييم</th>
                      <th>الطلبات المنجزة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <LoadingButton
                        loadingText="جاري التحميل..."
                      />

                    ) : filteredBrokers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          {searchTerm
                            ? "لا توجد نتائج للبحث"
                            : "لا توجد وسطاء للعرض"}
                        </td>
                      </tr>
                    ) : (
                      filteredBrokers.map((item, index) => (
                        <tr
                          className="w-100 text-center hover:bg-gray-50"
                          key={uuidv4()}
                        >
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="text-warning">
                              {item.count === 0 && (
                                <>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                </>
                              )}

                              {item.count > 0 && item.count <= 5 && (
                                <>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                </>
                              )}

                              {item.count > 5 && item.count <= 25 && (
                                <>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                </>
                              )}

                              {item.count > 25 && item.count <= 50 && (
                                <>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="far fa-star"></i>
                                  <i className="far fa-star"></i>
                                </>
                              )}

                              {item.count > 50 && item.count <= 100 && (
                                <>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="fas fa-star" loading="lazy"></i>
                                  <i className="far fa-star"></i>
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
                          <td>{item.count}</td>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
