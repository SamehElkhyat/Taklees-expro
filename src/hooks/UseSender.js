import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

function useSender(hubUrl, methodName, role) {
  const connectionRef = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log(role, hubUrl, methodName);
    if (!hubUrl || !methodName || !role) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true, // 💡 هذا امطلوب
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
        // جرب polling مؤقتاً
      })
      .configureLogging(signalR.LogLevel.Warning) // Changed to Warning to avoid 'info' method warning
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        console.log("✅ SignalR Connected");
        setConnected(true);
        connection.on(methodName, (msg) => {
          console.log(methodName, msg);
          setMessage(msg);
        });
      })
      .catch((err) => console.error("❌ Connection failed:", err));

    return () => {
      connection.stop();
    };
  }, [hubUrl, methodName, role]);

  const sendMessage = (receiverId, msg) => {
    if (connectionRef.current) {
      console.log( "iamhere in useSender",receiverId, msg);
      connectionRef.current
        .invoke("SendMessageToUser", receiverId, msg)
        .then((response) => {
          console.log("✅ Message sent", receiverId, msg);
          return msg;
        })

        .catch((err) => console.error("❌ Error sending message:", err));
    }
  };

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connectionRef.current) {
      setConnected(
        connectionRef.current.state === signalR.HubConnectionState.Connected
      );

      // Add connection state change event handler
      connectionRef.current.onclose(() => {
        console.log("Connection closed");
        setConnected(false);
      });
    }
  }, []);

  return { message, sendMessage, connected };
}

export default useSender;
