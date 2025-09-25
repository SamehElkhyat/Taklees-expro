import React from "react";
import { motion } from "framer-motion";
import briefImage from "../../../assets/images/brief.jpg";
import "./StatisticsSection.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const StatisticsSection = () => {
  const statistics = [
    {
      number: "+20",
      text: "سنة خبرة"
    },
    {
      number: "+2000",
      text: "شحنة مخلصة"
    },
    {
      number: "+60",
      text: "ميناء حول العالم"
    },
    {
      number: "99%",
      text: "رضاء العملاء"
    }
  ];

  return (
    <section className="statistics-section">
      <div className="statistics-background">
        <LazyLoadImage
          src={briefImage}
          alt="Statistics Background"
          className="statistics-bg-image"
          effect="opacity"
          threshold={150}
        />
        <div className="statistics-overlay"></div>
      </div>
      
      <div className="statistics-container">
        <div className="statistics-grid">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="statistics-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="statistics-number">
                {stat.number}
              </div>
              <div className="statistics-text">
                {stat.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
