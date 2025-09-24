import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function CpanelAccountantManger() {
  return (
    <AdminUserManagement
      apiEndpoint="Get-Account"
      title="إدارة المحاسبين"
      userType="المحاسبين"
      addUserPath="/manger/add-accountant"
      viewDetailsPath="/manger/accountant-details"
      errorMessages={{
        block: "خطأ في حظر المحاسب",
        unblock: "خطأ في إلغاء حظر المحاسب",
        fetch: "خطأ في جلب بيانات المحاسبين"
      }}
    />
  );
}