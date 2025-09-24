import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";

export default function Statistics() {
  const [Brookers, setBrookers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const GetBrookers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Evaluation-Broker/${page}`,
        {
          withCredentials: true,
        }
      );

      if (data.data && data.totalPages !== undefined) {
        setBrookers(data.data);
        setTotalPages(data.totalPages || 1);
      } else {
        setBrookers(data);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetBrookers(currentPage);
  }, [currentPage]);

  const renderStars = (count) => {
    let filled = 0;
    if (count > 0 && count <= 5) filled = 1;
    else if (count > 5 && count <= 25) filled = 2;
    else if (count > 25 && count <= 50) filled = 3;
    else if (count > 50 && count <= 100) filled = 4;
    else if (count > 100) filled = 5;

    return (
      <>
        {Array.from({ length: filled }, (_, i) => (
          <i key={`filled-${i}`} className="fas fa-star"></i>
        ))}
        {Array.from({ length: 5 - filled }, (_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      {/* باقي الكود نفسه */}

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
            <tr>
              <td colSpan="4" className="py-8 text-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="mr-2 text-gray-600">جاري التحميل...</span>
                </div>
              </td>
            </tr>
          ) : (
            Brookers.map((item, index) => (
              <tr
                className="text-center"
                key={item.email || item.id || `broker-${index}`}
              >
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>
                  <span className="text-warning">
                    {renderStars(item.count)}
                  </span>
                </td>
                <td>{item.count}</td>
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
    </motion.div>
  );
}
