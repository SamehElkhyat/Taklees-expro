import React, { useState } from "react";
import { motion } from "framer-motion";
import backgroundFeedBack from "../../../assets/images/backgroundFeedBack.jpg";
import "./CustomerTestimonials.css";

const CustomerTestimonials = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    },
    {
      id: 2,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    },
    {
      id: 3,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    },
    {
      id: 4,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    },
    {
      id: 5,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    },
    {
      id: 6,
      name: "فيد المحمدي",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      feedback: "عمل رائع وفاحصون متميزون وسرعة في الأداء،عمل رائع وفاحصون متميزون وسرعة في الأداء"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section 
      className="testimonials-section"
      style={{ backgroundImage: `url(${backgroundFeedBack})` }}
    >
      <div className="testimonials-overlay">
        {/* Main Title */}
        <div className="testimonials-title-section">
          <motion.h2
            className="main-testimonials-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            آراء عملائنا
          </motion.h2>
          <motion.p
            className="testimonials-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            آراء عملائنا هي شهادة حية على التزامنا بتقديم خدمات متكاملة.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="testimonials-grid"
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {getCurrentTestimonials().map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-content">
                <div className="customer-info">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="customer-avatar"
                  />
                  <h4 className="customer-name">{testimonial.name}</h4>
                </div>
                <p className="customer-feedback">
                  {testimonial.feedback}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="carousel-navigation">
          <button 
            className="nav-btn prev-btn"
            onClick={prevSlide}
            aria-label="Previous testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="nav-btn next-btn"
            onClick={nextSlide}
            aria-label="Next testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
