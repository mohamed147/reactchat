import React from 'react';

const Message = ({ text, isUser }) => {
  return (
    <div>
      <p style={{ fontWeight: isUser ? 'bold' : 'normal' }}>{text}</p>
    </div>
  );
};

export default Message;
