import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function CPanelCustomerServiceManger() {
  return (
    <AdminUserManagement
      apiEndpoint="Get-CustomerService"
      title="إدارة موظفي خدمة العملاء"
      userType="موظفي خدمة العملاء"
      addUserPath="/manger/add-customer-service"
      viewDetailsPath="/manger/customer-service-details"
      errorMessages={{
        block: "خطأ في حظر موظف خدمة العملاء",
        unblock: "خطأ في إلغاء حظر موظف خدمة العملاء",
        fetch: "خطأ في جلب بيانات موظفي خدمة العملاء"
      }}
    />
  );
}