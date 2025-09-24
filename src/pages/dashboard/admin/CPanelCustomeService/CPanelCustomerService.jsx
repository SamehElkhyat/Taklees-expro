import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function CPanelCustomerService() {
  return (
    <AdminUserManagement
      apiEndpoint="Get-CustomerService"
      title="لوحة التحكم - خدمة العملاء"
      userType="موظفي خدمة العملاء"
      addUserPath="/add-customer-service"
      viewDetailsPath="/customer-service-details"
      errorMessages={{
        block: "خطأ في حظر موظف خدمة العملاء",
        unblock: "خطأ في إلغاء حظر موظف خدمة العملاء",
        fetch: "خطأ في جلب بيانات موظفي خدمة العملاء"
      }}
    />
  );
}