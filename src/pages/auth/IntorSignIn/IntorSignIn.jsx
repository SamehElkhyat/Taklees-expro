import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IntorSignUp = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="Intro-background-img-frame"></div>
        <div className="dad-Intro-SignIn-Frame w-100 h-100">
          <div className="Intro-SignIn-Frame"></div>
        </div>

        <div className="Intro-sign-in-container">
          <h2>تسجيل الدخول </h2>

          <div className="Tow-card">
            <Link className="Comapnies" to="/SignIn">
              <div className="">
                <h4>أعمال</h4>
              </div>
            </Link>
            <Link className="Personal" to="/SignIn">
              <div className="">
                <h4>أفراد</h4>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default IntorSignUp;
