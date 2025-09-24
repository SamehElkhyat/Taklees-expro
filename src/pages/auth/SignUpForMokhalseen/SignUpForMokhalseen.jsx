import React, { useState } from "react";
import "./SignUpForMokhalseen.css";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingButton from "../../../Component/shared/LoadingButton";
import RequirementsInfo from "../../../Component/shared/RequirementsInfo";
import { mokhalseenValidationFields, createValidationSchema } from "../../../Component/shared/SignUpValidationSchemas";

const SignUpForMokhalseen = () => {
  const [Isloading, setIsloading] = useState(false);

  const validationSchema = createValidationSchema(mokhalseenValidationFields);
  const handelSignUpForMokhalseen = async (values) => {
    setIsloading(true);

    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Register-Broker`,
        values,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("typeOfGenerate", data.data.data);
      window.location.href = "/ActiveEmail";
    } catch (error) {
      toast.error(error.response.data.message);
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
      InsuranceNumber: "",
      license: "",
      taxRecord: "",
    },
    validationSchema,
    onSubmit: handelSignUpForMokhalseen,
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
            <h2>انشاء حساب للمخلصين</h2>

            <RequirementsInfo
              description="يجب أن يكون الاسم الكامل هو نفسه في السجل التجاري"
              requirements={[
                "الاسم الكامل: مطلوب",
                "رخصه المفاوض: مطلوب",
                "السجل التجاري: مطلوب",
                "رقم الضريبي: مطلوب",
                "البريد الإلكتروني: مطلوب وصحيح",
                "رقم الهاتف: مطلوب",
                "كلمة المرور: 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام",
                "تأكيد كلمة المرور: يجب أن تتطابق",
                "رقم الهوية: مطلوب (10 أرقام على الأقل)"
              ]}
            />
            <div className="Big-Form-SignUp">
              <div className="SignUp-form-group col-md-6">
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  الاسم بالكامل{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    placeholder="اسم الشركه"
                    type="name"
                    id="fullName"
                    name="fullName"
                    required
                  />

                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.fullName}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  البريد الإلكتروني{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    placeholder="البريد الالكتروني"
                    type="text"
                    id="Email"
                    name="Email"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-envelope"></i>{" "}
                  </div>
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Email}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الهاتف{" "}
                </label>
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    placeholder="رقم الهاتف"
                    type="phone"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.phoneNumber}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  {" "}
                  رخصه المفاوض
                </label>
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.license}
                    placeholder="رخصه المفاوض"
                    type="text"
                    id="license"
                    name="license"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.license && formik.errors.license && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.license}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الهويه
                </label>
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Identity}
                    onChange={formik.handleChange}
                    placeholder="رقم الهويه"
                    type="text"
                    id="Identity"
                    name="Identity"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.Identity && formik.errors.Identity && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Identity}
                  </div>
                )}
              </div>

              <div className="SignUp-form-group col-md-6">
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  السجل التجاري{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.taxRecord}
                    onChange={formik.handleChange}
                    placeholder="السجل التجاري"
                    type="text"
                    id="taxRecord"
                    name="taxRecord"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  {formik.touched.taxRecord && formik.errors.taxRecord && (
                    <div className="error-message flex flex-row justify-end">
                      {formik.errors.taxRecord}
                    </div>
                  )}
                </div>
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الضريبي
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.InsuranceNumber}
                    placeholder="رقم الضريبي"
                    type="text"
                    id="InsuranceNumber"
                    name="InsuranceNumber"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                </div>
                {formik.touched.InsuranceNumber &&
                  formik.errors.InsuranceNumber && (
                    <div className="error-message flex flex-row justify-end">
                      {formik.errors.InsuranceNumber}
                    </div>
                  )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  كلمه المرور{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    placeholder=" كلمه المرور"
                    type="password"
                    id="Password"
                    name="Password"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                </div>
                {formik.touched.Password && formik.errors.Password && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Password}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  تأكيد كلمه المرور{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Confirm}
                    onChange={formik.handleChange}
                    placeholder="تاكيد كلمه المرور:"
                    type="password"
                    id="Confirm"
                    name="Confirm"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                </div>
                {formik.touched.Confirm && formik.errors.Confirm && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Confirm}
                  </div>
                )}
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

export default SignUpForMokhalseen;
