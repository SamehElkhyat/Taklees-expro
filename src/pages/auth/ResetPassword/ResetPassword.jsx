import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./ResetPassword.css";
import ships from "./ships.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/Forget-Password`,
          {
            Email: values.Email,
          }
        );

        if (data.message == "تم إرسال الرسالة بنجاح") {
          toast.success(data.message);
          setTimeout(() => {
            navigate("/ConfirmPassword");
          }, 1000);
        } else {
          toast.error(data.message || "حدث خطأ ما");
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="reset-password-container">
        <div className="reset-password-form">
          <div className="bg-#002E5B flex flex-col ">
            <i className="fa-solid fa-key flex felx-row justify-center items-center text-6xl p-1 text-[#002E5B] scale-75"></i>
            <h2 className="text-4xl font-bold w-100 text-center">
              نسيت كلمه المرور
            </h2>
            <span className=" text-gray-700 text-center text-md">
              لإعادة تعيين كلمة المرور الخاصة بك، يرجى إدخال عنوان بريدك
              الإلكتروني.
            </span>
          </div>

          <form className="m-10" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label className="p-1" dir="rtl" htmlFor="Email">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="Email"
                placeholder="البريد الإلكتروني"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="error-message">{formik.errors.Email}</div>
              )}
            </div>

            <button type="submit" className="reset-btn" disabled={isLoading}>
              {isLoading ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
            </button>
          </form>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
