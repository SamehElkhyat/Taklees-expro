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
      req.status == 200
        ? setLoadingActiveResendEmail(false)
        : setLoadingActiveResendEmail(false);
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>
            {/* Header Section */}
            <div className="px-8 py-8 text-center relative z-10">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0, transition: { delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 } }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6 shadow-lg border-4 border-white/50"
              >
                <svg
                  className="w-10 h-10 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19L9 14M20 19L15 14M3.02832 10L10.2246 14.8166C10.8661 15.2443 11.1869 15.4581 11.5336 15.5412C11.8399 15.6146 12.1593 15.6146 12.4657 15.5412C12.8124 15.4581 13.1332 15.2443 13.7747 14.8166L20.971 10M10.2981 4.06879L4.49814 7.71127C3.95121 8.05474 3.67775 8.22648 3.4794 8.45864C3.30385 8.66412 3.17176 8.90305 3.09111 9.161C3 9.45244 3 9.77535 3 10.4212V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.0799 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V10.4212C21 9.77535 21 9.45244 20.9089 9.161C20.8282 8.90305 20.6962 8.66412 20.5206 8.45864C20.3223 8.22648 20.0488 8.05474 19.5019 7.71127L13.7019 4.06879C13.0846 3.68116 12.776 3.48735 12.4449 3.4118C11.152 3.34499 11.848 3.34499 11.5551 3.4118C11.224 3.48735 10.9154 3.68116 10.2981 4.06879Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3"
              >
                تحقق بريدك الإلكتروني
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }}
                className="text-gray-600 text-sm leading-relaxed"
              >
                لقد أرسلنا رمز الى حسابك الالكتروني
              </motion.p>
            </div>

            {/* Form Section */}
            <div className="px-8 py-6 relative z-10">
              <form onSubmit={formik.handleSubmit} noValidate className="space-y-6">
                {/* Verification Code Input */}
                <div className="space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
                    className="flex justify-center space-x-3 rtl:space-x-reverse"
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <motion.input
                        key={index}
                        type="text"
                        name="Code"
                        value={formik.values.Code[index] || ''}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (newValue.length <= 1) {
                            const currentCode = formik.values.Code || '';
                            const updatedCode = currentCode.split('');
                            updatedCode[index] = newValue;
                            formik.setFieldValue('Code', updatedCode.join(''));
                            
                            // Auto-focus next input
                            if (newValue && index < 5) {
                              const nextInput = document.querySelector(`input[name="Code"][data-index="${index + 1}"]`);
                              if (nextInput) nextInput.focus();
                            }
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pastedData = e.clipboardData.getData('text').trim();
                          
                          // Only handle paste if it contains digits and is reasonable length
                          if (pastedData.match(/^\d+$/) && pastedData.length <= 5) {
                            formik.setFieldValue('Code', pastedData);
                            
                            // Focus the last filled input or the next empty one
                            const lastIndex = Math.min(pastedData.length - 1, 5);
                            setTimeout(() => {
                              const targetInput = document.querySelector(`input[name="Code"][data-index="${lastIndex}"]`);
                              if (targetInput) targetInput.focus();
                            }, 0);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Handle backspace to move to previous input
                          if (e.key === 'Backspace' && !formik.values.Code[index] && index > 0) {
                            const prevInput = document.querySelector(`input[name="Code"][data-index="${index - 1}"]`);
                            if (prevInput) {
                              prevInput.focus();
                              // Clear the previous input
                              const currentCode = formik.values.Code || '';
                              const updatedCode = currentCode.split('');
                              updatedCode[index - 1] = '';
                              formik.setFieldValue('Code', updatedCode.join(''));
                            }
                          }
                        }}
                        onBlur={formik.handleBlur}
                        data-index={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { delay: 0.9 + index * 0.1, duration: 0.3 } }}
                        whileFocus={{ scale: 1.05, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                        className="w-14 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                        style={{
                          borderColor: formik.values.Code[index] ? '#10B981' : index === 0 ? '#10B981' : '#E5E7EB',
                          backgroundColor: formik.values.Code[index] ? '#F0FDF4' : index === 0 ? '#F0FDF4' : '#FFFFFF',
                          boxShadow: formik.values.Code[index] ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : undefined
                        }}
                        maxLength="1"
                      />
                    ))}
                  </motion.div>
                  {formik.touched.Code && formik.errors.Code && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {formik.errors.Code}
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.5 } }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl transform"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>تأكيد</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </motion.button>

                {/* Back to Login Link */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.5 } }}
                  className="text-center"
                >
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all duration-200 hover:scale-105 group"
                  >
                    <span>الرجوع لتسجيل الدخول</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </motion.div>
              </form>

              {/* Resend Code Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.5 } }}
                className="mt-8 pt-6 border-t border-gray-100 text-center"
              >
                <div className="text-gray-600 text-sm">
                  <span>لم تتلق الرمز البريدي؟</span>
                  <button
                    onClick={HandleResend}
                    disabled={LoadingActiveResendEmail}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-2 hover:scale-105 inline-flex items-center space-x-1"
                  >
                    <span>إعادة الارسال</span>
                    {LoadingActiveResendEmail && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full ml-1"
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Toaster />
    </>
  );
};

export default ActiveEmail;