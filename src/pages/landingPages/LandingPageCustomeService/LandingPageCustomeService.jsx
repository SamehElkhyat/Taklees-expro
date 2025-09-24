import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../../store/Slice/GetDataApiReducer";
import { ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
export default function LandingPageCustomService() {
  const [State, setState] = useState({});
  const [userProfile, setuserProfile] = useState(null);
  const [userLink, setUserLink] = useState(null);
  const data = [
    { value: 8 },
    { value: 4 },
    { value: 5 },
    { value: 10 },
    { value: 6 },
    { value: 8 },
    { value: 8 },
    { value: 20 },
    { value: 8 },
    { value: 8 },
    { value: 34 },
  ];
  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-CustomerService`,
        {
          withCredentials: true,
        }
      );
      setState(data);
      console.log(data);
      
    } catch (error) {
     
    }
  };
  const dispatch = useDispatch();

  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());

    setuserProfile(payload);

    let link;

    if (payload !== undefined) {
      switch (payload.role) {
        case "User":
          link = "/LandingPageForUsers";
          break;
        case "Admin":
          link = "/LandingPageAdmin";
          break;
        case "Company":
          link = "/LandingPageForUsers";
          break;
        case "Account":
          link = "/AccountantLandingPage";
          break;
        case "CustomerService":
          link = "/LandingPageCustomeService";
          break;
        case "Broker":
          link = "/BrookersLandingPage";
          break;
        case "Manager":
          link = "/LandingPageManger";
          break;
        default:
          link = null;
      }
      setUserLink(link);
    }
  };

  useEffect(() => {
    document.querySelectorAll(".box").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.04,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });
    });
    GetState();
    navigationToLandingpage();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Container className="text-center mt-3 sm:mt-4 md:mt-5 p-3 sm:p-4">
        {userProfile !== null && userProfile !== undefined ? (
          <>
            {userProfile.role === "CustomerService" ||
            userProfile.role === "Admin" ||
            userProfile.role === "Manager" ? (
              <>
                <h5 className="font-bold text-[var(--secondColor--)] text-center text-lg sm:text-xl md:text-2xl m-3 sm:m-4">
                  اختر ما تريد القيام به:
                </h5>
                <Row className="flex flex-col lg:flex-row justify-center w-full gap-4">
                  <div className="first-col-use flex flex-col justify-start w-full lg:w-1/4">
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/AllOrderTransfers"
                        >
                          <Card className="p-3">
                            <Card.Body>
                              <div className="position-absolute">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfNotDoneOrders}
                                </p>
                              </div>
                              <div className="">
                                <i className="p-2 text-end w-full fa-solid fa-repeat text-[var(--maincolor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات المحوله
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  عرض الطلبات المحوله
                                </Card.Text>
                              </div>
                              <div className="h-10 mt-2 mb-0">
                                <ResponsiveContainer width="100%" height="110%">
                                  <AreaChart data={data}>
                                    <defs>
                                      <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="0%"
                                          stopColor="#8884d8"
                                          stopOpacity={0.4}
                                        />
                                        <stop
                                          height="150%"
                                          offset="100%"
                                          stopColor="#FF797B"
                                          stopOpacity={1.2}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#8884d8"
                                      fill="url(#colorUv)"
                                      strokeWidth={2}
                                      dot={false}
                                    />
                                    <Tooltip content={null} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/AllOrderDeleted"
                        >
                          <Card className="p-3">
                            <Card.Body>
                              <div className="position-absolute">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfDeletedOrders}
                                </p>
                              </div>
                              <div className="">
                                <i className="p-2 text-end w-full fa-solid fa-trash text-[var(--secondColor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات المحذوفة
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  إدارة الطلبات المحذوفة.
                                </Card.Text>
                              </div>
                              <div className="h-10 mt-2 mb-0">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={data}>
                                    <defs>
                                      <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="0%"
                                          stopColor="#8884d8"
                                          stopOpacity={0.4}
                                        />
                                        <stop
                                          offset="100%"
                                          stopColor="#FF797B"
                                          stopOpacity={1.2}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#8884d8"
                                      fill="url(#colorUv)"
                                      strokeWidth={2}
                                      dot={false}
                                    />
                                    <Tooltip content={null} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                  </div>
                  <div className="second-col-usr flex flex-col justify-end w-full lg:w-1/4">
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/DoneOrders"
                        >
                          <Card className="p-3">
                            <Card.Body>
                              <div className="position-absolute">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfDoneOrders}
                                </p>
                              </div>
                              <div className="">
                                <i className="p-2 text-end w-full fa-regular fa-circle-check text-[#76C248] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات المنفذه
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  عرض الطلبات المنفذه .
                                </Card.Text>
                              </div>
                              <div className="h-10 mt-2 mb-0">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={data}>
                                    <defs>
                                      <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="0%"
                                          stopColor="#8884d8"
                                          stopOpacity={0.4}
                                        />
                                        <stop
                                          offset="100%"
                                          stopColor="#FF797B"
                                          stopOpacity={1.2}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#8884d8"
                                      fill="url(#colorUv)"
                                      strokeWidth={2}
                                      dot={false}
                                    />
                                    <Tooltip content={null} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/CanceledOrders"
                        >
                          <Card className="p-3">
                            <Card.Body>
                              <div className="position-absolute">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfRefuseOrders}
                                </p>
                              </div>
                              <div className="">
                                <i className="p-2 text-end w-full fa-solid fa-circle-xmark text-red-700 text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات الملغاه
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  عرض الطلبات الملغاه
                                </Card.Text>
                              </div>
                              <div className="h-10 mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={data}>
                                    <defs>
                                      <linearGradient
                                        id="colorUv"
                                        x1="1"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="0%"
                                          stopColor="#8884d8"
                                          stopOpacity={0.4}
                                        />
                                        <stop
                                          offset="100%"
                                          stopColor="#FF797B"
                                          stopOpacity={1.2}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#8884d8"
                                      fill="url(#colorUv)"
                                      strokeWidth={2}
                                      dot={false}
                                    />
                                    <Tooltip content={null} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                  </div>
                </Row>
              </>
            ) : (
              <>
                <h1 className="text-lg sm:text-xl md:text-2xl">غير مسموح لك بالدخول</h1>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-lg sm:text-xl md:text-2xl">غير مسوح بالدخول</h1>
          </>
        )}
      </Container>
    </motion.div>
  );
}
