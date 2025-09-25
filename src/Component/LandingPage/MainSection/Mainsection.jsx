import React from "react";
import "./Mainsection.css";
import card1 from "../../../assets/images/card1.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import card2 from "../../../assets/images/card2.png";
import card3 from "../../../assets/images/card3.png";
import { motion } from "framer-motion";

// بيانات الكروت
const cardsData = [
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

const MainSection = () => {
  return (
    <main className="main-section px-4 sm:px-6 lg:px-10 py-6">
    {/* العنوان */}
    <section className="flex justify-center mt-6 mb-10">
      <div className="text-center">
        <h1 className="text-[#002E5B] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          ماذا نقدم لك؟
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          استكشف خدماتنا التي صممناها لتسهيل تجربتك
        </p>
      </div>
    </section>
  
    {/* شبكة البطاقات */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
      {cardsData.map((card, index) => (
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
              <LazyLoadImage
                src={card.image} 
                alt={card.title}
                className="card-image"
                effect="opacity"
                threshold={150}
              />
            </div>
            <div className="text-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  </main>
  
  );
};

export default MainSection;
