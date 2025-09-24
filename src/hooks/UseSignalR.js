import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (apiUrl, eventName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(apiUrl)
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR:", apiUrl); // eslint-disable-line no-console
        connection.on(eventName, (incomingData) => {
          setData(incomingData);
        });
      })
      .catch((err) => console.error("❌ SignalR connection error:", err)); // eslint-disable-line no-console
      

    return () => {
      connection.stop();
    };
  }, [apiUrl, eventName]);

  return data;
};

export default useSignalR;
