import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "./PaginatedTable";
import { Edit, Trash2, Eye, Download } from "lucide-react";
import PropTypes from "prop-types";

// Example 1: Orders Table
export const OrdersTable = () => {
  const navigate = useNavigate();

  const columns = [
    "رقم الطلب",
    "اسم العميل",
    "نوع الطلب",
    "الحالة",
    "التاريخ",
    "السعر",
    "الإجراءات"
  ];

  const renderRow = (order, index) => (
    <tr key={index} className="bg-light">
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        #{order.orderNumber}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {order.customerName}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {order.orderType}
      </td>
      <td className="px-2 py-3">
        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {new Date(order.createdAt).toLocaleDateString('ar-SA')}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {order.price} ريال
      </td>
      <td className="px-2 py-3">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="info"
            onClick={() => navigate(`/order-details/${order.id}`)}
            className="p-1"
          >
            <Eye size={16} />
          </Button>
          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/edit-order/${order.id}`)}
            className="p-1"
          >
            <Edit size={16} />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteOrder(order.id)}
            className="p-1"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
      case 'completed': return 'bg-success text-white';
      case 'cancelled': return 'bg-danger text-white';
      case 'in_progress': return 'bg-info text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const handleDeleteOrder = (orderId) => {
    // Handle delete logic
    console.log('Delete order:', orderId);
  };

  return (
    <PaginatedTable
      apiEndpoint={`${process.env.REACT_APP_API_URL}/Get-Orders`}
      columns={columns}
      renderRow={renderRow}
      title="الطلبات"
      searchPlaceholder="ابحث في الطلبات (رقم الطلب، اسم العميل، النوع)"
      onSearch={(searchTerm, refreshData) => {
        refreshData({ search: searchTerm });
      }}
      itemsPerPage={15}
      emptyMessage="لا توجد طلبات للعرض"
    />
  );
};

// Example 2: Brokers Table
export const BrokersTable = () => {
  const navigate = useNavigate();

  const columns = [
    "الاسم",
    "البريد الإلكتروني",
    "رقم الهاتف",
    "عدد الطلبات المكتملة",
    "التقييم",
    "الحالة",
    "الإجراءات"
  ];

  const renderRow = (broker, index) => (
    <tr key={index} className="bg-light">
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {broker.fullName}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {broker.email}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {broker.phoneNumber}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {broker.completedOrders}
      </td>
      <td className="px-2 py-3">
        <div className="flex items-center justify-center">
          <span className="text-yellow-500">★</span>
          <span className="mr-1">{broker.rating}</span>
        </div>
      </td>
      <td className="px-2 py-3">
        <span className={`badge ${broker.isActive ? 'bg-success' : 'bg-danger'}`}>
          {broker.isActive ? 'نشط' : 'غير نشط'}
        </span>
      </td>
      <td className="px-2 py-3">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="info"
            onClick={() => navigate(`/broker-profile/${broker.id}`)}
            className="p-1"
          >
            <Eye size={16} />
          </Button>
          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/edit-broker/${broker.id}`)}
            className="p-1"
          >
            <Edit size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <PaginatedTable
      apiEndpoint={`${process.env.REACT_APP_API_URL}/Get-Brokers`}
      columns={columns}
      renderRow={renderRow}
      title="الوسطاء"
      searchPlaceholder="ابحث في الوسطاء (الاسم، البريد الإلكتروني)"
      onSearch={(searchTerm, refreshData) => {
        refreshData({ search: searchTerm });
      }}
      itemsPerPage={12}
      emptyMessage="لا توجد وسطاء للعرض"
    />
  );
};

// Example 3: Statistics Table
export const StatisticsTable = () => {
  const columns = [
    "الفترة",
    "عدد الطلبات",
    "إجمالي المبيعات",
    "الوسطاء النشطين",
    "العملاء الجدد",
    "التقرير"
  ];

  const renderRow = (stat, index) => (
    <tr key={index} className="bg-light">
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {stat.period}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {stat.totalOrders}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {stat.totalSales} ريال
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {stat.activeBrokers}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {stat.newCustomers}
      </td>
      <td className="px-2 py-3">
        <Button
          size="sm"
          variant="success"
          onClick={() => handleDownloadReport(stat.id)}
          className="p-1"
        >
          <Download size={16} />
          <span className="mr-1">تحميل</span>
        </Button>
      </td>
    </tr>
  );

  const handleDownloadReport = (reportId) => {
    // Handle download logic
    console.log('Download report:', reportId);
  };

  return (
    <PaginatedTable
      apiEndpoint={`${process.env.REACT_APP_API_URL}/Get-Statistics`}
      columns={columns}
      renderRow={renderRow}
      title="الإحصائيات"
      itemsPerPage={20}
      emptyMessage="لا توجد إحصائيات للعرض"
    />
  );
};

// Example 4: Simple Data Table (for any generic data)
export const SimpleDataTable = ({ 
  apiEndpoint, 
  columns, 
  renderRow, 
  title, 
  searchPlaceholder,
  itemsPerPage = 10 
}) => {
  return (
    <PaginatedTable
      apiEndpoint={apiEndpoint}
      columns={columns}
      renderRow={renderRow}
      title={title}
      searchPlaceholder={searchPlaceholder}
      onSearch={(searchTerm, refreshData) => {
        refreshData({ search: searchTerm });
      }}
      itemsPerPage={itemsPerPage}
      emptyMessage="لا توجد بيانات للعرض"
    />
  );
};

// Example 5: Table with custom actions
export const CustomActionsTable = () => {
  const columns = [
    "الاسم",
    "النوع",
    "التاريخ",
    "الحالة",
    "الإجراءات المخصصة"
  ];

  const renderRow = (item, index) => (
    <tr key={index} className="bg-light">
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {item.name}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {item.type}
      </td>
      <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
        {new Date(item.date).toLocaleDateString('ar-SA')}
      </td>
      <td className="px-2 py-3">
        <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
          {item.status === 'active' ? 'نشط' : 'غير نشط'}
        </span>
      </td>
      <td className="px-2 py-3">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleCustomAction1(item.id)}
          >
            إجراء 1
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleCustomAction2(item.id)}
          >
            إجراء 2
          </Button>
        </div>
      </td>
    </tr>
  );

  const handleCustomAction1 = (id) => {
    console.log('Custom action 1 for item:', id);
  };

  const handleCustomAction2 = (id) => {
    console.log('Custom action 2 for item:', id);
  };

  return (
    <PaginatedTable
      apiEndpoint={`${process.env.REACT_APP_API_URL}/Get-CustomData`}
      columns={columns}
      renderRow={renderRow}
      title="البيانات المخصصة"
      searchPlaceholder="ابحث في البيانات"
      onSearch={(searchTerm, refreshData) => {
        refreshData({ search: searchTerm });
      }}
      itemsPerPage={8}
      emptyMessage="لا توجد بيانات مخصصة للعرض"
    />
  );
};

// PropTypes for SimpleDataTable
SimpleDataTable.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  itemsPerPage: PropTypes.number
}; 