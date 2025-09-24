import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  RefreshCcw,
  Archive,
  ShoppingCart,
  FileText,
  LogOut,
  Columns3Cog,
  Bug,
  ShieldAlert,
  CalendarRange,
  ChartColumnDecreasing,
  ArrowLeftRight,
  Users,
} from "lucide-react";
import axios from "axios";
import { useState } from "react";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);

  const toggleUserSubMenu = () => setShowUserSubMenu(!showUserSubMenu);

  const SignOut = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/Logout`, {
        withCredentials: true,
      });
      navigate("/SignIn");
    } catch (error) {}
  };

  const navItems = [
    {
      label: "لوحة التحكم",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      label: "المحظورين",
      icon: <ShoppingCart size={20} />,
      path: "/blackList",
    },
    {
      label: "الصلاحيات",
      icon: <FileText size={20} />,
      path: "/permissions",
    },
    {
      label: "عرض الشكاوي",
      icon: <Bug size={20} />,
      path: "/FormResponse",
    },
    {
      label: "إداره الطلبات المنتهيه",
      icon: <ShieldAlert size={20} />,
      path: "/ExpiredOrders",
    },
    {
      label: "عرض الإحصائيات",
      icon: <ChartColumnDecreasing size={20} />,
      path: "/statisticsManger",
    },
    {
      label: "متابعه الطلبات",
      icon: <ArrowLeftRight size={20} />,
      path: "/LogsOrders",
    },
  ];

  const userSubItems = [
    {
      label: "المستخدمين",
      path: "/clients",
      icon: <CheckCircle2 size={18} />,
    },
    {
      label: "المخلصين",
      path: "/brookers",
      icon: <RefreshCcw size={18} />,
    },
    {
      label: "المحاسبين",
      path: "/CpanelAccountant",
      icon: <Archive size={18} />,
    },
    {
      label: "خدمة العملاء",
      path: "/CPanelCustomerService",
      icon: <Columns3Cog size={18} />,
    },
    {
      label: "المديرين",
      path: "/Mangers",
      icon: <CalendarRange size={18} />,
    },
  ];

  return (
    <div
      dir="rtl"
      className="w-64 h-screen p-4 bg-white border-l text-sm relative z-[99999999999999]"
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

        {/* قائمة فرعية للمستخدمين */}
        <li>
          <button
            onClick={toggleUserSubMenu}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            <Users size={20} />
            <span>إدارة المستخدمين</span>
            <span className="ml-auto">{showUserSubMenu ? "▲" : "▼"}</span>
          </button>
          {showUserSubMenu && (
            <ul className="mt-2 ml-4 space-y-2">
              {userSubItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-gray-600"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* تسجيل الخروج */}
        <li className="pt-4">
          <button
            onClick={SignOut}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
          >
            <LogOut size={20} />
            <span>تسجيل خروج</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
