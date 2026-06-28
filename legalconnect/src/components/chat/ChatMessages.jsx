// src/components/chat/ChatMessages.jsx
import React, { useEffect, useRef, useContext } from "react";
import { MessageCircle } from "lucide-react";
import { ChatContext } from "../../contexts/ChatContext";
import { LawyerContext } from "../../contexts/LawyerContext";
import { formatTime } from "../../utils/helpers";

const ChatMessages = () => {
  const { messages, sending } = useContext(ChatContext);
  const { currentUser } = useContext(LawyerContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  if (messages.length === 0 && !sending) {
    return (
      <div className="chat-messages">
        <div className="chat-empty">
          <MessageCircle size={36} />
          <p>Start the conversation.<br />Introduce your legal matter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((msg) => {
        // Supabase messages use sender_id; fallback for legacy shape
        const senderId = msg.sender_id || msg.senderId;
        const isSent = senderId === currentUser?.id;
        const text = msg.content || msg.text || "";
        const ts = msg.created_at || msg.timestamp;

        return (
          <div key={msg.id} className={`message-bubble ${isSent ? "sent" : "received"}`}>
            {text}
            <div className="message-time">{formatTime(ts)}</div>
          </div>
        );
      })}

      {/* Sending indicator */}
      {sending && (
        <div className="message-typing" style={{ alignSelf: "flex-end", background: "rgba(26,46,74,0.08)" }}>
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
