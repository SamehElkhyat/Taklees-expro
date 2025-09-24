import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useSafeNavigation } from "../../../../hooks/useSafeNavigation";
import { v4 as uuidv4 } from "uuid";

const NewOrderForm = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [fileInputs, setFileInputs] = useState([0]); // تبدأ بحقل واحد فقط
  const [ShowInputs, setShowInputs] = useState("null");
  const [DecodedTokken, setDecodedTokken] = useState();
  const { navigate } = useSafeNavigation();
  const handelShowInputs = (e) => {
    setShowInputs(e.target.value);
  };

  const navigationToLandingpage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Profile`,
        {
          withCredentials: true,
        }
      );
      setDecodedTokken(data.role);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("موقع الطلب مطلوب"),
    numberOfLicense: Yup.string()
      .required("رقم البوليصة مطلوب")
      .matches(/^\d+$/, "يجب أن يكون رقمًا فقط"),

    Notes: Yup.string().required("الملاحظات مطلوبه"),

    Town: Yup.string()
      .nullable()
      .test("required-if-showInputs-not-null", "الحي مطلوب", function (value) {
        if (ShowInputs !== "null") {
          return !!value && value.trim() !== ""; // التأكد من أن القيمة ليست فارغة
        }
        return true; // إذا كان ShowInputs يساوي null، لا يتم التحقق
      }),

    zipCode: Yup.string()
      .nullable()
      .test(
        "required-if-showInputs-not-null",
        "الرمز البريدي مطلوب",
        function (value) {
          if (ShowInputs !== "null") {
            return !!value && value.trim() !== "";
          }
          return true;
        }
      ),

    City: Yup.string()
      .nullable()
      .test(
        "required-if-showInputs-not-null",
        "المدينة مطلوبة",
        function (value) {
          if (ShowInputs !== "null") {
            return !!value && value.trim() !== "";
          }
          return true;
        }
      ),

    numberOfTypeOrders: Yup.array()
      .of(
        Yup.object().shape({
          Number: Yup.number()
            .typeError("يجب إدخال عدد صحيح")
            .positive("يجب أن يكون العدد أكبر من 0")
            .required("عدد الطلب مطلوب"),
          typeOrder: Yup.string().required("نوع الطلب مطلوب"),
          Weight: Yup.number().when("typeOrder", {
            is: (val) => val !== "حاويه",
            then: (schema) =>
              schema
                .typeError("يجب إدخال وزن صحيح")
                .positive("يجب أن يكون الوزن أكبر من 0")
                .required("الوزن مطلوب"),
            otherwise: (schema) => schema.nullable(),
          }),
          Size: Yup.string().when("typeOrder", {
            is: "حاويه",
            then: (schema) => schema.required("حجم الحاوية مطلوب"),
            otherwise: (schema) => schema.nullable(),
          }),
        })
      )
      .min(1, "يجب إضافة طلب واحد على الأقل"),

    uploadFile: Yup.array()
      .required("يجب رفع كل الملفات") // تأكيد وجود ملفات
      .min(5, "يجب رفع جميع الملفات") // يضمن وجود ملف واحد على الأقل
      .test("fileSize", "أحد الملفات يتجاوز الحجم المسموح (5MB)", (files) =>
        files?.length
          ? files.every((file) => file.size <= 5 * 1024 * 1024)
          : false
      )
      .test("fileType", "نوع الملف غير مدعوم", (files) =>
        files?.length
          ? files.every((file) =>
              [
                "application/pdf",
                "image/jpeg",
                "image/png",
                "image/jpg",
              ].includes(file.type)
            )
          : false
      ),
  });

  const handleOrder = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    // أضف الحقول النصية إلى FormData
    formData.append("Location", values.location);
    formData.append("numberOfLicense", values.numberOfLicense);
    formData.append("City", values.City);
    formData.append("zipCode", values.zipCode);
    formData.append("Town", values.Town);
    formData.append("Notes", values.Notes);
    values.numberOfTypeOrders.forEach((order, index) => {
      formData.append(`numberOfTypeOrders[${index}][Number]`, order.Number);
      formData.append(
        `numberOfTypeOrders[${index}][typeOrder]`,
        order.typeOrder
      );
      formData.append(`numberOfTypeOrders[${index}][Size]`, order.Size);
      if (order.typeOrder !== "حاويه") {
        formData.append(`numberOfTypeOrders[${index}][Weight]`, order.Weight);
      }
    });
    values.uploadFile.forEach((file) => {
      formData.append("uploadFile", file);
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/New-Order`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsLoading(false);
      if (DecodedTokken === "Admin") {
        navigate("/availableOrders");
      } else {
        navigate("/Orders");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  let formik = useFormik({
    initialValues: {
      location: "",
      numberOfLicense: "",
      Notes: "",
      City: "",
      zipCode: "",
      Town: "",
      numberOfTypeOrders: [{ Number: "", typeOrder: "", Weight: "", Size: "" }],
      uploadFile: [],
    },
    validationSchema,
    onSubmit: handleOrder,
  });
  // إضافة طلب جديد
  const addOrder = () => {
    formik.setFieldValue("numberOfTypeOrders", [
      ...formik.values.numberOfTypeOrders,
      { Number: "", typeOrder: "", Weight: "", Size: "" },
    ]);
  };
  const addFiles = () => {
    setFileInputs([...fileInputs, fileInputs.length]);
  };
  const removeOrder = (index) => {
    const updatednumberOfTypeOrders = formik.values.numberOfTypeOrders.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("numberOfTypeOrders", updatednumberOfTypeOrders);
  };
  // تحديث الملفات
  const handleFileChange = (e) => {
    formik.setFieldValue("uploadFile", [
      ...formik.values.uploadFile,
      ...e.target.files,
    ]);
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    let newFiles = Array.from(e.target.files);
    // تصفية الملفات غير المسموحة
    newFiles = newFiles.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`نوع الملف غير مدعوم: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`حجم الملف ${file.name} يتجاوز 5MB`);
        return false;
      }
      return true;
    });
    // تحديث الملفات المقبولة فقط
    formik.setFieldValue("uploadFile", [
      ...formik.values.uploadFile,
      ...newFiles,
    ]);
  };
  useEffect(() => {
    navigationToLandingpage();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] container text-center d-flex flex-column gap-3 mt-3 sm:mt-4 md:mt-5 p-2 sm:p-3 md:p-4">
        <Toaster
          className="bg-dark position-absolute"
          position="top-center"
          reverseOrder={false}
        />
        <Form id="New-Order-form" onSubmit={formik.handleSubmit}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002E5D] p-2 sm:p-3 md:p-4">
            طلب جديد
          </h3>
          {/* موقع الطلب */}

          <div className="all-col w-full flex flex-col lg:flex-row text-[#002E5B] gap-3 sm:gap-4">
            <div className="w-full lg:w-1/2 first-col flex flex-col">
              <Form.Group className="p-2 sm:p-3 text-end" controlId="location">
                <Form.Label className="text-sm sm:text-base">
                  موقع الطلب
                </Form.Label>
                <Form.Control
                  className="text-end text-[#002E5D] text-sm sm:text-base"
                  as="select"
                  placeholder="أدخل موقع الطلب"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                >
                  <option value="">اختر موقع الطلب</option>
                  <option value="ميناء الملك عبد العزيز بالدمام">
                    ميناء الملك عبد العزيز بالدمام
                  </option>
                  <option value="ميناء الملك فهد الصناعي بينبع">
                    ميناء الملك فهد الصناعي بينبع
                  </option>
                  <option value="ميناء الجبيل التجاري">
                    ميناء الجبيل التجاري
                  </option>
                  <option value="ميناء الملك فهد الصناعي بالجبيل">
                    ميناء الملك فهد الصناعي بالجبيل
                  </option>
                  <option value="ميناء ينبع التجاري">ميناء ينبع التجاري</option>
                  <option value="ميناء جازان">ميناء جازان</option>
                  <option value="ميناء رأس تنورة">ميناء رأس تنورة</option>
                  <option value="ميناء رأس الخير">ميناء رأس الخير</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة مطار الملك عبد العزيز الدولي">
                    جدة (مطار الملك عبد العزيز الدولي)
                  </option>
                  <option value="الدمام">الدمام</option>
                  <option value="المدينةالمنورة">المدينة المنورة</option>
                  <option value="الطائف">الطائف</option>
                  <option value="الأحساء">الأحساء</option>
                  <option value="القيصومة">القيصومة</option>
                  <option value="رفحاء">رفحاء</option>
                  <option value="عرعر">عرعر</option>
                  <option value="طريف">طريف</option>
                  <option value="القريات">القريات</option>
                  <option value="الجوف">الجوف</option>
                  <option value="حائل">حائل</option>
                  <option value="القصيم">القصيم</option>
                  <option value="الدوادمي">الدوادمي</option>
                  <option value="وادي الدواسر">وادي الدواسر</option>
                  <option value="بيشة">بيشة</option>
                  <option value="الباحة">الباحة</option>
                  <option value="نجران">نجران</option>
                  <option value="شرورة">شرورة</option>
                  <option value="أبها">أبها</option>
                  <option value="جازان">جازان</option>
                  <option value="ينبع">ينبع</option>
                  <option value="الوجه">الوجه</option>
                  <option value="العلا">العلا</option>
                  <option value="تبوك">تبوك</option>
                  <option value="نيوم">نيوم</option>
                </Form.Control>
                {formik.touched.location && formik.errors.location && (
                  <div className="error-message text-sm">
                    {formik.errors.location}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                dir="rtl"
                className="p-2 sm:p-3 text-end"
                controlId="numberOfLicense"
              >
                <Form.Label className="text-end text-[#002E5D] text-sm sm:text-base">
                  رقم البوليصة
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="رقم البوليصة"
                  name="numberOfLicense"
                  value={formik.values.numberOfLicense}
                  onChange={formik.handleChange}
                  className="text-sm sm:text-base"
                />
                {formik.touched.numberOfLicense &&
                  formik.errors.numberOfLicense && (
                    <div className="error-message text-sm">
                      {formik.errors.numberOfLicense}
                    </div>
                  )}
              </Form.Group>
            </div>
            <div className="seconde-col w-full lg:w-1/2 flex flex-col">
              <Form.Group
                dir="rtl"
                className="p-2 sm:p-3 text-end"
                controlId="Notes"
              >
                <Form.Label className="text-[#002E5D] text-sm sm:text-base">
                  ملاحظات الطلب
                </Form.Label>
                <Form.Control
                  className="border border-[40px] rounded-[10px] text-sm sm:text-base"
                  type="text"
                  placeholder="ملاحظات الطلب"
                  name="Notes"
                  value={formik.values.Notes}
                  onChange={formik.handleChange}
                />
                {formik.touched.Notes && formik.errors.Notes && (
                  <div className="error-message text-sm">
                    {formik.errors.Notes}
                  </div>
                )}
              </Form.Group>

              {/* الموقع بالتفصيل */}

              <Form.Group className="p-2 sm:p-3 text-end">
                <Form.Label className="text-sm sm:text-base">
                  نوع النقل
                </Form.Label>
                <Form.Control
                  className="text-end text-sm sm:text-base"
                  onClick={(e) => handelShowInputs(e)}
                  as="select"
                >
                  <option value="null">اختر نوع الطلب</option>
                  <option value="true">خدمه توصيل</option>
                  <option value="null">بدون خدمه توصيل</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {ShowInputs === "null" ? null : (
            <div className="d-flex flex-col sm:flex-row justify-content-center m-3 sm:m-5 gap-3">
              <Form.Group className="Inputs-New-Order flex-1" controlId="City">
                <Form.Label className="text-sm sm:text-base">
                  المدينه
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.City}
                  onChange={formik.handleChange}
                  className="text-sm sm:text-base"
                />
                {formik.touched.City && formik.errors.City && (
                  <div className="error-message text-sm">
                    {formik.errors.City}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="Inputs-New-Order flex-1" controlId="Town">
                <Form.Label className="text-sm sm:text-base">الحي</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.Town}
                  onChange={formik.handleChange}
                  className="text-sm sm:text-base"
                />
                {formik.touched.Town && formik.errors.Town && (
                  <div className="error-message text-sm">
                    {formik.errors.Town}
                  </div>
                )}
              </Form.Group>

              <Form.Group
                className="Inputs-New-Order flex-1"
                controlId="zipCode"
              >
                <Form.Label className="text-sm sm:text-base">
                  الرمز البريدي
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  className="text-sm sm:text-base"
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="error-message text-sm">
                    {formik.errors.zipCode}
                  </div>
                )}
              </Form.Group>
            </div>
          )}

          {/* الحقول الديناميكية */}

          <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002E5D] p-3 sm:p-4 md:p-5">
            تفاصيل الطلبات
          </h5>
          {formik.values.numberOfTypeOrders.map((order, index) => (
            <div key={uuidv4()} className="border rounded-[30px] p-3 mb-3">
              <Form.Group controlId={`numberOfTypeOrders[${index}][typeOrder]`}>
                <Form.Label className="text-sm sm:text-base">
                  نوع الطلب
                </Form.Label>
                <Form.Control
                  as="select"
                  value={order.typeOrder}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.numberOfTypeOrders];
                    updatedOrders.forEach((order, index) => {
                      if (index === 0) {
                        order.typeOrder = e.target.value;
                      }
                    });

                    if (e.target.value === "حاويه") {
                      updatedOrders.forEach((order, index) => {
                        if (index === 0) {
                          order.typeOrder = e.target.value;
                        }
                      });
                    }

                    formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                  }}
                  className="text-sm sm:text-base"
                >
                  <option value="">اختر نوع الطلب</option>
                  <option value="طبليه">طبليه</option>
                  <option value="حاويه">حاويه</option>
                </Form.Control>
              </Form.Group>

              {formik.errors.numberOfTypeOrders?.map((order, index) => (
                <div key={uuidv4()} className="text-danger text-sm">
                  {order.typeOrder}
                </div>
              ))}
              <Form.Group controlId={`numberOfTypeOrders[${index}][Number]`}>
                <Form.Label className="text-sm sm:text-base">عدد</Form.Label>
                <Form.Control
                  type="number"
                  value={order.Number}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.numberOfTypeOrders];
                    updatedOrders.forEach((order, index) => {
                      if (index === 0) {
                        order.Number = e.target.value;
                      }
                    });
                    formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                  }}
                  className="text-sm sm:text-base"
                />
                {formik.errors.numberOfTypeOrders?.map((order, index) => (
                  <div key={uuidv4()} className="text-danger text-sm">
                    {order.Number}
                  </div>
                ))}
              </Form.Group>

              {/* حقل الوزن يظهر فقط إذا لم يكن نوع الطلب "حاوية" */}
              {order.typeOrder !== "حاويه" && (
                <Form.Group controlId={`numberOfTypeOrders[${index}][Weight]`}>
                  <Form.Label className="text-sm sm:text-base">
                    الوزن
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={order.Weight}
                    onChange={(e) => {
                      const updatedOrders = [
                        ...formik.values.numberOfTypeOrders,
                      ];

                      updatedOrders.forEach((order, index) => {
                        if (index === 0) {
                          order.Weight = e.target.value;
                        }
                      });
                      formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                    }}
                    className="text-sm sm:text-base"
                  />
                  {formik.errors.numberOfTypeOrders?.map((order, index) => (
                    <div key={uuidv4()} className="text-danger text-sm">
                      {order.Weight}
                    </div>
                  ))}
                </Form.Group>
              )}

              {order.typeOrder === "حاويه" && (
                <Form.Group controlId={`numberOfTypeOrders[${index}][Size]`}>
                  <Form.Label className="text-sm sm:text-base">
                    الحجم
                  </Form.Label>

                  <Form.Control
                    as="select"
                    value={order.Size}
                    onChange={(e) => {
                      const updatedOrders = [
                        ...formik.values.numberOfTypeOrders,
                      ];
                      updatedOrders.forEach((order, index) => {
                        if (index === 0) {
                          order.Size = e.target.value;
                        }
                      });
                      formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                    }}
                    className="text-sm sm:text-base"
                  >
                    <option value="">اختر حجم الحاويه</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                  </Form.Control>
                  {formik.errors.numberOfTypeOrders?.map((order) => (
                    <div key={uuidv4()} className="text-danger text-sm">
                      {order.Size}
                    </div>
                  ))}
                </Form.Group>
              )}
              <button
                onClick={() => removeOrder(index)}
                className="mt-2 bg-[var(--danger--)] p-[10px] px-4 py-2 text-white rounded-[20px] shadow text-sm sm:text-base w-full sm:w-auto"
              >
                حذف الطلب
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addOrder()}
            className="bg-[var(--secondColor--)] p-[10px] px-4 py-2 text-white rounded-[20px] shadow text-sm sm:text-base w-full sm:w-auto"
          >
            إضافة طلب جديد
          </button>
          <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002E5D] p-3 sm:p-4">
            {" "}
            الملفات
          </h5>
          <Form.Group controlId="orderFiles" className="mt-4">
            <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
              سجل التجاري
            </Form.Label>
            <InputGroup className="border rounded-3 shadow-sm bg-white overflow-hidden">
              <FormControl
                className="border rounded-3 shadow-sm bg-white overflow-hidden text-sm sm:text-base"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </InputGroup>
            {formik.touched.uploadFile && formik.errors.uploadFile && (
              <div className="error-message text-danger mt-2 text-sm">
                {formik.errors.uploadFile}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="orderFiles" className="mt-4">
            <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
              السجل الضريبي
            </Form.Label>
            <InputGroup className="border rounded-3 shadow-sm bg-white overflow-hidden">
              <FormControl
                className="border rounded-3 shadow-sm bg-white overflow-hidden text-sm sm:text-base"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </InputGroup>
            {formik.touched.uploadFile && formik.errors.uploadFile && (
              <div className="error-message text-danger mt-2 text-sm">
                {formik.errors.uploadFile}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="orderFiles" className="mt-4">
            <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
              البوليصة
            </Form.Label>
            <InputGroup className="border rounded-3 shadow-sm bg-white overflow-hidden">
              <FormControl
                type="file"
                multiple
                onChange={handleFileChange}
                className="border rounded-3 shadow-sm bg-white overflow-hidden text-sm sm:text-base"
              />
            </InputGroup>
            {formik.touched.uploadFile && formik.errors.uploadFile && (
              <div className="error-message text-danger mt-2 small text-sm">
                {formik.errors.uploadFile}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="orderFiles" className="mt-4">
            <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
              شهاده المنشأ
            </Form.Label>
            <InputGroup className="border rounded-3 shadow-sm bg-white overflow-hidden">
              <FormControl
                className="border rounded-3 shadow-sm bg-white overflow-hidden text-sm sm:text-base"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </InputGroup>
            {formik.touched.uploadFile && formik.errors.uploadFile && (
              <div className="error-message text-danger mt-2 text-sm">
                {formik.errors.uploadFile}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="orderFiles" className="mt-4">
            <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
              ملفات اخري
              <br />
              <span className="text-danger text-xs sm:text-sm">
                (اي رخص او شهادات تتعلق بالطلب)
              </span>{" "}
            </Form.Label>
            {formik.touched.uploadFile && formik.errors.uploadFile && (
              <div className="error-message text-danger mt-2 text-sm">
                {formik.errors.uploadFile}
              </div>
            )}
            <InputGroup>
              <FormControl
                className="border rounded-3 shadow-sm bg-white overflow-hidden text-sm sm:text-base"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </InputGroup>
          </Form.Group>

          <div>
            {fileInputs.map((id) => (
              <Form.Group controlId="orderFiles" className="mt-4" key={id}>
                <Form.Label className="fw-semibold text-[#002E5D] text-sm sm:text-base">
                  ملفات إضافية{" "}
                </Form.Label>
                <InputGroup>
                  <FormControl
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="text-sm sm:text-base"
                  />
                </InputGroup>
                {formik.touched.uploadFile && formik.errors.uploadFile && (
                  <div className="error-message text-danger mt-2 text-sm">
                    {formik.errors.uploadFile}
                  </div>
                )}
              </Form.Group>
            ))}
          </div>

          <button
            type="button"
            style={{ marginTop: "20px" }}
            onClick={() => addFiles()}
            className="bg-[var(--secondColor--)] p-[10px] px-4 py-2 text-white rounded-[20px] shadow text-sm sm:text-base w-full sm:w-auto"
          >
            إضافة ملف أخر
          </button>

          {IsLoading ? (
            <Button
              variant="primary"
              className="d-flex justify-content-end w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="d-flex justify-content-end w-full sm:w-auto"
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2 text-danger d-flex justify-content-end mt-1"
                />
                <output className="text-sm sm:text-base">
                  جارٍ تنفيذ الطلب...
                </output>
              </Button>

              <span className="text-sm sm:text-base">جارٍ تنفيذ الطلب...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="flex flex-row justify-end bg-[var(--maincolor--)] p-[10px] px-4 py-2 text-white rounded-[20px] shadow text-sm sm:text-base w-full sm:w-auto"
            >
              تقديم الطلب
            </button>
          )}
        </Form>
      </div>
    </motion.div>
  );
};
export default NewOrderForm;
