import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

function Testing() {
  const [connection, setConnection] = useState(null);
  const [num, setNum] = useState("");
  const [notifications, setNotifications] = useState([]);

  // إنشاء اتصال SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://user.runasp.net/ChatHub") // نفس اسم الـ Hub من الباك
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // تشغيل الاتصال واستقبال الإشعارات
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("✅ Connected to SignalR");
          // استقبال الإشعارات
          connection.on("ReceiveNotification", (receivedNum) => {
            setNotifications((prev) => [...prev, receivedNum]);
          });
        })
        .catch((error) => console.error("❌ Connection error:", error));
    }
  }, [connection]);

  const sendNotification = async () => {
    try {
      await axios.post(`https://user.runasp.net/api/send?num=${num}`);
      setNum("");
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🔔 إشعارات بالأرقام (SignalR)</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="رقم"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button onClick={sendNotification} style={{ marginLeft: "10px" }}>
          إرسال
        </button>
      </div>

      <div>
        <h3>📥 الإشعارات:</h3>
        <ul>
          {notifications.map((n, index) => (
            <li key={index}>📌 الإشعار رقم: {n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Testing;
