import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo.png";
import "./About.css";
import Footer from "../../LandingPage/Footer/Footer";

const About = () => {
  return (  
    <>
    <section className="about-us-section">
      <div className="about-us-container">
        {/* Header */}
        <motion.div 
          className="about-us-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="about-us-title">تعرف علينا</h2>
          <p className="about-us-subtitle">تعرف على تخليص اكسبرو عن قريب</p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          className="about-us-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo */}
          <div className="about-us-logo">
            <img src={logo} alt="Takhlees Expro Logo" loading="lazy" />
          </div>

          {/* Description Text */}
          <div className="about-us-content">
            <p className="about-us-text">
              تخليص اكسبرو هي شركتك الموثوقة في خدمات الوساطة الجمركية، نوصلك مباشرةً بأفضل المخلصين الجمركيين، وشركات الشحن والتخزين، لنضمن لك تجربة سلسة وآمنة. هدفنا إن شحنتك توصلك بأسرع وقت وأفضل سعر، مع متابعة دقيقة لكل خطوة من بداية التخليص لحد بابك.
            </p>
            
            <p className="about-us-text">
              تخليص اكسبرو هي شركتك الموثوقة في خدمات الوساطة الجمركية، نوصلك مباشرةً بأفضل المخلصين الجمركيين، وشركات الشحن والتخزين، لنضمن لك تجربة سلسة وآمنة. هدفنا إن شحنتك توصلك بأسرع وقت وأفضل سعر، مع متابعة دقيقة لكل خطوة من بداية التخليص لحد بابك.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default About;
