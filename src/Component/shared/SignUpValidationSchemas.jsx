import * as Yup from "yup";

/**
 * Common validation schemas for signup forms
 */

// Base validation fields used across signup forms
export const baseValidationFields = {
  Email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  
  Password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(8, "يجب أن تحتوي على 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام"),
  
  fullName: Yup.string()
    .required("الاسم الكامل مطلوب"),
  
  Confirm: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("Password")], "كلمات المرور غير متطابقة"),
  
  Identity: Yup.string()
    .required("رقم الهويه مطلوب"),
  
  phoneNumber: Yup.string()
    .required("رقم الهاتف مطلوب"),
};

// Company-specific validation fields
export const companyValidationFields = {
  ...baseValidationFields,
  taxRecord: Yup.string()
    .required("السجل التجاري مطلوب"),
  
  InsuranceNumber: Yup.string()
    .required("رقم الضريبي مطلوب"),
};

// Broker/Mokhalseen-specific validation fields
export const mokhalseenValidationFields = {
  ...baseValidationFields,
  taxRecord: Yup.string()
    .required("السجل التجاري مطلوب"),
  
  InsuranceNumber: Yup.string()
    .required("رقم الضريبي مطلوب"),
  
  license: Yup.string()
    .required("رقم المفاوض مطلوب"),
};

// Individual user validation fields
export const userValidationFields = {
  ...baseValidationFields,
};

/**
 * Create validation schema with additional fields
 * @param {Object} additionalFields - Additional validation fields to merge
 * @returns {Yup.ObjectSchema} - Complete validation schema
 */
export const createValidationSchema = (additionalFields = {}) => {
  return Yup.object({
    ...baseValidationFields,
    ...additionalFields
  });
};

export default {
  baseValidationFields,
  companyValidationFields,
  mokhalseenValidationFields,
  userValidationFields,
  createValidationSchema
};
