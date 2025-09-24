import { Box, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

// Reusable NoteField component for CustomerServices components
export const NoteField = ({
  isVisible,
  customerId,
  noteValue,
  onNoteChange,
  onSubmit,
  buttonText = "إرسال الملاحظة",
  buttonClass = "bg-danger text-white",
}) => {
  if (!isVisible) return null;

  return (
    <Box mt={1}>
      <TextField
        label="اكتب ملاحظة"
        variant="outlined"
        fullWidth
        value={noteValue}
        onChange={(e) => onNoteChange(customerId, e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button onClick={() => onSubmit(customerId)} className={buttonClass}>
        {buttonText}
      </Button>
    </Box>
  );
};

NoteField.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  customerId: PropTypes.string.isRequired,
  noteValue: PropTypes.string.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
};  

// Reusable StyledTableCell component for consistent styling
export const StyledTableCell = ({ children, align = "center", className = "" }) => (
  <td 
    style={{ backgroundColor: "#f0f0f0" }} 
    align={align}
    className={className}
  >
    {children}
  </td>
);
StyledTableCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  className: PropTypes.string,
};

// Common loading component for tables
export const LoadingTableRow = ({ colSpan, message = "جاري التحميل..." }) => (
  <tr>
    <td colSpan={colSpan} className="py-8">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="mr-2 text-gray-600">{message}</span>
      </div>
    </td>
  </tr>
);
LoadingTableRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  message: PropTypes.string,
};

// Common empty state component for tables
export const EmptyTableRow = ({ colSpan, searchTerm, emptyMessage = "لا توجد بيانات للعرض" }) => (
  <tr>
    <td colSpan={colSpan} className="text-center">
      {searchTerm ? "لا توجد نتائج للبحث" : emptyMessage}
    </td>
  </tr>
);
EmptyTableRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  emptyMessage: PropTypes.string,
};

// Common search bar component
export const SearchBar = ({ searchTerm, onSearchChange, placeholder = "ابحث عن طلب (الموقع، النوع، الحالة)" }) => (
  <div className="w-100 flex items-center justify-end">
    <div className="w-100 max-w-2xl p-4">
      <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder={placeholder}
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
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// Orders count info component
export const OrdersCountInfo = ({ label, count }) => (
  <div className="mb-4 text-center">
    <p className="text-white text-sm sm:text-base">
      {label}: <span className="font-bold text-blue-300">{count}</span>
    </p>
  </div>
);
OrdersCountInfo.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};