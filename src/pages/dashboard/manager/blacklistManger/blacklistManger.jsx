import React from "react";
import AdminUserManagement from "../../../../Component/shared/AdminUserManagement";

export default function BlacklistManger() {
  return (
    <AdminUserManagement
      apiEndpoint="Black-List"
      title="إدارة القائمة السوداء"
      userType="المستخدمين المحظورين"
      addUserPath="/manger/add-blocked-user"
      viewDetailsPath="/manger/blocked-user-details"
      errorMessages={{
        block: "خطأ في حظر المستخدم",
        unblock: "خطأ في إلغاء حظر المستخدم",
        fetch: "خطأ في جلب القائمة السوداء"
      }}
    />
  );
}