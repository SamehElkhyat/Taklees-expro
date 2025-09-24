import React, { useState } from "react";
import PropTypes from "prop-types";

const ChatModule = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  // Helper functions for status styling
  const getStatusColor = (status) => {
    if (status === "online") return "bg-green-500";
    if (status === "away") return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getStatusText = (status) => {
    if (status === "online") return "متاح الآن";
    if (status === "away") return "بعيد";
    return "غير متاح";
  };

  const messages = [
    {
      id: 1,
      name: "You",
      role: "Engineering",
      text: "Hi team 👋",
      time: "11:31 AM",
      me: true,
    },
    {
      id: 2,
      name: "You",
      role: "Engineering",
      text: "Anyone on for lunch today",
      time: "11:31 AM",
      me: true,
    },
    {
      id: 3,
      name: "Jav",
      role: "Engineering",
      text: "I'm down! Any ideas??",
      time: "11:35 AM",
    },
    {
      id: 4,
      name: "You",
      role: "Engineering",
      text: "I am down for whatever!",
      time: "11:36 AM",
      me: true,
    },
    {
      id: 5,
      name: "Aubrey",
      role: "Product",
      text: "I was thinking the cafe downtown",
      time: "11:45 AM",
    },
    {
      id: 6,
      name: "Aubrey",
      role: "Product",
      text: "But limited vegan options @Janet!",
      time: "11:46 AM",
    },
    {
      id: 7,
      name: "You",
      role: "Engineering",
      text: "Agreed",
      time: "11:52 PM",
      me: true,
    },
    {
      id: 8,
      name: "Janet",
      role: "Engineering",
      text: "That works- I was actually planning to get a smoothie anyways ✨",
      time: "12:03 PM",
    },
    {
      id: 9,
      name: "Janet",
      role: "Product",
      text: "On for 12:30 PM then ?",
      time: "12:04 PM",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            {selectedChat?.avatar || "💬"}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {selectedChat?.name || "شات مع سابر"}
            </h3>
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  selectedChat?.status
                )}`}
              ></div>
              <span className="text-xs text-gray-500">
                {getStatusText(selectedChat?.status)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="1"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="19"
                cy="12"
                r="1"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="5"
                cy="12"
                r="1"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Date */}
      <div className="text-center text-xs text-gray-400 py-3 bg-gray-50">
        {new Date().toLocaleDateString("ar-SA")}
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.me ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                msg.me
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
              }`}
            >
              {!msg.me && (
                <div className="text-xs font-semibold text-blue-600 mb-1">
                  {msg.name}
                  {msg.role && (
                    <span className="text-gray-500 font-normal">
                      {" "}
                      • {msg.role}
                    </span>
                  )}
                </div>
              )}
              <div className="text-sm leading-relaxed">{msg.text}</div>
              <div
                className={`text-xs mt-2 ${
                  msg.me ? "text-blue-100" : "text-gray-400"
                } text-right`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && message) {
                setMessage("");
              }
            }}
          />

          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {message && (
            <button
              onClick={() => setMessage("")}
              className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>اضغط Enter للإرسال</span>
          <span>مدعوم بالذكاء الاصطناعي</span>
        </div>
      </div>
    </div>
  );
};
ChatModule.propTypes = {
  selectedChat: PropTypes.object.isRequired,
};

export default ChatModule;
