import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Send } from "lucide-react"; // تأكد إنك مركب lucide-react
import useSender from "../../hooks/UseSender";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../store/Slice/GetDataApiReducer";
import { toast, Toaster } from "react-hot-toast";
import LoadingButton from "../../Component/shared/LoadingButton";

const ChatModuleCompany = ({ selectedChat, handleClose }) => {
  const [Message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState(null);
  const messagesEndRef = useRef(null);
  const [myId, setMyId] = useState("");

  const isReady = !!role && !!myId && !!selectedChat?.userId;

  const sendMessage = useSender(
    isReady ? "https://customerservice.runasp.net/chatHub" : null,
    isReady ? "ReceiveMessage" : null,
    isReady ? role : null
  );
  const dispatch = useDispatch();

  const getUSerId = async () => {
    const { payload } = await dispatch(GetDataApi());
    setMyId(payload.id);
    setRole(payload.role);
    GetMessage();
  };
  useEffect(() => {
    getUSerId();
  }, []);

  useEffect(() => {
    if (sendMessage?.message) {
      messages.push(sendMessage.message);
      setMessages((prev) => [...prev]);
      toast.success("رسالة جديدة");
    }
  }, [sendMessage?.message]);

  // جلب الرسائل القديمة
  const GetMessage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE4}/chat/${selectedChat?.userId}`,
        { withCredentials: true }
      );
      setMessages(response.data);
    } catch (error) {
      console.log("❌ Error fetching messages:", error);
    }
  };
  useEffect(() => {
    GetMessage();
  }, [selectedChat]);

  // إرسال الرسالة
  // const handleSend = () => {
  //   if (!Message.trim() || !role || !selectedChat) return;
  //   sendMessage.sendMessage(selectedChat?.userId, Message);
  // };

  const handleSend = () => {
    if (!Message.trim() || !role || !selectedChat) return;
    sendMessage.sendMessage(selectedChat?.userId, Message);

    // 👇 أضف الرسالة يدويًا للشات
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9), // أو استخدم uuid
      message: Message,
      senderId: myId,
      timestamp: new Date().toISOString(), // أو فورمات مناسب لك
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage(""); // مسح الانبوت
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-[999999999] flex items-center justify-center">
      <div className="bg-white w-full max-w-md h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-base font-semibold">
                محادثة {selectedChat?.name}
              </h2>
              <p className="text-xs text-blue-200">
                {selectedChat?.name ? `#${selectedChat?.name}` : "#مستورد"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-xl ml-2"
            >
              ✕
            </button>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            &times;
          </button>
        </div>
        {/* Chat Body */}

        {sendMessage?.connected ? (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === myId ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-sm text-sm ${
                    msg.senderId === myId
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  }`}
                >
                  {msg.senderId !== myId ? (
                    <div className="text-xs font-semibold text-blue-600 mb-1">
                      {msg.message}
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-white-600 mb-1">
                      {msg.message}
                    </div>
                  )}
                  <div
                    className={`text-xs mt-2 ${
                      msg.senderId === myId ? "text-blue-100" : "text-gray-400"
                    } text-right`}
                  >
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleString("ar-EG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50 justify-center items-center">
            <LoadingButton
              isLoading={true}
              loadingText="جاري الاتصال بالخادم..."
            />
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="اكتب رسالتك..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              disabled={!selectedChat?.sendMessage}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

ChatModuleCompany.propTypes = {
  selectedChat: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ChatModuleCompany;
