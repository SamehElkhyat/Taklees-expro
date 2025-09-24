import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  RefreshCcw,
  Archive,
  ShoppingCart,
  LogOut,
  Columns3Cog,
  CalendarRange,
  ChartColumnDecreasing,
  ArrowLeftRight,
} from "lucide-react";
import axios from "axios";
export default function Manger() {
  const navigate = useNavigate();

  const SignOut = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Logout`, {
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
      label: "المستخدمين",
      icon: <CheckCircle2 size={20} />,
      path: "/clients",
    },
    {
      label: "المخلصين",
      icon: <RefreshCcw size={20} />,
      path: "/brookers",
    },
    {
      label: "المحاسبين",
      icon: <Archive size={20} />,
      path: "/CpanelAccountant",
    },
    {
      label: "المحظورين",
      icon: <ShoppingCart size={20} />,
      path: "/blackList",
    },
    {
      label: "خدمه العملاء",
      icon: <Columns3Cog size={20} />,
      path: "/CPanelCustomerService",
    },
    {
      label: "إداره المديرين",
      icon: <CalendarRange size={20} />,
      path: "/Mangers",
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

  return (
    <>
      <div
        dir="rtl"
        className="w-64 h-screen p-4 bg-white border-l text-sm position-relative z-50 relative "
      >
        <ul className="space-y-5">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition z-50 relative  ${
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

          {/* تسجيل الخروج */}
          <li className="pt-4">
            <button
              onClick={() => SignOut()}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
            >
              {" "}
              <LogOut size={20} />
              <span>تسجيل خروج</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
