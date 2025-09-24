import React, { useState, useEffect } from "react";
import axios from "axios";
import { GetSaberCertificate } from "../../../../store/Slice/SaberCertificateReducer";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Eye, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AutoChatbot from "../../../../features/Chat/AutoChatbot";
import { useFormik } from "formik";

const SubmitSaberCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAutoChatbot, setShowAutoChatbot] = useState(false);

  const MakeRequest = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append files as binary objects
      if (formik.values.productImage) {
        formData.append("ProductImage", formik.values.productImage);
      }
      if (formik.values.crImage) {
        formData.append("CRImage", formik.values.crImage);
      }

      // Append other form fields
      formData.append("HSCode", formik.values.hsCode);
      formData.append("PhoneNumber", formik.values.phoneNumber);
      formData.append("Email", formik.values.email);
      formData.append("description", formik.values.description);
      formData.append("ComanyName", formik.values.comanyName);
      formData.append("ProductName", formik.values.productName);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE4}/Add-Saber-Certificates`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      toast.success("تم تقديم الطلب بنجاح");
      // Reset form on success
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء تقديم الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      comanyName: "",
      productName: "",
      productImage: null,
      crImage: null,
      hsCode: "",
      phoneNumber: "",
      email: "",
      description: "",
    },
    onSubmit: MakeRequest,
  });

  // Custom file input handlers
  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("productImage", file);
  };

  const handleCrImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("crImage", file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Minimalist Header */}
        <div className="flex justify-between items-center mb-16">
          <button
            onClick={() => setShowAutoChatbot(true)}
            className="group flex items-center justify-center gap-3 bg-green-600/90 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-full shadow-lg border border-green-500/50 hover:bg-green-700 hover:shadow-xl hover:border-green-600/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <MessageCircle
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span>المساعد الآلي</span>
          </button>
          <button
            onClick={() => navigate("/AllSaberCertificates")}
            className="group flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm text-slate-700 font-medium py-3 px-6 rounded-full shadow-lg border border-slate-200/50 hover:bg-white hover:shadow-xl hover:border-slate-300/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <Eye
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span>عرض الشهادات</span>
          </button>
        </div>

        {/* Elegant Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-8 shadow-2xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-light text-slate-900 mb-6 tracking-tight">
            طلب شهادة سابر
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            احصل على شهادة سابر لمنتجاتك بسهولة وسرعة من خلال نظامنا المتطور
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-10">
              <form onSubmit={formik.handleSubmit} className="space-y-10">
                {/* Company Name Field */}
                <div className="group">
                  <label
                    htmlFor="comanyName"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    اسم الشركة <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="comanyName"
                    value={formik.values.comanyName}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="أدخل اسم الشركة..."
                    required
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="productName"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    اسم المنتج <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="أدخل اسم المنتج..."
                    required
                  />
                </div>

                {/* Luxury File Upload for Product Image */}
                <div className="group">
                  <label
                    htmlFor="productImage"
                    className="block text-base font-normal text-slate-700 mb-4 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    صورة المنتج <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="productImage"
                      name="productImage"
                      onChange={handleProductImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*"
                      required
                    />
                    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-dashed border-slate-300/60 rounded-2xl p-8 hover:border-slate-400/80 hover:bg-gradient-to-br hover:from-slate-50 hover:via-white hover:to-slate-50 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <svg
                              className="w-8 h-8 text-slate-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-slate-700 font-medium">
                            انقر لرفع صورة المنتج
                          </p>
                          <p className="text-sm text-slate-500 font-light">
                            PNG, JPG, GIF حتى 10MB
                          </p>
                          {formik.values.productImage && (
                            <p className="text-sm text-emerald-600 font-medium">
                              تم اختيار: {formik.values.productImage.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                {/* Luxury File Upload for Certificate Image */}
                <div className="group">
                  <label
                    htmlFor="crImage"
                    className="block text-base font-normal text-slate-700 mb-4 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    صورة الشهادة <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="crImage"
                      name="crImage"
                      onChange={handleCrImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*,.pdf"
                      required
                    />
                    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-dashed border-slate-300/60 rounded-2xl p-8 hover:border-slate-400/80 hover:bg-gradient-to-br hover:from-slate-50 hover:via-white hover:to-slate-50 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-xl">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <svg
                              className="w-8 h-8 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-slate-700 font-medium">
                            انقر لرفع صورة الشهادة
                          </p>
                          <p className="text-sm text-slate-500 font-light">
                            PNG, JPG, PDF حتى 10MB
                          </p>
                          {formik.values.crImage && (
                            <p className="text-sm text-emerald-600 font-medium">
                              تم اختيار: {formik.values.crImage.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="hsCode"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    رمز ال HS <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="hsCode"
                    value={formik.values.hsCode}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="أدخل رمز ال HS..."
                    required
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    رقم الهاتف <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="أدخل رقم الهاتف..."
                    required
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    البريد الإلكتروني <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="أدخل البريد الإلكتروني..."
                    required
                  />
                </div>

                {/* Description Field */}
                <div className="group">
                  <label
                    htmlFor="description"
                    className="block text-base font-normal text-slate-700 mb-3 group-focus-within:text-slate-900 transition-colors duration-200"
                  >
                    الوصف <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    rows="5"
                    className="w-full px-5 py-4 text-base border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all duration-300 bg-white/90 hover:bg-white hover:border-slate-300 resize-none placeholder-slate-400 font-normal shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="اكتب وصف تفصيلي للطلب أو الخدمة المطلوبة..."
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                      أدخل وصف واضح ومفصل
                    </span>
                    <span className="text-sm text-slate-400">
                      {formik.values.description.length} حرف
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 text-white text-xl font-light rounded-2xl transform hover:scale-[1.02] transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:from-slate-400 disabled:to-slate-500 overflow-hidden"
                  >
                    {/* Luxury shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {isSubmitting ? (
                      <div className="flex items-center justify-center relative z-10">
                        <svg
                          className="animate-spin -ml-1 mr-4 h-7 w-7 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="tracking-wide">جاري التقديم...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center relative z-10">
                        <svg
                          className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        <span className="tracking-wide">تقديم الطلب</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 text-center hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-3 text-lg">
                سرعة في الاستجابة
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                مراجعة الطلب خلال 3-5 أيام عمل
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 text-center hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-3 text-lg">
                معتمد رسمياً
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                شهادات معتمدة من هيئة المواصفات
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 text-center hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-3 text-lg">
                دعم فني
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                فريق متخصص لمساعدتك في كل خطوة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AutoChatbot Button */}
      {!showAutoChatbot && (
        <button
          onClick={() => setShowAutoChatbot(true)}
          className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center z-50"
          title="المساعد الآلي للاستفسارات"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* AutoChatbot Modal */}
      <AutoChatbot
        isOpen={showAutoChatbot}
        handleClose={() => setShowAutoChatbot(false)}
      />

      <Toaster />
    </div>
  );
};

export default SubmitSaberCertificate;
