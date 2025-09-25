import React from "react";
import { motion } from "framer-motion";
import globalLogisticsMap from "../../../assets/images/global-logistics-map.png";
import "./NearAboutTakhlees.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const NearAboutTakhlees = () => {
  return (
    <section className="logistics-section">
      {/* Main Title */}
      <div className="title-section">
        <motion.h2
          className="main-logistics-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          تعرف على <span className="title-green">تخليص اكسبرو</span> عن قرب
        </motion.h2>
        <motion.p
          className="title-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          خدماتنا دايم نضمن لك فيها السرعة والدقة
        </motion.p>
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Left Side - Global Logistics Network Image */}
        <motion.div
          className="logistics-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="world-map-container">
            <LazyLoadImage 
              src={globalLogisticsMap} 
              alt="Global Logistics Network"
              className="logistics-map-image"
              effect="opacity"
              threshold={150}
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="content-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="content-title">
            شحن أسرع.. سعر أوفر!
          </h3>
          <p className="content-description">
            لا تتردد، فنحن نوصلك مباشرة مع أفضل شركات الشحن المعتمدة داخل وخارج المملكة، لنختار الأنسب لك من حيث السعر والسرعة وجودة الخدمة، معنا تضمن راحة بالك ووصول شحنتك بأمان
          </p>
          
          <div className="action-buttons">
            <button className="register-btn">
              سجل الآن
            </button>
            <button className="learn-more-btn">
              اعرف أكثر
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearAboutTakhlees;
