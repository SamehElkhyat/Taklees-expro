import React, { useEffect, useRef } from "react";
import ship from "../LandingPage/ships.png";
import "./LandingPage.css";
import MainSection from "../MainSection/Mainsection";
import Footer from "../Footer/Footer.jsx";
import TeamSection from "../TeamSection/TeamSection.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import FixedModulBar from "../Chat/FixedModulBar";

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
      <FixedModulBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <header className="landing-header">
          <section className="landing-page-right-section">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="
        w-full h-[100vh]
        bg-no-repeat bg-center
        bg-contain lg:bg-cover
        sm:bg-cover"
              style={{ backgroundImage: `url(${ship})` }}
            ></motion.div>

            <motion.div className="landing-page-left-section flex flex-row justify-end absolute right-0 z-[9999] m-10 rounded-xl">
              <div className="relative z-10 flex flex-col items-end justify-center h-full text-right text-white px-6 bg-[rgba(255, 253, 253, 0.32)]">
                <motion.h2
                  className="sm:text-2xl md:text-4xl font-tajawal xl:text-5xl md:text-1xl sm:text-1xl font-bold mb-5"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: "easeOut" },
                  }}
                >
                  حلقة الوصل بينك وبين أفضل المخلصين الجمركيين بالسعودية
                </motion.h2>

                <motion.p
                  className="max-w-md sm:text-xl text-sm sm:text-base mb-5 leading-relaxed font-tajawal"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.4, ease: "easeOut" },
                  }}
                >
                  وفر وقتك وجهدك مع منصة تربطك بمخلصين جمركيين محترفين، تدير كل
                  خطوات الشحن والتخليص بكفاءة عالية وفي مكان واحد.
                </motion.p>

                <motion.button
                  onClick={() => navigate("/SignIn")}
                  className="Button-Landing-Page scale-[1.2] bg-[#1DA9E3] hover:bg-[#4dbdee] text-white mx-3 font-semibold px-5 p-3 sm:p-1 sm:px-1 rounded-full transition duration-300"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 1.6, duration: 1 },
                  }}
                >
                  ابدأ تخليص شحنتك
                </motion.button>
              </div>
            </motion.div>
          </section>
        </header>

        {/* باقي الأقسام */}
        <MainSection />
        <TeamSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default LandingPage;
