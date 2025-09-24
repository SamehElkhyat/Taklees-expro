import React from "react";
import "./TeamSection.css";
import Cleints from "../../assets/images/done.png";
import { motion } from "framer-motion"; // استيراد Framer Motion

const TeamSection = () => {
  // تعريف المتغيرات لتأثيرات الحركة
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <main className="Team-section flex flex-col lg:flex-row items-center justify-between gap-8 px-4 py-10">
      {/* القسم الأيمن */}
      <motion.section
        className="Team-section-right lg:w-1/2 text-right space-y-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          شريكك الموثوق في التخليص الجمركي والشحن البحري
        </h1>
        <p className="text-gray-600 leading-relaxed">
          في تخليص تك، نُسهّل عليك عمليات التخليص الجمركي ونقل الشحنات عبر
          الموانئ بكل احترافية. يعمل فريقنا المتخصص على ضمان سرعة الإنجاز، ودقة
          الإجراءات، وشفافية التعامل، لنوفّر لك تجربة خالية من التعقيدات.
        </p>
        <motion.ul
          dir="rtl"
          className="text-[#444] font-Tajawal leading-loose space-y-2 list-disc list-outside text-right pr-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            "دعم متواصل في التخليص الجمركي",
            "خدمات شحن بحري من وإلى أهم الموانئ العالمية",
            "تتبع فوري للشحنات خطوة بخطوة",
            "نظام مستندات إلكتروني بدون ورق",
            "استشارات احترافية في اللوائح والأنظمة",
            "تسعير واضح وعروض فورية",
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              custom={index}
              className="hover:text-[#1DA9E3] transition-all duration-200"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* القسم الأيسر */}
      <motion.section
        className="Team-section-left lg:w-1/2 w-full flex flex-col items-center gap-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="flex flex-col justify-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.img
            className="border-t border-l border-gray-300 rounded-tl-[22px] rounded-tr-[22px] flex flex-wrap justify-center gap-4"
            src={Cleints}
            alt="Clients"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { number: "+20", text: "سنه خبره" },
              { number: "+2000", text: "شحنه مخلصه" },
              { number: "+60", text: "ميناء حول العالم" },
              { number: "99%", text: "رضاء العملاء" },
            ].map((stat, index) => (
              <motion.h1
                key={index}
                className="border rounded w-28 h-28 sm:w-32 sm:h-32 bg-green-500 flex flex-col items-center justify-center text-white font-semibold"
                variants={itemVariants}
                custom={index}
              >
                <span>{stat.number}</span>
                <span>{stat.text}</span>
              </motion.h1>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default TeamSection;
