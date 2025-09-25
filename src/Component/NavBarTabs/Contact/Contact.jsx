import React, { useState } from "react";
import { motion } from "framer-motion";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: "",
    phone: "",
    message: ""
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="contact-title">نحن هنا من أجلك!</h1>
          <p className="contact-subtitle">
            فريقنا جاهز للرد على استفساراتك بأسرع وقت وبكل احترافية، لاتتردد في التواصل عبر النموذج أدناه
          </p>
        </motion.div>

        {/* Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">الاسم الكامل</label>
                <div className={`input-wrapper ${focusedInput === 'fullName' ? 'focused' : ''}`}>
                  <i className="fas fa-user input-icon" loading="lazy"></i>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('fullName')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="أدخل الأسم بالكامل"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">البريد الإلكتروني</label>
                <div className={`input-wrapper ${focusedInput === 'email' ? 'focused' : ''}`}>
                  <i className="fas fa-envelope input-icon" loading="lazy"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">الخدمة المطلوبة</label>
                <div className={`input-wrapper ${focusedInput === 'service' ? 'focused' : ''}`}>
                  <i className="fas fa-briefcase input-icon" loading="lazy"></i>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('service')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="أكتب الخدمة المختارة"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">رقم الجوال</label>
                <div className="phone-input-wrapper">
                  <PhoneInput
                    country={'ye'}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="أدخل رقم جوالك"
                    enableSearch={true}
                    searchPlaceholder="البحث عن دولة"
                    containerClass="phone-input-container"
                    inputClass="phone-input-field"
                    buttonClass="phone-input-button"
                    dropdownClass="phone-input-dropdown"
                    searchClass="phone-input-search"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false
                    }}
                    specialLabel=""
                    preferredCountries={['ye', 'sa', 'ae', 'kw', 'bh', 'qa', 'om', 'jo', 'lb', 'sy', 'iq', 'eg']}
                    onFocus={() => setFocusedInput('phone')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">رسالتك</label>
                <div className={`input-wrapper textarea-wrapper ${focusedInput === 'message' ? 'focused' : ''}`}>
                  <i className="fas fa-comment input-icon" loading="lazy"></i>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="أكتب ما تريد"
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                <i className="fas fa-paper-plane" loading="lazy"></i>
                إرسال الرسالة
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="contact-info-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="contact-info-card">
              {/* Phone Contact */}
              <div className="contact-info-section">
                <h3 className="contact-info-title">تواصل عبر رقم الجوال</h3>
                <div className="contact-info-item">
                  <span className="contact-info-text">966 51516810534863113</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-text">966 51516810534863113</span>
                </div>
              </div>

              {/* Email Contact */}
              <div className="contact-info-section">
                <h3 className="contact-info-title">تواصل عبر البريد الالكتروني</h3>
                <div className="contact-info-item">
                  <span className="contact-info-text">larry.schulist@hotmail.com</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact-info-section">
                <h3 className="contact-info-title">أو تابعنا على وسائل التواصل الاجتماعي</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook">
                    <i className="fab fa-facebook-f" loading="lazy"></i>
                  </a>
                  <a href="#" className="social-icon twitter">
                    <i className="fab fa-twitter" loading="lazy"></i>
                  </a>
                  <a href="#" className="social-icon linkedin">
                    <i className="fab fa-linkedin-in" loading="lazy"></i>
                  </a>
                </div>
              </div>

              {/* Decorative Pattern */}
              <div className="contact-info-pattern"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
