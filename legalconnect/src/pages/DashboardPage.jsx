// src/pages/DashboardPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { LawyerContext } from "../contexts/LawyerContext";
import { ChatContext } from "../contexts/ChatContext";
import { useLanguage } from "../hooks/useLanguage";
import { lawyerService } from "../services/lawyerService";
import { chatService } from "../services/chatService";
import {
  User, ToggleLeft, ToggleRight, MessageCircle,
  Star, DollarSign, Clock, Edit3, Check, X,
  Shield, Loader, MessageSquare
} from "lucide-react";
import { SPECIALIZATIONS, LOCATIONS, getInitials, formatTime } from "../utils/helpers";

const DashboardPage = () => {
  const { currentUser, setAuthModal, logout, refreshLawyers } = useContext(LawyerContext);
  const { openChat } = useContext(ChatContext);
  const { t } = useLanguage();

  const [profile, setProfile] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!currentUser) { setLoadingProfile(false); return; }

    const loadData = async () => {
      setLoadingProfile(true);

      if (currentUser.role === "lawyer") {
        const lp = await lawyerService.getById(currentUser.id);
        setProfile(lp);
        setForm(lp || {});
      }

      const convs = await chatService.getConversations(currentUser.id, currentUser.role);
      setConversations(convs);

      setLoadingProfile(false);
    };

    loadData();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)" }}>
        <div style={{ textAlign: "center", padding: "48px" }}>
          <Shield size={48} color="var(--navy)" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy)", marginBottom: "12px" }}>Sign In Required</h2>
          <p style={{ color: "var(--gray-600)", marginBottom: "24px" }}>Please log in to access your dashboard.</p>
          <button className="btn btn-primary" onClick={() => setAuthModal("login")}>Login</button>
        </div>
      </div>
    );
  }

  if (loadingProfile) {
    return (
      <div style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--gray-400)" }}>
          <Loader size={20} style={{ animation: "spin 1s linear infinite" }} />
          Loading dashboard...
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLawyer = currentUser.role === "lawyer";

  const toggleAvailability = async () => {
    if (!isLawyer || !profile) return;
    const updated = await lawyerService.update(currentUser.id, { available: !profile.available });
    if (updated) { setProfile(updated); setForm(updated); }
    refreshLawyers();
  };

  const handleSave = async () => {
    const updated = await lawyerService.update(currentUser.id, {
      bio: form.bio,
      hourlyRate: form.hourlyRate,
      experience: form.experience,
      specialization: form.specialization,
      location: form.location,
    });
    if (updated) { setProfile(updated); setForm(updated); }
    refreshLawyers();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh", background: "var(--cream)" }}>
      {/* Hero bar */}
      <div style={{ background: "var(--navy)", padding: "40px 0 32px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "var(--gold)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700,
              color: "var(--navy)", flexShrink: 0
            }}>
              {getInitials(currentUser.fullName)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                {isLawyer ? "Lawyer Dashboard" : "Client Dashboard"}
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--white)", fontSize: "1.7rem", fontWeight: 700 }}>
                Welcome, {currentUser.fullName?.split(" ")[0]}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "2px" }}>{currentUser.email}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {saved && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7", padding: "8px 16px", borderRadius: "var(--radius)", fontSize: "0.82rem" }}>
                  <Check size={14} /> Saved
                </div>
              )}
              <button onClick={logout} className="btn btn-ghost" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
                {t.nav.logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "36px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isLawyer ? "1fr 1.6fr" : "1fr", gap: "24px", alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { icon: MessageCircle, label: "Conversations", value: conversations.length },
                { icon: Star, label: "Rating", value: profile?.rating ? `${profile.rating}★` : "New" },
                ...(isLawyer ? [
                  { icon: DollarSign, label: "Rate / hr", value: `$${profile?.hourlyRate || 0}` },
                  { icon: Clock, label: "Experience", value: `${profile?.experience || 0} yrs` },
                ] : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{
                  background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "20px",
                  border: "1px solid var(--gray-200)", display: "flex", flexDirection: "column", gap: "8px"
                }}>
                  <Icon size={18} color="var(--gray-400)" />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--navy)" }}>{value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Availability toggle (lawyers only) */}
            {isLawyer && profile && (
              <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--gray-200)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gray-400)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                  Availability
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.95rem" }}>
                      {profile.available ? "Available for cases" : "Currently busy"}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginTop: "3px" }}>
                      {profile.available ? "Clients can reach you now" : "You won't appear in searches"}
                    </div>
                  </div>
                  <button onClick={toggleAvailability} style={{ display: "flex", alignItems: "center", color: profile.available ? "var(--success)" : "var(--gray-400)", transition: "all 0.2s" }}>
                    {profile.available ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                  </button>
                </div>
              </div>
            )}

            {/* Recent conversations */}
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--gray-200)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gray-400)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                Recent Conversations
              </div>
              {conversations.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--gray-400)", fontSize: "0.85rem", padding: "20px 0" }}>
                  <MessageSquare size={24} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
                  No conversations yet
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {conversations.slice(0, 6).map((conv) => {
                    const isLawyerConv = currentUser.role === "lawyer";
                    return (
                      <div
                        key={conv.id}
                        onClick={() => {
                          const otherUser = {
                            id: isLawyerConv ? conv.customer_id : conv.lawyer_id,
                            fullName: isLawyerConv ? conv.customer_id.slice(0, 8) : conv.lawyer_id.slice(0, 8),
                            specialization: "Legal Chat",
                            available: true,
                          };
                          openChat(otherUser);
                        }}
                        style={{
                          display: "flex", gap: "12px", alignItems: "center",
                          padding: "12px", borderRadius: "var(--radius)",
                          background: "var(--gray-50)", border: "1px solid var(--gray-100)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "var(--navy)", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          color: "var(--white)", fontSize: "0.72rem",
                          fontWeight: 600, flexShrink: 0
                        }}>
                          <MessageCircle size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--navy)" }}>
                            {isLawyerConv ? "Client Message" : "Lawyer Message"}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>
                            {formatTime(conv.updated_at)} · Click to open
                          </div>
                        </div>
                        <div style={{ color: "var(--gold)", fontSize: "0.75rem", fontWeight: 500 }}>
                          Open →
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right column — profile editor */}
          {isLawyer && (
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gray-400)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Profile</div>
                  <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy)", fontSize: "1.2rem", fontWeight: 700 }}>Professional Details</h2>
                </div>
                <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className={`btn ${editing ? "btn-primary" : "btn-outline"}`}
                  style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                >
                  {editing ? <><Check size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
                </button>
              </div>
              <div style={{ padding: "28px" }}>
                {/* Read-only fields */}
                {[
                  { label: "Full Name", value: currentUser.fullName },
                  { label: "Email", value: currentUser.email },
                  { label: "Bar Number", value: profile?.barNumber || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="form-group">
                    <label className="form-label">{label}</label>
                    <div style={{ padding: "10px 14px", background: "var(--gray-50)", borderRadius: "var(--radius)", border: "1.5px solid var(--gray-200)", fontSize: "0.92rem", color: "var(--gray-600)" }}>
                      {value}
                    </div>
                  </div>
                ))}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                  {[
                    { label: "Specialization", key: "specialization", type: "select", options: SPECIALIZATIONS },
                    { label: "Location", key: "location", type: "select", options: LOCATIONS },
                    { label: "Experience (yrs)", key: "experience", type: "number", suffix: " yrs" },
                    { label: "Hourly Rate (USD)", key: "hourlyRate", type: "number", prefix: "$", suffix: "/hr" },
                  ].map(({ label, key, type, options, prefix = "", suffix = "" }) => (
                    <div key={key} className="form-group">
                      <label className="form-label">{label}</label>
                      {editing ? (
                        type === "select" ? (
                          <select className="form-input" value={form[key] || ""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}>
                            {options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input className="form-input" type="number" min="0" value={form[key] || ""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                        )
                      ) : (
                        <div style={{ padding: "10px 14px", background: "var(--gray-50)", borderRadius: "var(--radius)", border: "1.5px solid var(--gray-200)", fontSize: "0.92rem" }}>
                          {prefix}{profile?.[key] ?? "—"}{suffix}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Bio</label>
                  {editing ? (
                    <textarea className="form-input" rows={4} value={form.bio || ""} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} style={{ resize: "vertical" }} />
                  ) : (
                    <div style={{ padding: "12px 14px", background: "var(--gray-50)", borderRadius: "var(--radius)", border: "1.5px solid var(--gray-200)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--gray-700)" }}>
                      {profile?.bio || "No bio added yet."}
                    </div>
                  )}
                </div>

                {editing && (
                  <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1, justifyContent: "center" }}>
                      <Check size={15} /> Save Changes
                    </button>
                    <button className="btn btn-outline" onClick={() => { setEditing(false); setForm(profile || {}); }} style={{ justifyContent: "center" }}>
                      <X size={15} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Incoming clients panel */}
          {isLawyer && (
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)", padding: "28px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                Your Incoming Clients
              </div>
              {conversations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0", color: "var(--gray-400)" }}>
                  <MessageSquare size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                  <p style={{ fontSize: "0.88rem" }}>No clients yet.</p>
                  <p style={{ fontSize: "0.78rem", marginTop: "4px" }}>Make sure your availability is ON so clients can find you.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => openChat({
                        id: conv.customer_id,
                        fullName: "Client",
                        specialization: "Client",
                        available: true,
                      })}
                      style={{
                        display: "flex", gap: "14px", alignItems: "center",
                        padding: "14px", borderRadius: "var(--radius)",
                        background: "var(--gray-50)", border: "1px solid var(--gray-200)",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--gray-200)"}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--navy), var(--navy-light))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--white)", flexShrink: 0
                      }}>
                        <User size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.88rem" }}>Client Request</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginTop: "2px" }}>
                          {formatTime(conv.updated_at)}
                        </div>
                      </div>
                      <div style={{
                        fontSize: "0.75rem", fontWeight: 600, color: "var(--gold)",
                        display: "flex", alignItems: "center", gap: "4px"
                      }}>
                        Open Chat →
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default DashboardPage;
