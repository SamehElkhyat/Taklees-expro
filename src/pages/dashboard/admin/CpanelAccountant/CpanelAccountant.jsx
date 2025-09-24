import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function CpanelAccountant() {
  return (
    <AdminUserManagement
      apiEndpoint="Get-Account"
      title="لوحة التحكم - المحاسبين"
      userType="المحاسبين"
      addUserPath="/add-accountant"
      viewDetailsPath="/accountant-details"
      errorMessages={{
        block: "خطأ في حظر المحاسب",
        unblock: "خطأ في إلغاء حظر المحاسب",
        fetch: "خطأ في جلب بيانات المحاسبين"
      }}
    />
  );
}