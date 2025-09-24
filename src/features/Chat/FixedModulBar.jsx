import React, { useState } from "react";
import ChatModule from "./ChatModule";

function FixedModulBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const chatOptions = [
    {
      id: 1,
      name: "سابر - المساعد الذكي",
      description: "مساعد AI للإجابة على الأسئلاء",
      avatar: "🤖",
      status: "online",
      unread: 0,
    },
    {
      id: 2,
      name: "الدعم التقني",
      description: "فريق الدعم التقني",
      avatar: "🛠️",
      status: "online",
      unread: 2,
    },
    {
      id: 3,
      name: "المبيعات",
      description: "فريق المبيعات والاستشارات",
      avatar: "💼",
      status: "away",
      unread: 0,
    },
    {
      id: 4,
      name: "الحسابات",
      description: "استفسارات الحسابات والفواتير",
      avatar: "💰",
      status: "offline",
      unread: 1,
    },
  ];


  const chatStatus = (status) => {
    if (status === "online") return "متاح الآن";
    if (status === "away") return "بعيد";
    return "غير متاح";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="fixed bottom-6 right-6 z-[1333333] bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-[#0A66C2] hover:bg-[#004182] rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-12" : ""
                    }`}
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <circle cx="9" cy="12" r="1" fill="#0A66C2" />
                    <circle cx="12" cy="12" r="1" fill="#0A66C2" />
                    <circle cx="15" cy="12" r="1" fill="#0A66C2" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#28a745] rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-semibold text-base leading-tight mb-1">
                  شات مع سابر
                </h3>
                <p className="text-gray-500 text-sm">
                  مساعد ذكي متاح على مدار الساعة
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-[#28a745] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-[1333332] bg-black bg-opacity-50 flex items-end justify-end p-6">
          <div className="flex gap-4 h-[600px]">
            {/* Sidebar */}
            <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    المحادثات
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">اختر محادثة للبدء</p>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {chatOptions.map((chat) => (
                  <button
                    className="w-full"
                    onClick={() => setSelectedChat(chat)}
                    key={chat.id}
                  >
                    <div
                      key={chat.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedChat?.id === chat.id
                          ? "bg-blue-50 border-r-4 border-r-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                            {chat.avatar}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              chatStatus(chat.status)
                            }`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">
                              {chat.name}
                            </h3>
                            {chat.unread > 0 && (
                              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-xs mt-1 truncate">
                            {chat.description}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                chatStatus(chat.status)
                              }`}
                            ></div>
                            <span className="text-xs text-gray-400">
                              {chatStatus(chat.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    مدعوم بتقنية الذكاء الاصطناعي
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Module */}
            <div className="w-96">
              {selectedChat ? (
                <div className="h-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <ChatModule selectedChat={selectedChat} />
                </div>
              ) : (
                <div className="h-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center p-8">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    مرحباً بك
                  </h3>
                  <p className="text-gray-500 text-center">
                    اختر محادثة من الشريط الجانبي للبدء
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FixedModulBar;
