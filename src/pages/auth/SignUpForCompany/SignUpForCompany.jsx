import React, { useState } from "react";
import "./SignUpForCompany.css";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../../../Component/shared/FormInput";
import LoadingButton from "../../../Component/shared/LoadingButton";
import { companyValidationFields, createValidationSchema } from "../../../Component/shared/SignUpValidationSchemas";
const SignUpForCompany = () => {
  
  const [Isloading, setIsloading] = useState(false);

  const initialValues = {
    Email: "",
    Password: "",
    fullName: "",
    Confirm: "",
    Identity: "",
    phoneNumber: "",
    InsuranceNumber: "",
    taxRecord: "",
  };

  const validationSchema = createValidationSchema({
    taxRecord: companyValidationFields.taxRecord,
    InsuranceNumber: companyValidationFields.InsuranceNumber,
  });
  const handelSignUpForCompany = async (values) => {
    setIsloading(true);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Register-company`,
        values,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("typeOfGenerate", data.data.data);

      window.location.href = "/ActiveEmail";
    } catch (error) {
      toast.error(error.response.data.message);
      setIsloading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelSignUpForCompany,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="signup-background-img-frame"></div>
        <div className="dad-signup-Frame w-100 h-100"></div>
        <div className="sign-Up-container">
          <form
            className="form-container-signUp w-[133px] sm:w-[100px] md:w-[200px] lg:w-[30px]"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h2>انشاء حساب للأعمال</h2>

            <div
              dir="rtl"
              className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
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
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    متطلبات التسجيل:
                  </h3>
                  <p className="text-xs text-blue-700 mb-2">
                    يجب أن يكون الاسم الكامل هو نفسه في السجل التجاري
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      الاسم الكامل: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      البريد الإلكتروني: مطلوب وصحيح
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      رقم الهاتف: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      السجل التجاري: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      كلمة المرور: 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      تأكيد كلمة المرور: يجب أن تتطابق
                    </li>

                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      {" "}
                      رقم الهوية: مطلوب (10 أرقام على الأقل)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="Big-Form-SignUp">
              <div className="SignUp-form-group col-md-6">
                <FormInput 
                  id="taxRecord" 
                  label="السجل التجاري" 
                  placeholder="السجل التجاري" 
                  formik={formik} 
                />
                <FormInput 
                  id="InsuranceNumber" 
                  label="رقم الضريبي" 
                  placeholder="رقم الضريبي" 
                  formik={formik} 
                />
                
                <FormInput 
                  id="Password" 
                  label="كلمه المرور" 
                  type="password"
                  placeholder="كلمه المرور" 
                  formik={formik} 
                  showIcon={true}
                  iconClass="fa-solid fa-lock"
                />
                
                <FormInput 
                  id="Confirm" 
                  label="تأكيد كلمه المرور" 
                  type="password"
                  placeholder="تاكيد كلمه المرور" 
                  formik={formik} 
                  showIcon={true}
                  iconClass="fa-solid fa-lock"
                />
              </div>
              <div className="SignUp-form-group col-md-6">
                <FormInput 
                  id="fullName" 
                  label="الاسم بالكامل" 
                  placeholder="اسم الشركه" 
                  formik={formik} 
                />
                
                <FormInput 
                  id="Email" 
                  label="البريد الإلكتروني" 
                  type="email"
                  placeholder="البريد الالكتروني" 
                  formik={formik} 
                  showIcon={true}
                  iconClass="fa-solid fa-envelope"
                />
                
                <FormInput 
                  id="phoneNumber" 
                  label="رقم الهاتف" 
                  type="tel"
                  placeholder="رقم الهاتف" 
                  formik={formik} 
                />
                
                <FormInput 
                  id="Identity" 
                  label="رقم الهويه" 
                  placeholder="رقم الهويه" 
                  formik={formik} 
                />
              </div>
            </div>

            <div className="signup-button-group">
              <LoadingButton
                isLoading={Isloading}
                loadingText="جارٍ تنفيذ الطلب..."
                type="submit"
                className={Isloading ? "bg-black d-flex text-white justify-content-end" : "register-button-SignUp"}
                disabled={Isloading}
              >
                انشاء حساب
              </LoadingButton>

              <p>
                <Link className="to-SignUp" to="/SignIn">
                  هل لديك حساب بالفعل
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

export default SignUpForCompany;
