import React from "react";
import { motion } from "framer-motion";
import approvedImage from "../../../assets/images/Approved.png";
import "./CustomsApproval.css";

const CustomsApproval = () => {
  return (
    <section className="customs-approval-section">
      {/* Content Container */}
      <div className="customs-content-container">
        {/* Left Side - Approved Customs Image */}
        <motion.div
          className="approved-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="approved-container">
            <img 
              src={approvedImage} 
              alt="Customs Approval System"
              className="approved-image"
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="customs-content-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="customs-content-title">
            جمارك بلا تعقيد وبأقل تكلفة!
          </h3>
          <p className="customs-content-description">
            مع تخليص اكسبرو نوفر لك مخلصين جمركيين خبراء يتابعون كل التفاصيل، ونضمن سرعة الإنجاز، دقة المتابعة، وتكلفة تنافسية لخدمات جمركية آمنة وبلا تعقيد.
          </p>
          
          <div className="customs-action-buttons">
            <button className="customs-register-btn">
              سجل الآن
            </button>
            <button className="customs-learn-more-btn">
              اعرف أكثر
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomsApproval;
