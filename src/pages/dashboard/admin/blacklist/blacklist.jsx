import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function Blacklist() {
  return (
    <AdminUserManagement
      apiEndpoint="Black-List"
      title="القائمة السوداء"
      userType="المستخدمين المحظورين"
      addUserPath="/admin/add-blocked-user"
      viewDetailsPath="/admin/blocked-user-details"
      errorMessages={{
        block: "خطأ في حظر المستخدم",
        unblock: "خطأ في إلغاء حظر المستخدم", 
        fetch: "خطأ في جلب القائمة السوداء"
      }}
    />
  );
}