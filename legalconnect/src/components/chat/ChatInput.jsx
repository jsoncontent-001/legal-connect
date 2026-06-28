// src/components/chat/ChatInput.jsx
import React, { useState } from "react";
import { Send } from "lucide-react";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { useLanguage } from "../../hooks/useLanguage";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useContext(ChatContext);
  const { t } = useLanguage();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-area">
      <textarea
        className="chat-input"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t.chat.placeholder}
      />
      <button className="chat-send-btn" onClick={handleSend} disabled={!text.trim()} aria-label="Send">
        <Send size={16} />
      </button>
    </div>
  );
};

export default ChatInput;
