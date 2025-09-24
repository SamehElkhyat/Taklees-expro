import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

import { createValidationSchema } from "./SignUpValidationSchemas";

const BaseSignUp = ({
  apiEndpoint,
  title,
  subtitle,
  additionalFields = [],
  validationFields = {},
  cssClass = "",
  backgroundImage,
  successMessage,
  navigateTo = "/ActiveEmail"
}) => {
  const [Isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  // Use shared validation schema
  const validationSchema = createValidationSchema(validationFields);

  // Base initial values
  const baseInitialValues = {
    Email: "",
    Password: "",
    fullName: "",
    Confirm: "",
    Identity: "",
    phoneNumber: "",
  };

  // Add additional fields to initial values
  additionalFields.forEach(field => {
    baseInitialValues[field.name] = field.defaultValue || "";
  });

  const handleSignUp = async (values) => {
    setIsloading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${apiEndpoint}`,
        values,
        {
          withCredentials: true,
        }
      );
      
      if (response.data.data) {
        localStorage.setItem("typeOfGenerate", response.data.data);
      }
      
      if (response.data.message) {
        toast.success(response.data.message);
        navigate(navigateTo);
      }
    } catch (error) {
      console.error("SignUp error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("حدث خطأ أثناء التسجيل");
      }
    } finally {
      setIsloading(false);
    }
  };

  const formik = useFormik({
    initialValues: baseInitialValues,
    validationSchema,
    onSubmit: handleSignUp,
  });

  const inputClass = `form-control ${cssClass}`;

  return (
    <motion.div
      className={`SignUp-Container ${cssClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="signup-content">
        <div className="signup-form-container">
          <div className="text-center mb-4">
            <h2 className="signup-title">{title}</h2>
            {subtitle && <p className="signup-subtitle">{subtitle}</p>}
          </div>

          <form onSubmit={formik.handleSubmit} className="signup-form">
            {/* Base Fields */}
            <div className="form-group">
              <input
                type="text"
                placeholder="الاسم الكامل"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-message">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                name="Email"
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="error-message">{formik.errors.Email}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="رقم الهوية"
                name="Identity"
                value={formik.values.Identity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.Identity && formik.errors.Identity && (
                <div className="error-message">{formik.errors.Identity}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="رقم الهاتف"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error-message">{formik.errors.phoneNumber}</div>
              )}
            </div>

            {/* Additional Fields */}
            {additionalFields.map((field) => (
              <div key={field.name} className="form-group">
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className="error-message">{formik.errors[field.name]}</div>
                )}
              </div>
            ))}

            <div className="form-group">
              <input
                type="password"
                placeholder="كلمة المرور"
                name="Password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.Password && formik.errors.Password && (
                <div className="error-message">{formik.errors.Password}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="تأكيد كلمة المرور"
                name="Confirm"
                value={formik.values.Confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
              {formik.touched.Confirm && formik.errors.Confirm && (
                <div className="error-message">{formik.errors.Confirm}</div>
              )}
            </div>

            <div className="form-actions">
              {Isloading ? (
                <Button variant="primary" disabled className="signup-button">
                  <Spinner animation="border" size="sm" className="me-2" />
                  جارٍ التسجيل...
                </Button>
              ) : (
                <button type="submit" className="signup-button">
                  تسجيل حساب جديد
                </button>
              )}
            </div>

            <div className="form-links">
              <p>
                لديك حساب بالفعل؟{" "}
                <Link to="/SignIn" className="signin-link">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

BaseSignUp.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  additionalFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      type: PropTypes.string,
      defaultValue: PropTypes.string,
    })
  ),
  validationFields: PropTypes.object,
  cssClass: PropTypes.string,
  backgroundImage: PropTypes.string,
  successMessage: PropTypes.string,
  navigateTo: PropTypes.string,
};

export default BaseSignUp;