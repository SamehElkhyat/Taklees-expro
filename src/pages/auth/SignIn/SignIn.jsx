import React, { useState } from "react";
import "./SignIn.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const SignIn = () => {
  const [Isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string().required("تأكيد كلمة المرور مطلوب"),
  });
  async function handelesignin(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Login`,
        {
          Email: values.Email,
          Password: values.Password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("typeOfGenerate", data.state);
      if (data.message == "تم تسجيل الدخول بنجاح") {
        toast.success(data.message);
        setIsloading(false);
        navigate("/ActiveEmail");
      } else {
        toast.error(data.message);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
    }
  }
  let formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema,
    onSubmit: handelesignin,
  });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 -mt-20"
      >
        <div 
          className="sign-in-container w-full max-w-[450px] sm:max-w-2xl md:max-w-xl mx-auto"
          style={{ maxWidth: '450px' }}
        >
          <form
            className="form-container p-6 sm:p-6 md:p-8"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h2 className="form-container-h2 text-[#002E5B] text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6">
              تسجيل الدخول
            </h2>
            <div className="form-group-company mb-4 sm:mb-6">
              <label
                style={{ color: "#002E5B" }}
                className="text-[#002E5B] font-bold block text-right text-sm sm:text-base mb-2"
                htmlFor="Email"
              >
                البريد الإلكتروني
              </label>
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto">
                <input
                  className="border rounded w-full p-2.5 sm:p-3 pr-10 text-right text-sm sm:text-base"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  placeholder="البريد الالكتروني"
                  type="email"
                  id="Email"
                  name="Email"
                  required
                />
                <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-sm sm:text-base"></i>{" "}
                </div>
              </div>
              {formik.touched.Email && formik.errors.Email && (
                <div className="error-message text-right text-xs sm:text-sm mt-1">{formik.errors.Email}</div>
              )}
            </div>
            <div className="form-group-company mb-4 sm:mb-6">
              <label
                style={{ color: "#002E5B" }}
                className="text-[#002E5B] font-bold block text-right text-sm sm:text-base mb-2"
                htmlFor="Password"
              >
                كلمه المرور
              </label>
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto">
                <input
                  className="border rounded w-full p-2.5 sm:p-3 pr-10 text-right text-sm sm:text-base"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  placeholder="ادخل كلمه السر"
                  type="Password"
                  id="Password"
                  name="Password"
                  required
                />
                <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-sm sm:text-base"></i>
                </div>
              </div>

              {formik.touched.Password && formik.errors.Password && (
                <div className="error-message text-right text-xs sm:text-sm mt-1">{formik.errors.Password}</div>
              )}
            </div>
            <p className="text-center mb-4 sm:mb-6">
              <Link className="to-ResetPassword text-sm sm:text-base" to="/ResetPassword">
                هل نسيت كلمة السر؟
              </Link>
            </p>
            <div className="button-group space-y-3 sm:space-y-4">
              {Isloading == true ? (
                <>
                  <Button className="bg-black d-flex text-white justify-content-center w-full max-w-[280px] sm:max-w-[300px] mx-auto py-2.5 sm:py-3 text-sm sm:text-base">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2 text-danger d-flex justify-content-end mt-1"
                    />
                    جارٍ تنفيذ الطلب...
                  </Button>
                </>
              ) : (
                <>
                  <button className="signin-button w-full max-w-[280px] sm:max-w-[300px] mx-auto block py-2.5 sm:py-3 text-sm sm:text-base" type="submit">
                    تسجيل الدخول
                  </button>
                </>
              )}
              <p className="text-center">
                <Link className="to-SignUp text-sm sm:text-base" to="/IntorSignUp">
                  انشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};
export default SignIn;