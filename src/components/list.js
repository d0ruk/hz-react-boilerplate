import React from 'react';
import ChatMessage from './message';

const ChatList = ({ messages }) => (
  <div className='row' style={{ "backgroundColor": "blue" }}>
    <ul>
      {messages.map((message) => <ChatMessage key={message.id} {...message} />)}
    </ul>
  </div>
);

export default ChatList;
