// Refactored React component to reduce repetition and improve maintainability
import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../../store/Slice/GetDataApiReducer";
import AutoChatbot from "../../../features/Chat/AutoChatbot";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import "./LandingPageUsers.css";
import { v4 as uuidv4 } from 'uuid';

const MAIN_COLOR = "var(--maincolor--)";

const cardData = [
  {
    title: "إنشاء طلب جديد",
    desc: "ابدأ طلب تخليص جمركي بسهولة.",
    icon: "fa-solid fa-arrow-up",
    color: MAIN_COLOR,
    link: "/newOrder",
    statKey: null,
    buttonText: "إنشاء طلب جديد",
  },
  {
    title: "تقديم شهاده سابر",
    desc: "تقديم شهاده سابر بسهولة.",
    icon: "fa-solid fa-certificate",
    color: MAIN_COLOR,
    link: "/Submit-SABER-Certificate",
    statKey: null,
    buttonText: "تقديم شهاده سابر",
  },
  {
    title: "الطلبات القائمه",
    desc: "عرض وإدارة الطلبات القائمه.",
    icon: "fa-solid fa-arrows-spin",
    color: "#9333EA",
    link: "/Orders",
    statKey: "numberOfCurrentOffers",
  },
  {
    title: "الطلبات الجاريه",
    desc: "إدارة الطلبات الجاريه.",
    icon: "fa-solid fa-cart-shopping",
    color: MAIN_COLOR,
    link: "/CurrentOrdersForUsers",
    statKey: "numberOfRequestOrders",
  },
  {
    title: "الطلبات المنفذه",
    desc: "عرض الطلبات المنفذه الخاص بك.",
    icon: "fa-regular fa-circle-check",
    color: "#76C248",
    link: "/DoneOrdersForUser",
    statKey: "numberOfSuccessfulOrders",
  },
  {
    title: "المحفظة",
    desc: "إدارة الأموال والرصيد الخاص بك.",
    icon: "fa-solid fa-cart-shopping",
    color: "#E31D1D",
    link: "/Cart",
    statKey: "numberOfRequestOrders",
  },
  {
    title: "سجل الطلبات",
    desc: "إدارة السجل وجميع الطلبات الخاص بك.",
    icon: "fa-solid fa-clock-rotate-left",
    color: MAIN_COLOR,
    link: "/HistoryOfOrdersUsers",
    statKey: null,
  },
];

const LandingPageForUsers = () => {
  const [state, setState] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [showAutoChatbot, setShowAutoChatbot] = useState(false);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const { payload } = await dispatch(GetDataApi());
    setUserProfile(payload);
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-User`,
        { withCredentials: true }
      );
      setState(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  const isAuthorized = (role) => ["User", "Company", "Admin"].includes(role);

  useEffect(() => {
    gsap.from(".box", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
    fetchStats();
    fetchUserData();
  }, []);

  const renderCard = (card, idx) => (
    <div key={uuidv4()} className="box">
      <Col className="mb-3">
        <Link to={card.link} className="text-white text-decoration-none">
          <Card className="p-3">
            <Card.Body>
              {card.statKey && (
                <p className="text-start" style={{
                  fontSize: "clamp(18px, 4vw, 24px)",
                  fontWeight: "900",
                  color: "#000",
                  textAlign: "center",
                  letterSpacing: "1px"
                }}>
                  طلب {state[card.statKey]}
                </p>
              )}
              <i className={`p-2 text-end w-full ${card.icon}`} style={{ color: card.color, fontSize: "clamp(24px, 5vw, 30px)" }}></i>
              <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                {card.title}
              </p>
              <Card.Text className="text-right p-2 text-sm sm:text-base">
                {card.desc}
              </Card.Text>
              {card.buttonText && (
                <button className="me-5 text-[black] bg-[var(--maincolor--)] p-[10px] px-4 py-2 rounded-[20px] text-sm sm:text-base">
                  {card.buttonText}
                </button>
              )}
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </div>
  );

  if (!userProfile) {
    return (
      <Container className="text-center mt-4">
        <div className="alert alert-danger p-4 rounded">
          <h3>تنبيه الوصول المقيد</h3>
          <p>عذراً، يجب تسجيل الدخول للوصول إلى هذه الصفحة</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signin" className="btn btn-primary">تسجيل الدخول</Link>
            <Link to="/signup" className="btn btn-outline-secondary">إنشاء حساب</Link>
          </div>
        </div>
      </Container>
    );
  }

  if (!isAuthorized(userProfile.role)) {
    return <h1 className="text-center mt-5">غير مسموح لك بالدخول</h1>;
  }

  return (
    <Container className="text-center mt-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.7 }}>
        <h1 className="mb-4" style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: "700", color: "var(--secondColor--)" }}>
          مرحبا بك في لوحة التحكم
        </h1>
        <Row className="flex flex-col lg:flex-row justify-center w-full gap-4">
          <div className="flex flex-col w-full lg:w-1/2">
            {cardData.slice(0, 3).map(renderCard)}
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
            {cardData.slice(3).map(renderCard)}
          </div>
        </Row>
      </motion.div>

      {/* Floating AutoChatbot Button */}
      {!showAutoChatbot && (
        <button
          onClick={() => setShowAutoChatbot(true)}
          className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center z-50"
          title="المساعد الآلي للاستفسارات"
          style={{ zIndex: 9999 }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* AutoChatbot Modal */}
      <AutoChatbot
        isOpen={showAutoChatbot}
        handleClose={() => setShowAutoChatbot(false)}
      />
    </Container>
  );
};

export default LandingPageForUsers;
