import React from "react";
import { motion } from "framer-motion";
import backgroundFeedBack from "../../../assets/images/backgroundFeedBack.jpg";
import "./Services.css";
import card1 from "../../../assets/images/card1.png";
import card2 from "../../../assets/images/card2.png";
import card3 from "../../../assets/images/card3.png";
import Footer from "../../LandingPage/Footer/Footer";

// بيانات الخدمات
const servicesData = [
  {
    image: card1,
    title: "شحن دولي",
    description: "خدمات شحن بحري إلى ومن مختلف الموانئ العالمية بأسعار تنافسية.",
  },
  {
    image: card2,
    title: "التخزين المؤقت",
    description: "توفير مخازن مؤقتة لحفظ البضائع لحين إنهاء التخليص.",
  },
  {
    image: card3,
    title: "التخليص الجمركي للبضائع",
    description: "إنهاء كافة الإجراءات الجمركية للشحنات بسرعة واحترافية.",
  },
];

// أنيميشن للظهور التدريجي
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const Services = () => {
  return (
    <>
    <section className="services-section">
      {/* Background Image */}
      <div className="services-background">
        <img
          src={backgroundFeedBack}
          alt="Services Background"
          className="services-bg-image"
          loading="lazy"
        />
        <div className="services-overlay"></div>
      </div>

      <div className="services-container">
        {/* Header */}
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="services-title">ماذا نقدم لك؟</h1>
          <p className="services-subtitle">استكشف خدماتنا التي صممناها لتسهيل تجربتك</p>
        </motion.div>

        {/* Services Cards */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="card-content">
                <div className="image-container">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
                <div className="text-content">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Services;
