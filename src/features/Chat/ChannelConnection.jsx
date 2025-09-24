import React from "react";
import ChatModule from "./ChatModule";

function ChannelConnection({ selectedChat, handleCloseModal }) {
  return (
    <>
      <ChatModule
        selectedChat={selectedChat}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default ChannelConnection;
