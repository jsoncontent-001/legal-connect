// src/components/chat/ChatModal.jsx
import React, { useContext, useState } from "react";
import { X, Circle, Maximize2, Minimize2 } from "lucide-react";
import "../../styles/components/Chat.css";
import { ChatContext } from "../../contexts/ChatContext";
import { getInitials } from "../../utils/helpers";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatModal = () => {
  const { chatOpen, activeLawyer, closeChat } = useContext(ChatContext);
  const [maximized, setMaximized] = useState(false);

  if (!chatOpen || !activeLawyer) return null;

  return (
    <div
      className="chat-modal"
      style={maximized ? {
        padding: 0,
        alignItems: "stretch",
        justifyContent: "stretch",
      } : {}}
    >
      <div
        className="chat-window"
        style={maximized ? {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        } : {}}
      >
        <div className="chat-header">
          <div
            className="user-avatar"
            style={{
              background: "var(--gold)",
              color: "var(--navy)",
              width: 38,
              height: 38,
              fontSize: "0.85rem",
            }}
          >
            {getInitials(activeLawyer.fullName)}
          </div>
          <div className="chat-header-info">
            <div className="chat-header-name">{activeLawyer.fullName}</div>
            <div
              className="chat-header-spec"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Circle
                size={7}
                fill={activeLawyer.available ? "var(--success)" : "var(--gray-400)"}
                color="transparent"
              />
              {activeLawyer.specialization}
            </div>
          </div>

          {/* Maximize / Minimize button */}
          <button
            onClick={() => setMaximized((m) => !m)}
            className="chat-close"
            aria-label={maximized ? "Minimize chat" : "Maximize chat"}
            style={{ marginRight: "4px" }}
          >
            {maximized ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>

          <button
            className="chat-close"
            onClick={closeChat}
            aria-label="Close chat"
          >
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
