import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Requirements Information Component
 */
const RequirementsInfo = ({ 
  title = "متطلبات التسجيل:",
  description = "",
  requirements = [],
  className = "bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6",
  iconColor = "text-blue-400",
  titleColor = "text-blue-800",
  textColor = "text-blue-700"
}) => {
  const defaultRequirements = [
    "الاسم الكامل: مطلوب",
    "البريد الإلكتروني: مطلوب وصحيح",  
    "رقم الهاتف: مطلوب",
    "كلمة المرور: 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام",
    "تأكيد كلمة المرور: يجب أن تتطابق",
    "رقم الهوية: مطلوب (10 أرقام على الأقل)"
  ];

  const finalRequirements = requirements?.length > 0 ? requirements : defaultRequirements;

  return (
    <div dir="rtl" className={className}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 ${iconColor}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mr-3">
          <h3 className={`text-sm font-medium ${titleColor} mb-2`}>
            {title}
          </h3>
          {description && (
            <p className={`text-xs ${textColor} mb-2`}>
              {description}
            </p>
          )}
          <ul className={`text-xs ${textColor} space-y-1`}>
            {finalRequirements.map((requirement) => (
              <li key={requirement} className="flex items-center">
                <span className="text-red-500 ml-1">*</span>
                {" "}
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

RequirementsInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  requirements: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  iconColor: PropTypes.string,
  titleColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default RequirementsInfo;
