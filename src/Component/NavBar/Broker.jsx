import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Columns3Cog,
  Bug,
  ShieldAlert,
  CalendarRange,
  ChartColumnDecreasing,
  ArrowLeftRight,
} from "lucide-react";
import axios from "axios";

export default function Broker() {
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
      label: "العروض المتاحة",
      icon: <Columns3Cog size={20} />,
      path: "/availableOrders",
    },
    {
      label: "العروض الجاريه",
      icon: <Bug size={20} />,
      path: "/currentoffers",
    },
    {
      label: "سجل العروض",
      icon: <ShieldAlert size={20} />,
      path: "/HistoryOfOrders",
    },
    {
      label: "المحول من خدمه العملاء",
      icon: <CalendarRange size={20} />,
      path: "/TransferOrders",
    },
    {
      label: "المحفظة",
      icon: <ChartColumnDecreasing size={20} />,
      path: "/BrookersCart",
    },
    {
      label: "العروض المقدمه",
      icon: <ArrowLeftRight size={20} />,
      path: "/SendOrders",
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
