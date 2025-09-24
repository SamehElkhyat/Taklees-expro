import React, { useState } from "react";
import AutoChatbot from "./AutoChatbot";
import { MessageCircle } from "lucide-react";

const ChatbotDemo = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Demo Page Content */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          مرحباً بك في نظام شهادات المطابقة
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            المساعد الآلي للاستفسارات
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            يمكنك الآن الحصول على إجابات فورية حول شهادات المطابقة المختلفة. 
            المساعد الآلي يدعم الاستفسارات حول PC، SQM، IECEE، و GCC.
          </p>
          
          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🤖 ذكي ومرن</h3>
              <p className="text-sm text-blue-600">
                يفهم أسئلتك بطرق مختلفة ويعطي إجابات دقيقة
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">⚡ سريع الاستجابة</h3>
              <p className="text-sm text-green-600">
                ردود فورية مع محاكاة طبيعية للمحادثة
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🔍 بحث ذكي</h3>
              <p className="text-sm text-purple-600">
                يبحث في الكلمات المفتاحية ويجد أفضل تطابق
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">💬 واجهة طبيعية</h3>
              <p className="text-sm text-orange-600">
                يبدو مثل محادثة حقيقية مع مؤشرات الكتابة
              </p>
            </div>
          </div>

          {/* Example Queries */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">أمثلة على الأسئلة:</h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                ما هي شهادة PC؟
              </div>
              <div className="bg-white p-2 rounded border-l-4 border-green-400">
                منتجات المكيفات تحتاج أي شهادة؟
              </div>
              <div className="bg-white p-2 rounded border-l-4 border-purple-400">
                شهادات البلاط والأسمنت
              </div>
              <div className="bg-white p-2 rounded border-l-4 border-orange-400">
                IECEE تشمل إيه؟
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ابدأ المحادثة مع المساعد الآلي
          </button>
        </div>

        {/* Certification Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              key: "PC",
              title: "شهادة PC",
              description: "جميع المنتجات المتطلبة إلى سابر",
              color: "blue"
            },
            {
              key: "SQM",
              title: "شهادة SQM", 
              description: "منتجات البناء والتشييد",
              color: "green"
            },
            {
              key: "IECEE",
              title: "شهادة IECEE",
              description: "الأجهزة الإلكترونية والمنزلية",
              color: "purple"
            },
            {
              key: "GCC",
              title: "شهادة GCC",
              description: "الأجهزة الكهربائية المنزلية",
              color: "orange"
            }
          ].map((cert) => (
            <div
              key={cert.key}
              className={`bg-white rounded-lg shadow-md p-4 border-t-4 border-${cert.color}-400 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setIsChatbotOpen(true)}
            >
              <h3 className={`font-bold text-${cert.color}-600 mb-2`}>
                {cert.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {cert.description}
              </p>
              <div className={`text-xs text-${cert.color}-500 font-medium`}>
                اضغط للاستفسار →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center"
          title="افتح المساعد الآلي"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot Component */}
      <AutoChatbot
        isOpen={isChatbotOpen}
        handleClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
};

export default ChatbotDemo;



