import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ships from "../ships.png";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const SendCode = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Reset-Password`,
        {
          Code: values.Code,
          newPassword: values.newPassword,
          Confirm: values.Confirm,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      if (response.data.message == "تم إعادة تعيين كلمة المرور بنجاح") {
        setTimeout(() => {
          navigate("/SignIn");
        }, 1000);
      }
    } catch (error) {
    }
  };

  const formik = useFormik({
    initialValues: {
      Code: "",
      newPassword: "",
      Confirm: "",
    },
    onSubmit: SendCode,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="reset-password-container">
          <div className="reset-password-form">
            

            <h2 className="text-center text-3xl">رمز التحقق</h2>

            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="form-group">
                <input
                  className="text-white"
                  value={formik.values.Code}
                  type="text"
                  name="Code"
                  placeholder="رمز التحقق"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Code && formik.errors.Code && (
                  <div className="text-danger">{formik.errors.Code}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="text-white"
                  value={formik.values.newPassword}
                  type="password"
                  name="newPassword"
                  placeholder="كلمه المرور الجديده"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-danger">{formik.errors.newPassword}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  className="text-white"
                  value={formik.values.Confirm}
                  type="password"
                  name="Confirm"
                  placeholder="تأكيد كلمه المرور"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Confirm && formik.errors.Confirm && (
                  <div className="text-danger">{formik.errors.Confirm}</div>
                )}
              </div>

              <button type="submit" className="reset-btn">
                تأكيد الكود
              </button>
            </form>
          </div>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default ConfirmPassword;
