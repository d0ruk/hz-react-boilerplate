import React, { PropTypes } from "react";
import ChatMessage from "./message";

const ChatList = ({ messages }, { viewport }) => (
  <div className="messageListWrapper">
    <ul className="messageList">
      {messages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </ul>
  </div>
);

ChatList.contextTypes = { viewport: PropTypes.object };

export default ChatList;
