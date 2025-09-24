import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SearchBar from "../../../../Component/shared/SearchBar";
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
import ActionButtons from "../../../../Component/shared/ActionButtons";
import PageHeader from "../../../../Component/shared/PageHeader";

// ✅ مكون UserTable لتقليل التكرار
const UserTable = ({ users, loading, onViewProfile, onBlock, onUnblock }) => {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="6" className="text-center py-4">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-2">جاري التحميل...</span>
            </div>
          </td>
        </tr>
      );
    }
    
    if (users.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center py-4 text-gray-500">
            لا توجد بيانات للعرض
          </td>
        </tr>
      );
    }
    
    return users.map((customer, index) => (
      <tr key={customer.id || index} className="bg-light">
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.fullName}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.email}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.identity}
        </td>
        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
          {customer.phoneNumber}
        </td>
        <td className="px-2 py-3">
          <Button
            onClick={() => onViewProfile(customer.id)}
            className="btn btn-primary text-white text-xs sm:text-sm md:text-base"
          >
            عرض الملف الشخصي
          </Button>
        </td>
        <td className="px-2 py-3">
          {customer.isBlocked ? (
            <button
              onClick={() => onUnblock(customer.email)}
              className="btn btn-success text-black text-xs sm:text-sm md:text-base"
            >
              فك الحظر
            </button>
          ) : (
            <button
              onClick={() => onBlock(customer.email)}
              className="btn btn-danger text-black text-xs sm:text-sm md:text-base"
            >
              حظر
            </button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-responsive mt-3 overflow-x-auto">
      <div className="min-w-full">
        <table className="table table-bordered text-center shadow-sm w-full">
          <thead className="bg-white border">
            <tr>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الاسم</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">البريد الالكتروني</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">رقم الهوية</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الهاتف</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الملف الشخصي</th>
              <th className="px-2 py-3 text-xs sm:text-sm md:text-base">حظر</th>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  onBlock: PropTypes.func.isRequired,
  onUnblock: PropTypes.func.isRequired,
};

export default function Mangers() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const Block = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Blocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("خطأ في حظر المستخدم");
    }
  };

  const UnBlock = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Unblocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("خطأ في فك الحظر");
    }
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const safePage =
        Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const params = new URLSearchParams({ page: safePage });
      const url = `${
        process.env.REACT_APP_API_URL
      }/Get-Manager?${params.toString()}`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      setSelectedOrder(data.data || data);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CustomerService();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    CustomerService(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    CustomerService(1);
  };

  // Handler functions for actions
  const handleShare = () => {
    toast.success("تم تنفيذ عملية المشاركة");
  };

  const handleExport = () => {
    toast.success("تم تنفيذ عملية التصدير");
  };

  const handleViewProfile = (userId) => {
    navigate(`/ProfileUsers/${userId}`);
  };
  return (
    <>
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
        <PageHeader title="المديرين" variant="admin" />

        {/* Responsive container for buttons and search */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
          <ActionButtons onShare={handleShare} onExport={handleExport} />

          <div className="w-full lg:w-auto flex items-center justify-center" dir="rtl">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
              placeholder="ابحث عن مدير (الاسم، البريد، الهاتف)"
            />
          </div>
        </div>

        {/* User Table */}
        <UserTable 
          users={selectedOrder}
          loading={loading}
          onViewProfile={handleViewProfile}
          onBlock={Block}
          onUnblock={UnBlock}
        />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <Toaster />
      </Box>
    </>
  );
}
