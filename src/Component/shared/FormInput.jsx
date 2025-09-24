import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Form Input Component with consistent styling and validation
 */
const FormInput = ({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  formik, 
  showIcon = false, 
  iconClass = "",
  labelStyle = {},
  inputStyle = {},
  containerClassName = "mb-3",
  labelClassName = "text-[#002E5B] font-bold flex flex-row justify-end",
  inputClassName = "border rounded w-full p-2 pr-10",
  inputContainerClassName = "relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2",
  errorClassName = "error-message flex flex-row justify-end",
  required = false,
  ...inputProps
}) => (
  <div className={containerClassName}>
    <label
      style={{ color: "#002E5B", ...labelStyle }}
      className={labelClassName}
      htmlFor={id}
    >
      {label}
    </label>
    <div className={inputContainerClassName}>
      <input
        className={inputClassName}
        value={formik.values[id] || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        type={type}
        id={id}
        name={id}
        required={required}
        style={inputStyle}
        {...inputProps}
      />
      {showIcon && iconClass && (
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
          <i className={iconClass}></i>
        </div>
      )}
    </div>
    {formik.touched[id] && formik.errors[id] && (
      <div className={errorClassName}>
        {formik.errors[id]}
      </div>
    )}
  </div>
);

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  formik: PropTypes.object.isRequired,
  showIcon: PropTypes.bool,
  iconClass: PropTypes.string,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  required: PropTypes.bool,
};

export default FormInput;
