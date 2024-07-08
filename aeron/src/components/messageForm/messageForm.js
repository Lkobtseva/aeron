import React, { useState, useEffect } from "react";

const MessageForm = ({ template, message, setMessage }) => {

  useEffect(() => {
    if (template && template.message) {
      setMessage(template.message);
    }
  }, [template.message]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="message-form">
        <p className="message-form_message">Message</p>
      <textarea
        className="message-form_text"
        value={message}
        onChange={handleChange}
        placeholder="Put the message here..."
      />
    </div>
  );
};

export default MessageForm;
