import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
function ContactForm() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      Email: "",
      phoneNumber: "",
      Message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("الاسم مطلوب"),
      Email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
      Message: Yup.string().required("الرسالة مطلوبة"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_MICROSERVICE4}/Form`,
          {
            fullName: values.fullName,
            Email: values.Email,
            phoneNumber: values.phoneNumber,
            Message: values.Message,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);

        alert("✅ تم إرسال الرسالة بنجاح!");
      } catch (error) {
        alert("❌ حدث خطأ أثناء إرسال النموذج، حاول مرة أخرى.");
      }
    },
  });
  useEffect(() => {
    console.log(process.env);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className="container mt-5" dir="rtl">
        <h2 className="text-center mb-4">تواصل معنا</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* الاسم */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              الاسم
            </label>
            <input
              type="text"
              id="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              name="fullName"
              className="form-control"
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="invalid-feedback">{formik.errors.fullName}</div>
            ) : null}
          </div>

          {/* البريد الإلكتروني */}
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              onChange={formik.handleChange}
              id="Email"
              value={formik.values.Email}
              className="form-control"
              name="Email"
            />
            {formik.touched.Email && formik.errors.Email ? (
              <div className="invalid-feedback">{formik.errors.Email}</div>
            ) : null}
          </div>

          {/* رقم الهاتف */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              رقم الهاتف
            </label>
            <input
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              required
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="invalid-feedback">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>

          {/* الرسالة */}
          <div className="mb-3">
            <label htmlFor="Message" className="form-label">
              الرسالة
            </label>
            <textarea
              id="Message"
              rows="4"
              className="form-control"
              name="Message"
              value={formik.values.Message}
              onChange={formik.handleChange}
            ></textarea>
            {formik.touched.Message && formik.errors.Message ? (
              <div className="invalid-feedback">{formik.errors.Message}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">
            إرسال
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ContactForm;
