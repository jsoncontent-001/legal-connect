// src/components/chat/ChatModal.jsx
import React, { useContext } from "react";
import { X, Circle } from "lucide-react";
import "../../styles/components/Chat.css";
import { ChatContext } from "../../contexts/ChatContext";
import { getInitials } from "../../utils/helpers";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatModal = () => {
  const { chatOpen, activeLawyer, closeChat } = useContext(ChatContext);

  if (!chatOpen || !activeLawyer) return null;

  return (
    <div className="chat-modal">
      <div className="chat-window">
        <div className="chat-header">
          <div className="user-avatar" style={{ background: "var(--gold)", color: "var(--navy)", width: 38, height: 38, fontSize: "0.85rem" }}>
            {getInitials(activeLawyer.fullName)}
          </div>
          <div className="chat-header-info">
            <div className="chat-header-name">{activeLawyer.fullName}</div>
            <div className="chat-header-spec" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Circle size={7} fill={activeLawyer.available ? "var(--success)" : "var(--gray-400)"} color="transparent" />
              {activeLawyer.specialization}
            </div>
          </div>
          <button className="chat-close" onClick={closeChat} aria-label="Close chat">
            <X size={18} />
          </button>
        </div>
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatModal;
