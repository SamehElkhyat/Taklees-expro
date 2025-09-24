import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../../store/Slice/GetDataApiReducer";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

export default function LandingPageAdmin() {
  const [userProfile, setuserProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [notactiveusers, setNotActiveUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = [
    {
      title: "الشكاوى الجديدة",
      icon: (
        <FaBoxOpen className="text-red-400 bg-red-100 p-2 rounded-full w-8 h-8 md:w-10 md:h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
    {
      title: "الإيرادات الشهرية",
      icon: (
        <FaCalendarAlt className="text-purple-400 bg-purple-100 p-2 rounded-full w-8 h-8 md:w-10 md:h-10" />
      ),
      value: "12,543",
      change: "-12.5%",
      changeColor: "text-red-500",
      iconArrow: "↘️",
    },
    {
      title: "إجمالي الطلبات",
      icon: (
        <FaClipboardList className="text-green-400 bg-green-100 p-2 rounded-full w-8 h-8 md:w-10 md:h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
    {
      title: "إجمالي المستخدمين",
      icon: (
        <FaUsers className="text-blue-400 bg-blue-100 p-2 rounded-full w-8 h-8 md:w-10 md:h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
  ];

  const data = [
    {
      name: "يناير",
      uv: 3000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "فبراير",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "مارس",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "إبريل",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "مايو",
      uv: 4200,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "يونيو",
      uv: 5040,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "يوليو",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "أغسطس",
      uv: 3000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "سيبتمبر",
      uv: 3780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "اكتوبر",
      uv: 4890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "نوفمبر",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "ديسمبر",
      uv: 7490,
      pv: 1300,
      amt: 2100,
    },
  ];
  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());
    setuserProfile(payload);
  };
  const ActiveUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Active-Users`,
        { withCredentials: true }
      );
      setUsers(data);
    } catch (error) {}
  };
  const NotActiveUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Not-Active-Users`,
        { withCredentials: true }
      );
      setNotActiveUsers(data);
    } catch (error) {}
  };
  useEffect(() => {
    navigationToLandingpage();
    ActiveUsers();
    NotActiveUsers();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Container className="text-center mt-3 md:mt-5 px-2 md:px-4">
        {userProfile !== null && userProfile !== undefined ? (
          <>
            {userProfile.role === "Admin" ? (
              <>
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-center">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm p-3 md:p-4 w-full sm:w-48 md:w-64 flex flex-col gap-2 items-start"
                    >
                      {card.icon}
                      <div
                        className={`${card.changeColor} text-xs md:text-sm flex items-center gap-1`}
                      >
                        {card.change} <span>{card.iconArrow}</span>
                      </div>
                      <div className="text-gray-700 font-medium text-sm md:text-base">
                        {card.title}
                      </div>
                      <div className="text-black font-bold text-base md:text-lg">
                        {card.value}
                      </div>
                    </div>
                  ))}
                </div>

                <Row className="flex flex-col lg:flex-row justify-center w-full mt-4 md:mt-6">
                  <div className="w-full p-2 md:p-3">
                    <div className="bg-[#FFFFFA] w-full flex flex-col xl:flex-row justify-center p-3 md:p-5 border rounded-[20px] md:rounded-[40px]">
                      {/* Bar Chart Section */}
                      <div className="w-full xl:w-1/2 p-2 md:p-4">
                        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                          <h3 className="text-lg md:text-xl font-bold text-center mb-3 md:mb-4 text-gray-800">
                            إحصائيات الطلبات
                          </h3>
                          <div
                            className="flex justify-center items-center"
                            style={{
                              width: "100%",
                              height: "250px",
                              minHeight: "200px",
                              maxHeight: "300px",
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={data}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="name"
                                  fontSize={12}
                                  tick={{
                                    fontSize: window.innerWidth < 768 ? 10 : 12,
                                  }}
                                />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Bar
                                  dataKey="uv"
                                  fill="#8884d8"
                                  radius={[4, 4, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex justify-center mt-3 md:mt-4">
                            <button
                              onClick={() => navigate("/LogsOrders")}
                              className="bg-[#1DA9E3] px-4 md:px-6 py-2 md:py-3 text-white rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base font-medium hover:bg-[#1a8bc7] transition-colors"
                            >
                              متابعه الطلبات
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Area Chart Section */}
                      <div className="w-full xl:w-1/2 p-2 md:p-4">
                        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                          <h3 className="text-lg md:text-xl font-bold text-center mb-3 md:mb-4 text-gray-800">
                            نظرة عامة على النشاط
                          </h3>
                          <div
                            className="flex justify-center items-center"
                            style={{
                              width: "100%",
                              height: "250px",
                              minHeight: "200px",
                              maxHeight: "300px",
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={data}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="name"
                                  fontSize={12}
                                  tick={{
                                    fontSize: window.innerWidth < 768 ? 10 : 12,
                                  }}
                                />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Area
                                  type="monotone"
                                  dataKey="uv"
                                  stackId="1"
                                  stroke="#FF928A"
                                  fill="#FF928A4D"
                                  strokeWidth={2}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="amt"
                                  stackId="1"
                                  stroke="#8979FF"
                                  fill="#8979FF4D"
                                  strokeWidth={2}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex justify-center mt-3 md:mt-4">
                            <button
                              onClick={() => navigate("/statisticsManger")}
                              className="text-[black] bg-[var(--maincolor--)] px-4 md:px-6 py-2 md:py-3 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
                            >
                              عرض الإحصائيات
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="first-col-use flex flex-col justify-start w-full lg:w-[30%] mt-4 lg:mt-0">
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end text-[#6B7280]">
                              <h5 className="text-[#22C55E] card-title font-bold text-lg md:text-xl ">
                                المستخدمين
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>
                              <button
                                onClick={() => navigate("/clients")}
                                className="card-text text-right mt-2 text-[var(--button--)] bg-[var(--backGround-Button--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل المستخدمين
                              </button>
                            </div>
                            <div className="increase">
                              <span className="arrow">⬆</span>صعود 12.5%
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute bg-[orange] border rounded-[30px] md:rounded-[40px] p-[4px] md:p-[5px]">
                              <i className="fa-solid fa-paper-plane text-[16px] md:text-[20px] p-1 md:p-2 text-white"></i>
                            </div>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                المخلصين
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                طلب
                              </p>

                              <button
                                onClick={() => navigate("/brookers")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل المخلصين
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col>
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute bg-[red] border rounded-[30px] md:rounded-[40px] p-[4px] md:p-[5px]">
                              <i className="fa-solid fa-ban text-[16px] md:text-[20px] p-1 md:p-2 text-white text-start"></i>
                            </div>

                            <div className="text-end">
                              <h5 className="text-[var(--danger--)] card-title font-bold text-lg md:text-xl">
                                المحظورين
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>

                              <button
                                onClick={() => navigate("/blackList")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--danger--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل المحظورين
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </div>
                  <div className="first-col-use flex flex-col justify-start w-full lg:w-[30%] mt-4 lg:mt-0">
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute border rounded-[30px] md:rounded-[40px] p-[4px] md:p-[5px] bg-[var(--maincolor--)] ">
                              <i className="p-1 md:p-2 text-end w-100 fa-solid fa-receipt text-white text-[16px] md:text-[20px] text-start"></i>
                            </div>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                المحاسبين
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>

                              <button
                                onClick={() => navigate("/CpanelAccountant")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل المحاسبين
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                الصلاحيات
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                طلب
                              </p>

                              <button
                                onClick={() => navigate("/permissions")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض وإدارة الصلاحيات
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col>
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end">
                              <h5 className="text-[var(--succsses--)] card-title font-bold text-lg md:text-xl">
                                خدمه العملاء
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>

                              <button
                                onClick={() =>
                                  navigate("/CPanelCustomerService")
                                }
                                className="card-text text-right mt-2 text-[var(--button--)] bg-[var(--backGround-Button--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض خدمه العملاء
                              </button>
                              <div className="increase">
                                <span className="arrow">⬆</span>صعود 12.5%
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </div>
                  <div className="first-col-use flex flex-col justify-start w-full lg:w-[30%] mt-4 lg:mt-0">
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                عرض الشكاوي
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>

                              <button
                                onClick={() => navigate("/FormResponse")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل الشكاوي
                              </button>
                              <div className="decrease">
                                <span className="arrow">⬇</span>انخفاض 12.5%
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="">
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                إداره الطلبات المنتهيه
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                طلب
                              </p>

                              <button
                                onClick={() => navigate("/ExpiredOrders")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض و إداره الطلبات المنتهيه
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                    <div className="box">
                      <Col>
                        <Card className="text-center mb-3 p-2 md:p-3 shadow-lg">
                          <Card.Body>
                            <div className="text-end">
                              <h5 className="text-[#6B7280] card-title font-bold text-lg md:text-xl">
                                إداره المديرين
                              </h5>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-end md:text-[20px]"
                              >
                                28374
                              </p>

                              <button
                                onClick={() => navigate("/Mangers")}
                                className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-3 md:px-4 py-2 rounded-[15px] md:rounded-[20px] shadow text-sm md:text-base"
                              >
                                عرض كل المديرين
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </div>
                  <div
                    className="p-3 md:p-4 m-2 md:m-5 bg-white border rounded-[10px]"
                    dir="rtl"
                  >
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-right">
                      أحدث المستخدمين
                    </h2>
                    <div className="w-full flex items-center justify-right">
                      <div className="w-full max-w-2xl p-2 md:p-4">
                        <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 md:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                          <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                            className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm md:text-base"
                          />
                          <div className="flex items-center gap-2 text-black">
                            <span className="text-sm md:text-lg font-medium">
                              بحث
                            </span>
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto border rounded-[10px] mt-3">
                      <table className="w-full text-xs md:text-sm text-center border rounded-[20px]">
                        <thead>
                          <tr className="bg-[var(--maincolor--)] text-black font-semibold">
                            <th
                              style={{ backgroundColor: "#f0f0f0" }}
                              className="py-2 md:py-3 px-2 md:px-4"
                            >
                              الاسم
                            </th>
                            <th
                              style={{ backgroundColor: "#f0f0f0" }}
                              className="py-2 md:py-3 px-2 md:px-4"
                            >
                              البريد الالكتروني
                            </th>
                            <th
                              style={{ backgroundColor: "#f0f0f0" }}
                              className="py-2 md:py-3 px-2 md:px-4"
                            >
                              تاريخ اخر تسجيل
                            </th>
                            <th
                              style={{ backgroundColor: "#f0f0f0" }}
                              className="py-2 md:py-3 px-2 md:px-4"
                            >
                              الطلبات الناجحه
                            </th>
                            <th
                              style={{ backgroundColor: "#f0f0f0" }}
                              className="py-2 md:py-3 px-2 md:px-4"
                            >
                              كل الطلبات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, idx) => (
                            <tr
                              key={idx}
                              className="border-b text-center text-gray-900"
                            >
                              <td className="py-1 md:py-2 px-2 md:px-4">
                                {user.fullName}
                              </td>
                              <td className="py-1 md:py-2 px-2 md:px-4">
                                {user.email}
                              </td>
                              <td className="py-1 md:py-2 px-2 md:px-4">
                                {user.lastlogin}
                              </td>
                              <td className="py-1 md:py-2 px-2 md:px-4">
                                {user.successOrders}
                              </td>
                              <td className="py-1 md:py-2 px-2 md:px-4">
                                {user.totalOrders}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    className="p-3 md:p-4 m-2 md:m-5 bg-white border rounded-[10px]"
                    dir="rtl"
                  >
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-end">
                      المستخدمين الغير نشطين
                    </h2>
                    <div className="w-full flex items-center justify-right">
                      <div className="w-full max-w-2xl p-2 md:p-4">
                        <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 md:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                          <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                            className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm md:text-base"
                          />
                          <div className="flex items-center gap-2 text-black">
                            <span className="text-sm md:text-lg font-medium">
                              بحث
                            </span>
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto border rounded-[10px] mt-3">
                      <table className="w-full text-xs md:text-sm text-center border rounded-[20px]">
                        <thead>
                          <tr className="bg-[var(--maincolor--)] text-black font-semibold">
                            <th className="py-2 md:py-3 px-2 md:px-4">الاسم</th>
                            <th className="py-2 md:py-3 px-2 md:px-4">
                              البريد الالكتروني
                            </th>
                            <th className="py-2 md:py-3 px-2 md:px-4">
                              تاريخ اخر تسجيل
                            </th>
                            <th className="py-2 md:py-3 px-2 md:px-4">
                              الطلبات الناجحه
                            </th>
                            <th className="py-2 md:py-3 px-2 md:px-4">
                              كل الطلبات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {notactiveusers
                            .filter((order) => {
                              return (
                                searchTerm === "" ||
                                order.id.includes(searchTerm)
                              );
                            })
                            .map((user, idx) => (
                              <tr
                                key={idx}
                                className="border-b text-center text-gray-900"
                              >
                                <td className="py-1 md:py-2 px-2 md:px-4">
                                  {user.fullName}
                                </td>
                                <td className="py-1 md:py-2 px-2 md:px-4">
                                  {user.email}
                                </td>
                                <td className="py-1 md:py-2 px-2 md:px-4">
                                  {user.lastlogin}
                                </td>
                                <td className="py-1 md:py-2 px-2 md:px-4">
                                  {user.successOrders}
                                </td>
                                <td className="py-1 md:py-2 px-2 md:px-4">
                                  {user.totalOrders}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Row>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                  <div className="w-full max-w-lg text-center">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg mb-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-8 w-8 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-red-800">
                            تنبيه الوصول المقيد
                          </h3>
                          <p className="mt-1 text-sm text-red-700">
                            عذراً، يجب تسجيل الدخول للوصول إلى هذه الصفحة
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      يرجى تسجيل الدخول أو إنشاء حساب جديد للمتابعة
                    </p>
                    <div className="flex justify-center gap-4">
                      <Link
                        to="/signin"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        تسجيل الدخول
                      </Link>
                      <Link
                        to="/signup"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        إنشاء حساب
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
              <div className="w-full max-w-lg text-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-red-800">
                        تنبيه الوصول المقيد
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        عذراً، يجب تسجيل الدخول للوصول إلى هذه الصفحة
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  يرجى تسجيل الدخول أو إنشاء حساب جديد للمتابعة
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/signin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </motion.div>
  );
}
