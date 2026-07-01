// src/components/chat/ChatMessages.jsx
import React, { useEffect, useRef, useContext, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatContext } from "../../contexts/ChatContext";
import { LawyerContext } from "../../contexts/LawyerContext";
import { formatTime } from "../../utils/helpers";

const ChatMessages = () => {
  const { messages, sending, activeLawyer } = useContext(ChatContext);
  const { currentUser } = useContext(LawyerContext);
  const [otherTyping, setOtherTyping] = useState(false);
  const bottomRef = useRef(null);
  const prevCountRef = useRef(messages.length);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, otherTyping]);

  // Show typing bubble to the RECEIVER when a new message arrives from the other person
  useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    const lastSenderId = last?.sender_id || last?.senderId;

    // Only show typing indicator if the OTHER person just sent a message
    if (lastSenderId && lastSenderId !== currentUser?.id) {
      // Check if this message is new (not already shown)
      if (messages.length > prevCountRef.current) {
        setOtherTyping(true);
        const timer = setTimeout(() => setOtherTyping(false), 2000);
        prevCountRef.current = messages.length;
        return () => clearTimeout(timer);
      }
    }
    prevCountRef.current = messages.length;
  }, [messages, currentUser]);

  if (messages.length === 0 && !sending && !otherTyping) {
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

      {/* Typing indicator — only shows to the RECEIVER */}
      {otherTyping && (
        <div className="message-typing">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      )}

      {/* Own sending indicator */}
      {sending && (
        <div className="message-typing" style={{
          alignSelf: "flex-end",
          background: "rgba(26,46,74,0.1)",
        }}>
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
