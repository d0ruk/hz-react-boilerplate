import React, { PropTypes } from "react";

const ChatMessage = ({ authorId, text, t }, { viewport }) => (
  <li className="messageItem">
    <img className="avatar" height="50px" width="50px" src={`http://lorempixel.com/${(viewport.w / 200).toFixed()}/${(viewport.h / 20).toFixed()}`} />
    <span className="text">{text}</span>
    <span className="datetime">{t.toDateString()}</span>
  </li>
);

ChatMessage.contextTypes = { viewport: PropTypes.object };


export default ChatMessage;
