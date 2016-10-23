import React, { PropTypes } from "react";

const ChatMessage = ({ authorId, text, t }, { viewport }) => (
  <li className="messageItem">
    <img className="avatar" height="16px" width="16px" src={viewport && `http://placehold.it/16x16/${authorId}/000000`} />
    <span className="text">{text}</span>
    <span className="datetime">{t.toDateString()}</span>
  </li>
);

ChatMessage.contextTypes = { viewport: PropTypes.object };

export default ChatMessage;
