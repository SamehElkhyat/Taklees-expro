import React from "react";
import { motion } from "framer-motion";
import productCenterImage from "../../../assets/images/ProductCenter.png";
import "./ProductCenter.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCenter = () => {
  return (
    <section className="product-center-section">
      {/* Content Container */}
      <div className="product-content-container">
        {/* Left Side - Content */}
        <motion.div
          className="storage-content-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="storage-content-title">
            أمان لبضاعتك بأقل ثمن!
          </h3>
          <p className="storage-content-description">
            وفر وقتك وجهدك مع خدمات التخزين الموثوقة لدينا. نوفر لك مستودعات آمنة ومرنة بأسعار منافسة، مع إمكانية متابعة بضاعتك أولاً بأول. هدفنا نوفرلك الحل الأمثل لتخزين منتجاتك بأمان وتكلفة أقل، عشان تُركز على نمو تجارتك وتسيب علينا باقي التفاصيل.
          </p>
          
          <div className="storage-action-buttons">
            <button className="storage-register-btn">
              سجل الآن
            </button>
            <button className="storage-learn-more-btn">
              اعرف أكثر
            </button>
          </div>
        </motion.div>

        {/* Right Side - Warehouse Image */}
        <motion.div
          className="warehouse-image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="warehouse-container">
            <LazyLoadImage 
              src={productCenterImage} 
              alt="Warehouse Storage Center"
              className="warehouse-image"
              effect="opacity"
              threshold={150}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCenter;
