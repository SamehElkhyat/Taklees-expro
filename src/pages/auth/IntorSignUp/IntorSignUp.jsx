import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
  },
  tap: {
    scale: 0.95,
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const IntorSignUp = () => {
  return (
    <motion.div
      className=" relative w-full h-screen flex flex-col items-center justify-center text-gray-800 "
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <div className="bg-[#f5f5dc] sign-Up-container form-container-signUp w-100 h-100 flex flex-col justify-center items-center">
        <motion.h2
          className="text-4xl font-bold mb-10 text-center font-arabic"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          إنشاء حساب
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-12">
          {[
            { path: "/SignUpForCompany", label: "أعمال" },
            { path: "/SignUp", label: "أفراد" },
            { path: "/SignUpForMokhalseen", label: "مخلص" },
          ].map((item, index) => (
            <React.Fragment key={item.path}>
              <Link to={item.path} className="text-xl font-semibold">
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white/60 text-gray-800 backdrop-blur-sm p-8 rounded-2xl min-w-[180px] md:min-w-[220px] min-h-[160px] text-center cursor-pointer hover:shadow-xl transition-all flex items-center justify-center text-xl font-semibold"
                >
                  {item.label}
                </motion.div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default IntorSignUp;
