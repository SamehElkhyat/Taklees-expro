import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../Redux/Features/Slice/GetDataApiReducer";

function UseReciver(hubUrl, methodName) {
  const connectionRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [connected, setConnected] = useState(false);
  const [role, setRole] = useState("");
   const dispatch = useDispatch();

   const getUserId = async () => {
    const { payload } = await dispatch(GetDataApi());
    setRole(payload.role);
   };
   useEffect(() => {
    getUserId();
   }, []);

  useEffect(() => {
    if (!hubUrl || !methodName) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true, // ✅ ده اللي انت عايزه
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    connectionRef.current = connection;

    connection.on(methodName, (msg) => {
      console.log("📩 Message received:", msg);
      setMessage(msg);
    });

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("✅ SignalR Connected");
        setConnected(true);
      } catch (err) {
        console.error("❌ Connection error:", err);
        setTimeout(startConnection, 5000); // إعادة المحاولة بعد 5 ثواني
      }
    };

    connection.onclose(() => {
      console.warn("⚠️ Connection closed. Reconnecting...");
      setConnected(false);
      startConnection();
    });

    startConnection();

    return () => {
      connection.stop();
    };
  }, [hubUrl, methodName]);

  const sendMessage = (receiverId, msg) => {
    if (!connected) {
      console.warn("🔌 Not connected yet.");
      return;
    }

    if (connectionRef.current) {
      connectionRef.current
        .invoke("SendMessageToUser", role==="Saber" ? receiverId : "ce836b22-96a6-462a-9cb7-1b8d90243a17", msg)
        .then(() => {
          console.log(receiverId, msg);
          console.log("✅ Message sent");
        })
        .catch((err) => {
          console.error("❌ Error sending message:", err);
        });
    }
  };

  return { message, sendMessage, connected };
}

export default UseReciver;
