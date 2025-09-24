import "./SignUp.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingButton from "../../../Component/shared/LoadingButton";
import FormInput from "../../../Component/shared/FormInput";
import RequirementsInfo from "../../../Component/shared/RequirementsInfo";
import { userValidationFields, createValidationSchema } from "../../../Component/shared/SignUpValidationSchemas";

const SignUp = () => {
  const [Isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = createValidationSchema(userValidationFields);

  const handleSignUp = async (values) => {
    setIsloading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Register-user`,
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
        navigate("/ActiveEmail");
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
    initialValues: {
      Email: "",
      Password: "",
      fullName: "",
      Confirm: "",
      Identity: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: handleSignUp,
  });

  return (
    <motion.div
      className="signup-background-img-frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      
      
      <div className="dad-signup-Frame">
        <div className="signup-Frame">
          <div className="sign-Up-container">
            <form 
              className="form-container-signUp w-[133px] sm:w-[100px] md:w-[200px] lg:w-[30px]"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <h2>تسجيل حساب جديد - الأفراد</h2>
              
              <RequirementsInfo />
              <div className="Big-Form-SignUp">
                <div className="SignUp-form-group col-md-6">
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
                    placeholder="الاسم الكامل"
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
                  className={Isloading ? "bg-black d-flex text-white justify-content-end" : "register-button-SignUp"}
                  type="submit"
                  disabled={Isloading}
                  isLoading={Isloading}
                  loadingText="جارٍ تنفيذ الطلب..."
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
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
