import React from "react";
import PropTypes from "prop-types";
import { Import, Share2 } from "lucide-react";

const ActionButtons = ({ onShare, onExport }) => (
  <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-2">
    <button
      onClick={onShare}
      className="flex items-center justify-center gap-2 bg-[#00AEEF] text-white text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]"
    >
      <Share2 size={20} className="transform scale-x-[-1] sm:w-6 sm:h-6" />
      <span className="hidden sm:inline">مشاركة</span>
    </button>
    <button
      onClick={onExport}
      className="flex items-center justify-center gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]"
    >
      <Import size={20} className="sm:w-6 sm:h-6" />
      <span className="hidden sm:inline">تصدير</span>
    </button>
  </div>
);
ActionButtons.propTypes = {
  onShare: PropTypes.func,
  onExport: PropTypes.func,
};
export default ActionButtons;
