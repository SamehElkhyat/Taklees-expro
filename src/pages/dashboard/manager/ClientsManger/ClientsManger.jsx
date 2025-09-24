import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function ClientsManger() {
  return (
    <AdminUserManagement
      apiEndpoint="Get-User"
      title="إدارة العملاء"
      userType="العملاء"
      addUserPath="/manger/add-client"
      viewDetailsPath="/manger/client-details"
      errorMessages={{
        block: "خطأ في حظر العميل",
        unblock: "خطأ في إلغاء حظر العميل",
        fetch: "خطأ في جلب بيانات العملاء"
      }}
    />
  );
}