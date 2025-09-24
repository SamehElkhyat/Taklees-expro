import React from "react";
import ChatModuleCompany from "./ChatModuleCompany";


function ChannelConnection({ selectedChat, handleCloseModal }) {
  return (
    <>
      <ChatModuleCompany
        selectedChat={selectedChat}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default ChannelConnection;
