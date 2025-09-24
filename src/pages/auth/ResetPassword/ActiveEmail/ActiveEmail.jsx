import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { eventEmitter } from "../../../../Component/eventEmitter";
import { motion } from "framer-motion";

const ActiveEmail = () => {
  const navigate = useNavigate();
  const [LoadingActiveResendEmail, setLoadingActiveResendEmail] =
    useState(false);

  const HandleResend = async () => {
    setLoadingActiveResendEmail(true);
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/Resend-Code`,
        { withCredentials: true }
      );
      setLoadingActiveResendEmail(false);
      toast.success(req.data.message);
    } catch (error) {
      toast.error("فشل في ارسال الكود");
      setLoadingActiveResendEmail(false);
    }
  };

  
  const SendCode = async (values) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/VerifyCode`,
        {
          Code: values.Code,
          typeOfGenerate: localStorage.getItem("typeOfGenerate"),
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.data.message);
      if (data.status == 200) {
        eventEmitter.emit("dataUpdated");

        switch (data.data.data) {
          case "User":
            return (navigate("/LandingPageForUsers"));

          case "Company":
            return (navigate("/LandingPageForUsers"));

          case "Admin":
            return (navigate("/LandingPageAdmin"));
          case "Account":
            return (navigate("/AccountantLandingPage"));

          case "CustomerService":
            return (navigate("/LandingPageCustomeService"));

          case "Broker":
            return (navigate("/BrookersLandingPage"));

          case "Manager":
            return (navigate("/LandingPageManger"));
            
          case "Saber":
            return (navigate("/LandingPageSaber"));

          default:
            console.warn("Unknown user role:", data.data);
            return navigate("/");
        }
      }
    } catch (error) {
      
    }
  };

  const formik = useFormik({
    initialValues: {
      Code: "",
    },
    onSubmit: SendCode,
  });

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="reset-password-container">
          <div className="reset-password-form">
            <div className="w-100 flex flex-row justify-center">
              <svg
                className=" w-20 p-2 m-4 tex-center bg-[#518EF857] rounded-[40px]"
                height="70px"
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4 19L9 14M20 19L15 14M3.02832 10L10.2246 14.8166C10.8661 15.2443 11.1869 15.4581 11.5336 15.5412C11.8399 15.6146 12.1593 15.6146 12.4657 15.5412C12.8124 15.4581 13.1332 15.2443 13.7747 14.8166L20.971 10M10.2981 4.06879L4.49814 7.71127C3.95121 8.05474 3.67775 8.22648 3.4794 8.45864C3.30385 8.66412 3.17176 8.90305 3.09111 9.161C3 9.45244 3 9.77535 3 10.4212V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.0799 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V10.4212C21 9.77535 21 9.45244 20.9089 9.161C20.8282 8.90305 20.6962 8.66412 20.5206 8.45864C20.3223 8.22648 20.0488 8.05474 19.5019 7.71127L13.7019 4.06879C13.0846 3.68116 12.776 3.48735 12.4449 3.4118C12.152 3.34499 11.848 3.34499 11.5551 3.4118C11.224 3.48735 10.9154 3.68116 10.2981 4.06879Z"
                    stroke="#000000"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>

            <h2 className="text-center font-[bolder] text-4xl">تفعيل الحساب</h2>

            <form
              onChange={formik.handleChange}
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className="form-group">
                <input
                  value={formik.values.Code}
                  type="text"
                  name="Code"
                  className="w-[260px] h-16 tracking-[1em] pr-10 text-center text-2xl font-bold rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="text-sm text-gray-600 space-y-2 text-center">
                  <div>
                    <button className="text-green-600 font-bold flex items-center justify-center space-x-1 rtl:space-x-reverse hover:underline">
                      <span>→</span>
                      <span>الرجوع لتسجيل الدخول</span>
                    </button>
                  </div>
                </div>
                {formik.touched.Code && formik.errors.Code && (
                  <div className="text-danger">{formik.errors.Code}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#1DA9E3] text-white font-bold py-2 rounded-md hover:bg-[#0f8ac1] transition"
              >
                تأكيد
              </button>
            </form>

            <div className="flex flex-row">
              <button onClick={() => HandleResend()}>
                <span className=""> لم تتلق الرمز البريدي؟</span>
                <span className=" text-[#1DA9E3] font-bold hover:underline">
                  إعاده الارسال
                </span>
              </button>
              {LoadingActiveResendEmail ? (
                <>
                  <div className="loader"></div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <Toaster />
    </>
  );
};

export default ActiveEmail;
