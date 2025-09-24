import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  CalendarRange,
} from "lucide-react";
import axios from "axios";

export default function Accountant() {
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
      label: "قائمه الحوالات للمخلصين",
      icon: <ShieldAlert size={20} />,
      path: "/AcceptedOrderAccountant",
    },
    {
      label: "سجل الحوالات المنفذه",
      icon: <CalendarRange size={20} />,
      path: "/HistoryDoneOrder",
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
