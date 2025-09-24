import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Send, Bot, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const AutoChatbot = ({ isOpen, handleClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      message: "مرحباً بك! أنا مساعد آلي للإجابة على استفساراتك حول شهادات المطابقة. يمكنك السؤال عن PC، SQM، IECEE، أو GCC.",
      senderId: "bot",
      timestamp: new Date().toISOString(),
      isBot: true
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // مفاتيح الشهادات التي قدمها المستخدم
  const certificationKeys = {
    PC: "جميع المنتجات المتطلبة الي سابر",
    SQM: "منتجات البلاط والفولاذ والأسمنت والاقياش والمفاتيح والكيابل",
    IECEE: "منتجات الإنارة والكمبيوترات وجهاز الكافي المنزلي و البوربنك",
    GCC: "منتجات المكيفات و الغسالات الكهربائية والمرواح المنزلية والدفايات الكهربائية"
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    const directMatch = Object.keys(certificationKeys).find(key => 
      input.includes(key.toLowerCase())
    );
    
    if (directMatch) {
      return {
        key: directMatch,
        value: certificationKeys[directMatch],
        confidence: 1.0
      };
    }

    const productKeywords = {
      PC: ["سابر", "جميع", "منتجات", "متطلبة"],
      SQM: ["بلاط", "فولاذ", "أسمنت", "اقياش", "مفاتيح", "كيابل", "حديد", "سيراميك"],
      IECEE: ["إنارة", "كمبيوتر", "كافي", "بوربنك", "إضاءة", "حاسوب", "باور بانك", "شاحن"],
      GCC: ["مكيف", "غسالة", "مروحة", "دفاية", "تكييف", "مكيفات", "غسالات", "مراوح", "دفايات"]
    };

    let bestMatch = null;
    let highestScore = 0;

    Object.entries(productKeywords).forEach(([key, keywords]) => {
      const matches = keywords.filter(keyword => 
        input.includes(keyword) || 
        keyword.includes(input) ||
        // تطابق جزئي أكثر مرونة
        input.split(" ").some(word => keyword.includes(word) && word.length > 2)
      );
      
      const score = matches.length / keywords.length;
      if (score > highestScore && score > 0.1) {
        highestScore = score;
        bestMatch = {
          key,
          value: certificationKeys[key],
          confidence: score
        };
      }
    });

    return bestMatch;
  };

  // وظيفة توليد الردود التلقائية
  const generateBotResponse = (userMessage) => {
    const match = findBestMatch(userMessage);
    
    if (match && match.confidence > 0.1) {
      const responses = [
        `بناءً على استفسارك عن ${match.key}:\n\n${match.value}`,
        `${match.key} يشمل: ${match.value}`,
        `المنتجات المطلوبة لشهادة ${match.key}:\n${match.value}`,
        `شهادة ${match.key} تغطي: ${match.value}`
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // ردود عامة عند عدم وجود تطابق
    const generalResponses = [
      "أعتذر، لم أتمكن من فهم استفسارك بوضوح. يمكنك السؤال عن:\n• PC - شهادات سابر\n• SQM - منتجات البناء\n• IECEE - الأجهزة الإلكترونية\n• GCC - الأجهزة المنزلية",
      "يمكنني مساعدتك في الاستفسار عن شهادات المطابقة التالية:\n\n🔹 PC\n🔹 SQM\n🔹 IECEE\n🔹 GCC\n\nما الذي تود معرفته؟",
      "لم أفهم طلبك تماماً. حاول إعادة صياغة السؤال أو اذكر نوع الشهادة المطلوبة (PC, SQM, IECEE, GCC).",
      "أنا هنا للمساعدة! يمكنك سؤالي عن أي من شهادات المطابقة الأربع: PC، SQM، IECEE، أو GCC."
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  // محاكاة كتابة الرد (تأثير الكتابة)
  const simulateTyping = async (responseText) => {
    setIsTyping(true);
    
    // تأخير عشوائي لمحاكاة وقت التفكير (1-3 ثواني)
    const thinkingTime = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
    
    setIsTyping(false);
    
    // إضافة الرد
    const botMessage = {
      id: Date.now().toString(),
      message: responseText,
      senderId: "bot",
      timestamp: new Date().toISOString(),
      isBot: true
    };

    setMessages(prev => [...prev, botMessage]);
    toast.success("تم استلام الرد", { duration: 2000 });
  };

  // إرسال الرسالة
  const handleSend = async () => {
    if (!message.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      senderId: "user",
      timestamp: new Date().toISOString(),
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage("");

    // توليد الرد التلقائي
    const botResponse = generateBotResponse(currentMessage);
    await simulateTyping(botResponse);
  };

  // التمرير التلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // منع التمرير في الخلفية عند فتح الشات
  useEffect(() => {
    if (isOpen) {
      // حفظ موضع التمرير الحالي
      const scrollY = window.scrollY;
      
      // إضافة كلاسات منع التمرير
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // تنظيف عند إغلاق الشات
      return () => {
        // إزالة كلاسات منع التمرير
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // استعادة موضع التمرير
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // التعامل مع الضغط على Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[999999999] flex items-center justify-center">
      <div className="bg-white w-full max-w-md h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold">مساعد شهادات المطابقة</h2>
              <p className="text-xs text-blue-200">
                {isTyping ? "يكتب..." : "متصل"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.isBot ? "" : "flex-row-reverse"}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.isBot ? "bg-blue-500" : "bg-green-500"
                }`}>
                  {msg.isBot ? (
                    <Bot size={16} className="text-white" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-3 shadow-sm text-sm ${
                    msg.isBot
                      ? "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                      : "bg-green-500 text-white rounded-br-md"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      msg.isBot ? "text-gray-400" : "text-green-100"
                    } text-right`}
                  >
                    {new Date(msg.timestamp).toLocaleString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[85%]">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md p-3 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="اسأل عن شهادات المطابقة..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          
          {/* Quick buttons */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {Object.keys(certificationKeys).map((key) => (
              <button
                key={key}
                onClick={() => setMessage(`ما هي شهادة ${key}؟`)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                disabled={isTyping}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

AutoChatbot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AutoChatbot;
