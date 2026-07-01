// src/components/lawyers/LawyerCard.jsx
import React, { useContext } from "react";
import { Star, MapPin, Clock, MessageCircle, UserCheck } from "lucide-react";
import "../../styles/components/LawyerCard.css";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";
import { ChatContext } from "../../contexts/ChatContext";
import { getInitials, truncate } from "../../utils/helpers";

const LawyerCard = ({ lawyer }) => {
  const { t } = useLanguage();
  const { currentUser, setAuthModal } = useContext(LawyerContext);
  const { openChat } = useContext(ChatContext);

  const handleChat = async () => {
    // Not logged in — prompt login
    if (!currentUser) {
      setAuthModal("login");
      return;
    }
    // Lawyer cannot chat with themselves
    if (currentUser.id === lawyer.id) return;

    // Open chat
    const opened = await openChat(lawyer);
    if (!opened) {
      setAuthModal("login");
    }
  };

  const stars = Math.round(lawyer.rating);
  const isSelf = currentUser?.id === lawyer.id;

  return (
    <div className="card lawyer-card">
      <div className="lawyer-card-header">
        <div className="lawyer-avatar">{getInitials(lawyer.fullName)}</div>
        <div className="lawyer-card-info">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="lawyer-name">{lawyer.fullName}</div>
            {lawyer.verified && (
              <span title="Government Verified" style={{
                display: "inline-flex", alignItems: "center", gap: "3px",
                background: "#dcfce7", color: "#16a34a",
                fontSize: "0.65rem", fontWeight: 600,
                padding: "2px 7px", borderRadius: "100px",
                border: "1px solid #bbf7d0",
              }}>
                ✓ Verified
              </span>
            )}
          </div>
          <div className="lawyer-spec">{lawyer.specialization}</div>
          <div className="lawyer-rating">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill={i <= stars ? "var(--gold)" : "none"} color={i <= stars ? "var(--gold)" : "var(--gray-300)"} />
            ))}
            <span>{lawyer.rating > 0 ? `${lawyer.rating} (${lawyer.reviewCount})` : "New"}</span>
          </div>
        </div>
        <span className={`badge ${lawyer.available ? "badge-available" : "badge-busy"}`}>
          {lawyer.available ? t.lawyers.available : t.lawyers.busy}
        </span>
      </div>

      <div className="lawyer-card-body">
        {lawyer.bio && <p className="lawyer-bio">{truncate(lawyer.bio, 120)}</p>}
        <div className="lawyer-meta">
          <div className="lawyer-meta-item">
            <MapPin size={13} />{lawyer.location}
          </div>
          <div className="lawyer-meta-item">
            <Clock size={13} />{lawyer.experience} {t.lawyers.experience}
          </div>
          <div className="lawyer-meta-item">
            <span className="lawyer-rate">${lawyer.hourlyRate}{t.lawyers.per_hour}</span>
          </div>
        </div>
      </div>

      <div className="lawyer-card-actions">
        {isSelf ? (
          <div style={{
            width: "100%", textAlign: "center", padding: "10px",
            fontSize: "0.82rem", color: "var(--gray-400)",
            background: "var(--gray-50)", borderRadius: "var(--radius)",
            border: "1px solid var(--gray-200)"
          }}>
            This is your profile
          </div>
        ) : (
          <>
            <button
              onClick={handleChat}
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              <MessageCircle size={15} /> {t.lawyers.chat}
            </button>
            <button
              onClick={handleChat}
              className="btn btn-outline"
              style={{ flex: 1, justifyContent: "center" }}
            >
              <UserCheck size={15} /> {t.lawyers.connect}
            </button>
            
          </>
        )}
      </div>
    </div>
  );
};

export default LawyerCard;
