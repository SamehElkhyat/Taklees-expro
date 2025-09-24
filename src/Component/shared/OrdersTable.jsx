import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Reusable Table Loading Component
 */
export const TableLoadingRow = ({ colSpan, message = "جاري التحميل..." }) => (
  <tr>
    <td colSpan={colSpan} className="py-8">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="mr-2 text-gray-600">{message}</span>
      </div>
    </td>
  </tr>
);

TableLoadingRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  message: PropTypes.string,
};

/**
 * Reusable Table Empty State Component
 */
export const TableEmptyRow = ({ 
  colSpan, 
  searchTerm = "", 
  defaultMessage = "لا توجد بيانات للعرض",
  searchMessage = "لا توجد نتائج للبحث"
}) => (
  <tr>
    <td colSpan={colSpan} className="text-center py-4">
      {searchTerm ? searchMessage : defaultMessage}
    </td>
  </tr>
);

TableEmptyRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  defaultMessage: PropTypes.string,
  searchMessage: PropTypes.string,
};

/**
 * Reusable Orders Table Component
 */
export const OrdersTable = ({ 
  columns, 
  data, 
  loading = false, 
  searchTerm = "",
  renderRow,
  emptyMessage = "لا توجد طلبات",
  searchEmptyMessage = "لا توجد نتائج للبحث",
  tableProps = {}
}) => {
  const renderTableBody = () => {
    if (loading) {
      return <TableLoadingRow colSpan={columns.length} />;
    }

    if (data.length === 0) {
      return (
        <TableEmptyRow 
          colSpan={columns.length}
          searchTerm={searchTerm}
          defaultMessage={emptyMessage}
          searchMessage={searchEmptyMessage}
        />
      );
    }

    return data.map((item, index) => renderRow(item, index));
  };

  return (
    <Table striped bordered hover {...tableProps}>
      <thead>
        <tr className="text-center">
          {columns.map((column, index) => (
            <th key={uuidv4()}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </Table>
  );
};

OrdersTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  searchTerm: PropTypes.string,
  renderRow: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
  searchEmptyMessage: PropTypes.string,
  tableProps: PropTypes.object,
};

export default OrdersTable;
