import React from "react";
import "./Mokhalseen.css";
import SignInBackground from "../SignIn/ships.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Mokhalseen = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="Intro-background-img-frame"></div>
        <img
          className="Intro-Signin-Background"
          src={SignInBackground}
          alt=""
          loading="lazy"
        />
        <div className="dad-Intro-SignIn-Frame w-100 h-100">
          <div className="Intro-SignIn-Frame"></div>
        </div>

        <div className="Intro-sign-in-container">
          <h2>تسجيل الدخول </h2>

          <div className="Tow-card">
            <Link className="Comapnies" to="/SignUpForMokhalseen">
              <div className="">
                <h4>المخلصين</h4>
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

export default Mokhalseen;
