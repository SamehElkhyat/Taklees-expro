// Refactored React component to reduce repetition and improve maintainability
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../../store/Slice/GetDataApiReducer";
import gsap from "gsap";
import { v4 as uuidv4 } from 'uuid';

const MAIN_COLOR = "var(--maincolor--)";

const cardData = [
  {
    title: "عرض الشهادات",
    desc: "عرض الشهادات السابر بسهولة.",
    icon: "fa-solid fa-certificate",
    color: MAIN_COLOR,
    link: "/AllSaberCertificationsCompany",
    statKey: null,
    buttonText: "عرض الشهادات",
  }
];

const LandingPageSaber = () => {
  const [userProfile, setUserProfile] = useState(null);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const { payload } = await dispatch(GetDataApi());
    setUserProfile(payload);
  };

  const isAuthorized = (role) => [ "Admin", "Saber"].includes(role);

  useEffect(() => {
    gsap.from(".box", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
    fetchUserData();
  }, []);

  const renderCard = (card) => (
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
                  طلب {card.statKey}
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
    </Container>
  );
};

export default LandingPageSaber;
