import React from "react";
import { motion } from "framer-motion";
import meetImage from "../../../assets/images/meet.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-us-section">
      {/* Main Title */}
      <div className="about-title-section">
        <motion.h2
          className="main-about-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          تعرف علينا
        </motion.h2>
        <motion.p
          className="about-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          تعرف على تخليص اكسبرو عن قرب
        </motion.p>
      </div>

      {/* Content Container */}
      <div className="about-content-container">
        {/* Left Side - Content Card */}
        <motion.div
          className="about-content-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="about-card-content">
            <p className="about-description">
              تخليص اكسبرو هي شريكتك الموثوقة في خدمات الوساطة الجمركية. نوصلك مباشرة بأفضل المخلصين الجمركيين، وشركات الشحن والتخزين، لنضمن لك تجربة سلسة وآمنة. هدفنا إن شحنتك توصلك بأسرع وقت و أفضل سعر، مع متابعة دقيقة لكل خطوة من بداية التخليص لحد بابك.
            </p>
            
            <div className="about-action-buttons">
              <button className="about-contact-btn">
                تواصل معنا
              </button>
              <button className="about-services-btn">
                خدماتنا
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Team Meeting Image */}
        <motion.div
          className="team-image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="team-container">
            <img 
              src={meetImage} 
              alt="Team Meeting - Takhlees Expro"
              className="team-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
