import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion } from "framer-motion";
import { Import, Share2 } from "lucide-react";
import PaginationComponent from "./PaginationComponent";
import PropTypes from "prop-types";

const AdminUserManagement = ({
  apiEndpoint,
  title,
  userType,
  addUserPath,
  viewDetailsPath,
  errorMessages = {
    block: "خطأ في حظر المستخدم",
    unblock: "خطأ في فك الحظر",
    fetch: "خطأ في جلب بيانات المستخدمين"
  }
}) => {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const Block = async (email) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Blocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      fetchUsers(currentPage);
      toast.success("تم حظر المستخدم بنجاح");
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error(errorMessages.block);
    }
  };

  const UnBlock = async (email) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Unblocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      fetchUsers(currentPage);
      toast.success("تم إلغاء حظر المستخدم بنجاح");
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error(errorMessages.unblock);
    }
  };

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/${apiEndpoint}/${page}`,
        {
          withCredentials: true,
        }
      );
      setSelectedOrder(data.data);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUser || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(errorMessages.fetch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredUsers = selectedOrder?.filter((user) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber?.includes(searchTerm)
  ) || [];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2, transition: { duration: 1.7 } }}
          exit={{ opacity: 0 }}
        >
          <h1
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: "700",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {title}
          </h1>

          {/* Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="البحث بالاسم، الإيميل، أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User Stats */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold">إجمالي {userType}</h3>
                <p className="text-white text-2xl font-bold">{totalUsers}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold">الصفحة الحالية</h3>
                <p className="text-white text-2xl font-bold">{currentPage}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold">إجمالي الصفحات</h3>
                <p className="text-white text-2xl font-bold">{totalPages}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link to={addUserPath}>
              <Button
                variant="success"
                className="flex items-center gap-2 px-6 py-2"
              >
                <Import size={20} />
                إضافة {userType}
              </Button>
            </Link>
            
            <Link to={viewDetailsPath}>
              <Button
                variant="info"
                className="flex items-center gap-2 px-6 py-2"
              >
                <Share2 size={20} />
                عرض التفاصيل
              </Button>
            </Link>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاسم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإيميل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الهاتف
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id || user.email || `user-${index}`} className="bg-light hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name || "غير محدد"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.phoneNumber || "غير محدد"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.isBlocked
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.isBlocked ? "محظور" : "نشط"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              {user.isBlocked ? (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => UnBlock(user.email)}
                                  className="text-xs"
                                >
                                  إلغاء الحظر
                                </Button>
                              ) : (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => Block(user.email)}
                                  className="text-xs"
                                >
                                  حظر
                                </Button>
                              )}
                              <Link to={`${viewDetailsPath}/${user.id}`}>
                                <Button variant="primary" size="sm" className="text-xs">
                                  <ArrowRightAltIcon style={{ fontSize: "16px" }} />
                                  عرض
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          لا توجد نتائج للبحث
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </motion.div>
      </Box>
    </>
  );
};

AdminUserManagement.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  addUserPath: PropTypes.string.isRequired,
  viewDetailsPath: PropTypes.string.isRequired,
  errorMessages: PropTypes.shape({
    block: PropTypes.string,
    unblock: PropTypes.string,
    fetch: PropTypes.string,
  }),
};

export default AdminUserManagement;