import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Bug,
  ShieldAlert,
  ChartColumnDecreasing,
} from "lucide-react";
import { useState } from "react";

const NonUserSideBar = () => {
  const navItems = [
    {
      label: "إنشاء الحساب",
      icon: <LayoutDashboard size={20} />,
      path: "/IntorSignUp",
    },
    {
      label: "تسجيل الدخول",
      icon: <ShoppingCart size={20} />,
      path: "/SignIn",
    },
    {
      label: "الرئيسية",
      icon: <FileText size={20} />,
      path: "/",
    },
    {
      label: "من نحن",
      icon: <Bug size={20} />,
      path: "/",
    },
    {
      label: "خدماتنا",
      icon: <ShieldAlert size={20} />,
      path: "/",
    },
    {
      label: "تواصل معنا",
      icon: <ChartColumnDecreasing size={20} />,
      path: "/",
    },
  ];

  return (
    <div
      dir="rtl"
      className="w-64 h-screen p-4 bg-white border-l text-sm relative z-[99999999999999999]"
    >
      <ul className="space-y-5">
        {/* العناصر العامة */}
        {navItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "text-gray-700"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NonUserSideBar;
