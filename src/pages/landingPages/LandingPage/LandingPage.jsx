import React, { useEffect, useRef } from "react";
import diamondPattern from "../../../assets/images/diamond-pattern.jpg";
import "./LandingPage.css";
import MainSection from "../../../Component/LandingPage/MainSection/Mainsection.jsx";
import Footer from "../../../Component/LandingPage/Footer/Footer.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import NearAboutTakhlees from "../../../Component/LandingPage/NearAboutTakhlees/NearAboutTakhlees.jsx";
import ProductCenter from "../../../Component/LandingPage/ProductCenter/ProductCenter.jsx";
import CustomsApproval from "../../../Component/LandingPage/CustomsApproval/CustomsApproval.jsx";
import AboutUs from "../../../Component/LandingPage/AboutUs/AboutUs.jsx";
import CustomerTestimonials from "../../../Component/LandingPage/CustomerTestimonials/CustomerTestimonials.jsx";

const LandingPage = () => {
  const scrollRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!scrollRef.current) return; // ✅ تأكد إن العنصر موجود

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,
    });

    return () => {
      scroll.destroy();
    };
  }, []);
  return (
    <>
      {/* <FixedModulBar /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <header className="new-landing-header">
          <div className="diamond-pattern-bg">
            <img
              src={diamondPattern}
              alt="Diamond Pattern Background"
              className="background-image"
            />
            <div className="overlay"></div>
            <div className="header-content">
              <motion.div
                className="text-center w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: "easeOut" },
                }}
              >
                <motion.h1
                  className="main-title"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: 0.3 },
                  }}
                >
                  <span className="title-green">تخليص اكسبرو</span>{" "}
                  <span className="title-blue">
                    يربطك مباشرةً مع أفضل المخلصين وشركات الشحن والتخزين… لتوصلك
                    أسرع وبأقل تكلفة
                  </span>
                </motion.h1>
              </motion.div>

              <motion.div
                className="action-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, delay: 1 },
                }}
              >
                <button className="contact-btn">تواصل معنا</button>
                <button
                  className="start-btn"
                  onClick={() => navigate("/SignIn")}
                >
                  ابدأ الآن
                </button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* باقي الأقسام */}
        <MainSection />
        <NearAboutTakhlees />
        <ProductCenter />
        <CustomsApproval />
        <AboutUs />
        <CustomerTestimonials />

        <Footer />
      </motion.div>
    </>
  );
};

export default LandingPage;
