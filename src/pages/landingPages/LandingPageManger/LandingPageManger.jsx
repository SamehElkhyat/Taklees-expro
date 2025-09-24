import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

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

export default function LandingPageManger() {
  const [Allprimessions, setAllprimessions] = useState([]);

  const GetPermissionsUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Permissions-User`,
        {
          withCredentials: true,
        }
      );
      setAllprimessions(data);
      console.log(data);
    } catch (error) {}
  };
  const navigate = useNavigate();

  const cards = [
    {
      title: "الشكاوى الجديدة",
      icon: (
        <FaBoxOpen className="text-red-400 bg-red-100 p-2 rounded-full w-10 h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
    {
      title: "الإيرادات الشهرية",
      icon: (
        <FaCalendarAlt className="text-purple-400 bg-purple-100 p-2 rounded-full w-10 h-10" />
      ),
      value: "12,543",
      change: "-12.5%",
      changeColor: "text-red-500",
      iconArrow: "↘️",
    },
    {
      title: "إجمالي الطلبات",
      icon: (
        <FaClipboardList className="text-green-400 bg-green-100 p-2 rounded-full w-10 h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
    {
      title: "إجمالي المستخدمين",
      icon: (
        <FaUsers className="text-blue-400 bg-blue-100 p-2 rounded-full w-10 h-10" />
      ),
      value: "12,543",
      change: "+12.5%",
      changeColor: "text-green-500",
      iconArrow: "⬆️",
    },
  ];
  useEffect(() => {
    GetPermissionsUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      {" "}
      <Container className="text-center mt-5">
        <div
          className="flex flex-wrap gap-4 justify-center md:justify-c
        "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 w-64 flex flex-col gap-2 items-start"
            >
              {card.icon}
              <div
                className={`${card.changeColor} text-sm flex items-center gap-1`}
              >
                {card.change} <span>{card.iconArrow}</span>
              </div>
              <div className="text-gray-700 font-medium">{card.title}</div>
              <div className="text-black font-bold text-lg">{card.value}</div>
            </div>
          ))}
        </div>

        <Row className="justify-content-center">
          {Allprimessions.sort((a, b) =>
            a.type === "Statestics" ? -1 : b.type === "Statestics" ? 1 : 0
          ).map((item, index) => {
            console.log(item.type);
            switch (item.type) {
              case "Statestics":
                return (
                  <div className="w-100 p-3">
                    <div className="bg-[#FFFFFA] w-100 flex  justify-center p-5 border rounded-[40px]">
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <AreaChart
                            width={1000}
                            height={300}
                            data={data}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="uv"
                              stackId="1"
                              stroke="#FF928A4D"
                              fill="#FF928A4D"
                            />

                            <Area
                              type="monotone"
                              dataKey="amt"
                              stackId="1"
                              stroke="#8979FF4D"
                              fill="#8979FF4D"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="">
                        <p className="text-end m-[0px] font-bold text-[20.4px] leading-[32px] tracking-[0]">
                          نظرة عامة على النشاط
                        </p>
                        <button
                          onClick={() => navigate("/statisticsManger")}
                          className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                        >
                          عرض كل الإحصائيات
                        </button>
                      </div>
                    </div>
                  </div>
                );

              case "CustomerService":
                return (
                  <div className="box">
                    <Col>
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="fa-solid fa-ban text-[30px] p-2 text-[red] text-start"></i>
                          </div>

                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              خدمه العملاء
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>

                            <button
                              onClick={() =>
                                navigate("/CPanelCustomeServiceManger")
                              }
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل خدمه العملاء
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );

              case "Clients":
                return (
                  <div className="box">
                    <Col className="">
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute ">
                            <i className="p-2 text-end w-100 fa-solid fa-users text-[var(--maincolor--)] text-[30px] text-start"></i>
                          </div>
                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              المستخدمين
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>
                            <button
                              onClick={() => navigate("/clients")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل المستخدمين
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );
              case "Tracing":
                return (
                  <div className="box">
                    <Col>
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="fa-solid fa-person-walking-arrow-right text-[30px] p-2 text-[red] text-start"></i>
                          </div>

                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              متابعه الطلبات
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>

                            <button
                              onClick={() => navigate("/LogsOrders")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              متابعه الطلبات بالتفصيل
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );

              case "BlackList":
                return (
                  <div className="box">
                    <Col>
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="fa-solid fa-ban text-[30px] p-2 text-[red] text-start"></i>
                          </div>

                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              المحظورين
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>

                            <button
                              onClick={() => navigate("/blackList")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل المحظورين
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );

              case "accountant":
                return (
                  <div className="box">
                    <Col className="">
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="p-2 text-end w-100 fa-solid fa-receipt text-[var(--maincolor--)] text-[30px] text-start"></i>
                          </div>
                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              المحاسبين
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>

                            <button
                              onClick={() => navigate("/CpanelAccountant")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل المحاسبين
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );

              case "Broker":
                return (
                  <div className="box">
                    <Col className="">
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="fa-solid fa-paper-plane  text-[30px] p-2 text-[orange]"></i>
                          </div>
                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              المخلصين
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              طلب
                            </p>

                            <button
                              onClick={() => navigate("/brookers")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل المخلصين
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );

              case "Manger":
                return (
                  <div className="box">
                    <Col>
                      <Card className="text-center mb-3 p-3 shadow-lg">
                        <Card.Body>
                          <div className="position-absolute">
                            <i className="fa-solid fa-people-roof text-[30px] p-2 text-[red] text-start"></i>
                          </div>

                          <div className="text-end">
                            <h5 className="card-title font-bold text-xl">
                              إداره المديرين
                            </h5>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                color: "#000",
                                textAlign: "center",
                                letterSpacing: "1px",
                              }}
                              className="text-end"
                            >
                              28374
                            </p>

                            <button
                              onClick={() => navigate("/Mangers")}
                              className="card-text text-right mt-2 text-[black] bg-[var(--maincolor--)] px-4 py-2  rounded-[20px] shadow"
                            >
                              عرض كل المديرين
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                );
              default:
                return (
                  <Col className="box">
                    <Card className="text-center mb-3 p-3 shadow-lg bg-[#f8d7da] border border-danger">
                      <Card.Body>
                        <div className="text-end">
                          <h5 className="card-title font-bold text-xl text-red-600">
                            {item.type} غير مسموح
                          </h5>
                          <p className="text-[20px] font-semibold text-black text-center tracking-[1px]">
                            غير مسموح لك بـ
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
            }
          })}
        </Row>
      </Container>
    </motion.div>
  );
}
