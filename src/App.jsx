import { useState, useEffect } from "react";

const LOGO_SRC = "data:image/png;base64,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";

/* ── API ───────────────────────────────────────────────── */
async function airtableFetch(path, opts = {}) {
  const res = await fetch(`/api/airtable?path=${encodeURIComponent(path)}`, {
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...(opts.body ? { body: opts.body } : {}),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function getCreatorByEmail(email) {
  const data = await airtableFetch(`Creators?filterByFormula={Email}="${email.toLowerCase()}"&maxRecords=1`);
  return data.records[0] || null;
}
async function getOrdersForCreator(email) {
  const formula = encodeURIComponent(`FIND("${email.toLowerCase()}", ARRAYJOIN({Creator Email}))`);
  const data = await airtableFetch(`Orders?filterByFormula=${formula}&sort[0][field]=DM+Sent+Date&sort[0][direction]=desc`);
  return data.records;
}
async function getWithdrawalsForCreator(email) {
  const data = await airtableFetch(`Withdrawals?filterByFormula={Creator Email}="${email.toLowerCase()}"&sort[0][field]=Created+Date&sort[0][direction]=desc`);
  return data.records;
}
async function updateOrder(recordId, fields) {
  return airtableFetch(`Orders/${recordId}`, { method: "PATCH", body: JSON.stringify({ fields }) });
}
async function updateCreator(recordId, fields) {
  return airtableFetch(`Creators/${recordId}`, { method: "PATCH", body: JSON.stringify({ fields }) });
}
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const font = "'Inter', -apple-system, sans-serif";

const statusMap = {
  Invited:   { color: "#FF9F43", label: "NEW" },
  Accepted:  { color: "#54A0FF", label: "ACTIVE" },
  Posted:    { color: "#A78BFA", label: "REVIEW" },
  Completed: { color: "#2ED573", label: "DONE" },
  Declined:  { color: "#FF6B6B", label: "PASS" },
};

const StatusPill = ({ status }) => {
  const s = statusMap[status] || statusMap.Invited;
  return (
    <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: s.color, background: `${s.color}18` }}>{s.label}</span>
  );
};

/* ── LOGIN ─────────────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!email.trim()) return;
    setLoading(true); setError("");
    try {
      const c = await getCreatorByEmail(email.trim());
      if (!c) { setError("Email not found. Contact your manager."); setLoading(false); return; }
      const code = generateOTP();
      setPending(code);
      const res = await fetch("/api/send-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code }),
      });
      if (!res.ok) throw new Error();
      setStep("otp");
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const verify = async () => {
    if (otp.trim() !== pending) { setError("Wrong code."); return; }
    setLoading(true);
    const c = await getCreatorByEmail(email.trim());
    onLogin(c, email.trim());
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808", fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
      <div style={{ width: 400, padding: "44px 36px", borderRadius: 28, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(40px)" }}>
        <img src={LOGO_SRC} alt="BIG Records" style={{ height: 32, marginBottom: 32, display: "block" }} />
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.03em", color: "#FFF" }}>Creator Portal</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "0 0 36px" }}>Sign in to your account</p>

        {step === "email" ? (<>
          <input type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: 15, fontFamily: font, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
          {error && <p style={{ color: "#FF6B6B", fontSize: 13, margin: "0 0 10px" }}>{error}</p>}
          <button onClick={sendOtp} disabled={loading} style={{
            width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
            background: "#FFF", color: "#000", fontSize: 15, fontWeight: 500, fontFamily: font,
            cursor: "pointer", opacity: loading ? 0.5 : 1,
          }}>{loading ? "Checking..." : "Send Code"}</button>
        </>) : (<>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 14px" }}>
            Code sent to <strong style={{ color: "#FFF" }}>{email}</strong>
          </p>
          <input type="text" placeholder="000000" value={otp}
            onChange={(e) => setOtp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && verify()}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", fontSize: 26, fontFamily: font, outline: "none", boxSizing: "border-box", marginBottom: 10, textAlign: "center", letterSpacing: 10 }} />
          {error && <p style={{ color: "#FF6B6B", fontSize: 13, margin: "0 0 10px" }}>{error}</p>}
          <button onClick={verify} disabled={loading} style={{
            width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
            background: "#FFF", color: "#000", fontSize: 15, fontWeight: 500, fontFamily: font,
            cursor: "pointer", opacity: loading ? 0.5 : 1,
          }}>{loading ? "Verifying..." : "Login"}</button>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button onClick={() => { setStep("email"); setError(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: font, cursor: "pointer" }}>Back</button>
          </div>
        </>)}
      </div>
    </div>
  );
};

/* ── CAMPAIGN CARD ─────────────────────────────────────── */
const CampaignCard = ({ record, onClick }) => {
  const f = record.fields;
  const status = f.Status || "Invited";
  const s = statusMap[status] || statusMap.Invited;
  const campaign = Array.isArray(f["Campaign Name Lookup"]) ? f["Campaign Name Lookup"][0] : "—";
  const songName = Array.isArray(f["Song Name Lookup"]) ? f["Song Name Lookup"][0] : "";
  const totalPrice = f["Total Price"] || 0;
  const soundCover = Array.isArray(f["Sound Cover Lookup"]) && f["Sound Cover Lookup"][0] ? f["Sound Cover Lookup"][0].url : "";
  const deadline = Array.isArray(f["Deadline Lookup"]) ? f["Deadline Lookup"][0] : "";
  const daysLeft = deadline ? Math.ceil((new Date(deadline) - new Date()) / 86400000) : null;
  const isExpired = deadline && new Date(deadline) < new Date() && !["Posted", "Completed"].includes(status);
  const assignedPosts = f["Assigned Posts"] || 1;

  return (
    <div onClick={onClick} style={{
      borderRadius: 24, overflow: "hidden", cursor: "pointer",
      position: "relative", height: soundCover ? 220 : 140,
      background: soundCover ? "transparent" : "#151515",
    }}>
      {soundCover && (
        <img src={soundCover} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(1.1)" }} alt="" />
      )}
      <div style={{ position: "absolute", inset: 0, background: soundCover ? "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.85) 100%)" : "none" }} />
      <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: s.color, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", border: `1px solid ${s.color}30` }}>{s.label}</span>
        <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#FFF", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}>${totalPrice}</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 18px" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#FFF", letterSpacing: "-0.02em" }}>{campaign}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{songName}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{assignedPosts} post{assignedPosts > 1 ? "s" : ""}</span>
          {deadline && !["Completed","Declined"].includes(status) && (
            <span style={{
              padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500,
              background: isExpired ? "rgba(255,107,107,0.2)" : daysLeft <= 3 ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.1)",
              color: isExpired ? "#FF6B6B" : daysLeft <= 3 ? "#FBBF24" : "rgba(255,255,255,0.6)",
              border: `1px solid ${isExpired ? "rgba(255,107,107,0.3)" : daysLeft <= 3 ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.1)"}`,
            }}>
              {isExpired ? "Expired" : `${daysLeft}d left · ${new Date(deadline).toLocaleDateString("en", { month: "short", day: "numeric" })}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── CAMPAIGN DETAIL (FULLSCREEN GLASS) ────────────────── */
const CampaignSheet = ({ record, onUpdate, onClose }) => {
  const f = record.fields;
  const status = f.Status || "Invited";
  const s = statusMap[status] || statusMap.Invited;
  const campaign = Array.isArray(f["Campaign Name Lookup"]) ? f["Campaign Name Lookup"][0] : "—";
  const songName = Array.isArray(f["Song Name Lookup"]) ? f["Song Name Lookup"][0] : "";
  const soundLink = Array.isArray(f["Sound Link Lookup"]) ? f["Sound Link Lookup"][0] : "";
  const soundCover = Array.isArray(f["Sound Cover Lookup"]) && f["Sound Cover Lookup"][0] ? f["Sound Cover Lookup"][0].url : "";
  const brief = Array.isArray(f["Brief Lookup"]) ? f["Brief Lookup"][0] : "";
  const deadline = Array.isArray(f["Deadline Lookup"]) ? f["Deadline Lookup"][0] : "";
  const assignedPosts = f["Assigned Posts"] || 1;
  const totalPrice = f["Total Price"] || 0;
  const isExpired = deadline && new Date(deadline) < new Date() && !["Posted", "Completed"].includes(status);
  const daysLeft = deadline ? Math.ceil((new Date(deadline) - new Date()) / 86400000) : null;
  const existingLinks = f["Video Links"] || "";

  const [videoLinks, setVideoLinks] = useState(
    existingLinks ? existingLinks.split("\n").filter(Boolean) : Array(assignedPosts).fill("")
  );
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const doUpdate = async (fields) => {
    setSubmitting(true);
    await updateOrder(record.id, fields);
    onUpdate(record.id, fields);
    setSubmitting(false);
    onClose();
  };
  const handleSubmit = async () => {
    const links = videoLinks.filter((l) => l.trim());
    if (links.length < assignedPosts) { setMsg(`Enter all ${assignedPosts} video link(s).`); return; }
    setMsg(""); setSubmitting(true);
    await updateOrder(record.id, { Status: "Posted", "Video Links": links.join("\n") });
    onUpdate(record.id, { Status: "Posted", "Video Links": links.join("\n") });
    setSubmitting(false); setMsg("Submitted");
  };

  const inp = { width: "100%", padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#FFF", fontSize: 14, fontFamily: font, outline: "none", boxSizing: "border-box", marginBottom: 8 };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#000", overflowY: "auto" }}>
      {soundCover && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "65vh" }}>
          <img src={soundCover} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.95) 85%, #000 100%)" }} />
        </div>
      )}
      <button onClick={onClose} style={{
        position: "fixed", top: 16, left: 16, zIndex: 210,
        width: 40, height: 40, borderRadius: 20,
        background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <div style={{
        position: "relative", marginTop: soundCover ? "50vh" : "60px", minHeight: "50vh",
        borderRadius: "32px 32px 0 0",
        background: "rgba(18,18,18,0.75)", backdropFilter: "blur(60px)", WebkitBackdropFilter: "blur(60px)",
        border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none",
        padding: "28px 24px 40px",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
        </div>

        <StatusPill status={status} />
        <div style={{ fontSize: 28, fontWeight: 500, color: "#FFF", letterSpacing: "-0.03em", marginTop: 12 }}>{campaign}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{songName}</div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 16, margin: "28px 0 0" }}>
          <span style={{ fontSize: 42, fontWeight: 500, color: "#FFF", letterSpacing: "-0.04em" }}>${totalPrice}</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{assignedPosts} post{assignedPosts > 1 ? "s" : ""}</span>
        </div>

        {deadline && !["Completed","Declined"].includes(status) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0 0" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Deadline:</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: isExpired ? "#FF6B6B" : daysLeft <= 3 ? "#FBBF24" : "#FFF" }}>
              {new Date(deadline).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span style={{
              padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500,
              color: isExpired ? "#FF6B6B" : daysLeft <= 3 ? "#FBBF24" : "rgba(255,255,255,0.5)",
              background: isExpired ? "rgba(255,107,107,0.15)" : daysLeft <= 3 ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.06)",
            }}>
              {isExpired ? "Expired" : `${daysLeft}d left`}
            </span>
          </div>
        )}

        {["Invited","Accepted"].includes(status) && !isExpired && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: "8px 0 0", lineHeight: 1.5 }}>
            Submit your video before the deadline or the promo will be automatically cancelled.
          </div>
        )}

        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", margin: "20px 0 24px" }} />

        {brief && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", fontWeight: 500, marginBottom: 10 }}>BRIEF</div>
            <div style={{ borderRadius: 18, padding: "18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>{brief}</div>
          </div>
        )}

        {soundLink && (
          <a href={soundLink} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: 12,
            borderRadius: 18, padding: "16px 18px", marginBottom: 28,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
            color: "#FFF", fontSize: 14, textDecoration: "none", fontWeight: 500,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>♫</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Sound Link</div>
            </div>
            <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.2)", fontSize: 18 }}>↗</span>
          </a>
        )}

        {status === "Invited" && !isExpired && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => doUpdate({ Status: "Accepted" })} disabled={submitting} style={{ flex: 2, padding: "18px 0", borderRadius: 18, border: "none", background: "#FFF", color: "#000", fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer", opacity: submitting ? 0.5 : 1 }}>Accept</button>
            <button onClick={() => doUpdate({ Status: "Declined" })} disabled={submitting} style={{ flex: 1, padding: "18px 0", borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer", opacity: submitting ? 0.5 : 1 }}>Pass</button>
          </div>
        )}

        {status === "Accepted" && !isExpired && (
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", fontWeight: 500, marginBottom: 10 }}>SUBMIT VIDEOS</div>
            {Array.from({ length: assignedPosts }, (_, i) => (
              <input key={i} type="url" placeholder={`Video Link #${i + 1}`} value={videoLinks[i] || ""}
                onChange={(e) => { const v = [...videoLinks]; v[i] = e.target.value; setVideoLinks(v); }} style={inp} />
            ))}
            {msg && <p style={{ color: msg === "Submitted" ? "#2ED573" : "#FF6B6B", fontSize: 13, margin: "0 0 10px" }}>{msg}</p>}
            <button onClick={handleSubmit} disabled={submitting} style={{ width: "100%", padding: "18px 0", borderRadius: 18, border: "none", background: "#A78BFA", color: "#FFF", fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer", opacity: submitting ? 0.5 : 1, marginTop: 4 }}>{submitting ? "Submitting..." : "Submit"}</button>
          </div>
        )}

        {["Posted","Completed"].includes(status) && existingLinks && (
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", fontWeight: 500, marginBottom: 10 }}>VIDEOS</div>
            {existingLinks.split("\n").filter(Boolean).map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 6, color: "#A78BFA", fontSize: 13, textDecoration: "none" }}>Video #{i + 1} ↗</a>
            ))}
          </div>
        )}

        {status === "Completed" && (
          <div style={{ marginTop: 20, padding: "18px 20px", borderRadius: 18, background: "rgba(46,213,115,0.06)", border: "1px solid rgba(46,213,115,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(46,213,115,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#2ED573" }}>+${totalPrice} added to balance</div>
              <div style={{ fontSize: 12, color: "rgba(46,213,115,0.5)", marginTop: 2 }}>Campaign completed</div>
            </div>
          </div>
        )}

        {isExpired && status !== "Declined" && (
          <div style={{ padding: "14px 16px", borderRadius: 16, background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.12)" }}>
            <span style={{ color: "#FF6B6B", fontSize: 13 }}>Deadline has passed</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── TAB: PROMOS ───────────────────────────────────────── */
const PromosTab = ({ orders, name, onUpdate }) => {
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState(null);

  const statusPriority = { Invited: 0, Accepted: 1, Posted: 2, Completed: 3, Declined: 4 };
  const filters = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "accepted", label: "Accepted" },
    { key: "submitted", label: "Submitted" },
    { key: "completed", label: "Completed" },
    { key: "declined", label: "Declined" },
  ];

  const filtered = orders.filter((o) => {
    if (filter === "new") return o.fields.Status === "Invited";
    if (filter === "accepted") return o.fields.Status === "Accepted";
    if (filter === "submitted") return o.fields.Status === "Posted";
    if (filter === "completed") return o.fields.Status === "Completed";
    if (filter === "declined") return o.fields.Status === "Declined";
    return true;
  }).sort((a, b) => (statusPriority[a.fields.Status] ?? 9) - (statusPriority[b.fields.Status] ?? 9));

  return (
    <div>
      {detail && <CampaignSheet record={detail} onUpdate={onUpdate} onClose={() => setDetail(null)} />}
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "0 0 2px" }}>Welcome back</p>
        <h1 style={{ fontSize: 34, fontWeight: 500, margin: 0, letterSpacing: "-0.04em", color: "#FFF" }}>{name}</h1>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: "8px 16px", borderRadius: 20,
            background: filter === f.key ? "rgba(255,255,255,0.1)" : "transparent",
            border: filter === f.key ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
            color: filter === f.key ? "#FFF" : "rgba(255,255,255,0.3)",
            fontSize: 13, fontWeight: 500, fontFamily: font, cursor: "pointer",
          }}>{f.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((record) => (
          <CampaignCard key={record.id} record={record} onClick={() => setDetail(record)} />
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.25)", fontSize: 14 }}>No promos found</div>}
      </div>
    </div>
  );
};

/* ── TAB: WALLET ───────────────────────────────────────── */
const WalletTab = ({ orders, withdrawals, userEmail, creatorPaypal, creatorName, onWithdrawDone }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);

  const totalEarned = orders.filter((o) => o.fields.Status === "Completed").reduce((s, o) => s + (o.fields["Total Price"] || 0), 0);
  const totalWithdrawn = withdrawals.filter((w) => ["Completed", "Pending"].includes(w.fields.Status)).reduce((s, w) => s + (w.fields.Amount || 0), 0);
  const balance = totalEarned - totalWithdrawn;

  const handleWithdraw = async () => {
    if (!creatorPaypal) { alert("Please set your PayPal in Account first."); return; }
    setWithdrawing(true);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, amount: balance, paypal: creatorPaypal, name: creatorName }),
      });
      if (!res.ok) throw new Error();
      setWithdrawDone(true); onWithdrawDone();
    } catch { alert("Something went wrong. Try again."); }
    setWithdrawing(false);
  };

  const ledger = [
    ...orders.filter(o => o.fields.Status === "Completed").map(o => ({
      type: "in", amount: o.fields["Total Price"] || 0,
      label: "Earned from " + (Array.isArray(o.fields["Campaign Name Lookup"]) ? o.fields["Campaign Name Lookup"][0] : "Campaign"),
      date: o.fields["Last Modified"] || "",
    })),
    ...withdrawals.map(w => ({
      type: "out", amount: w.fields.Amount || 0,
      label: "Withdrawal", date: w.fields["Created Date"] || "", status: w.fields.Status,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div style={{ textAlign: "center", padding: "32px 0 40px" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em", marginBottom: 8 }}>BALANCE</div>
        <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.05em", color: "#FFF" }}>${balance}</div>
        {balance > 0 && !withdrawDone && (
          <button onClick={handleWithdraw} disabled={withdrawing} style={{
            padding: "14px 56px", borderRadius: 50, border: "none",
            background: "#FFF", color: "#000", marginTop: 28,
            fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer",
            opacity: withdrawing ? 0.5 : 1,
          }}>{withdrawing ? "Processing..." : "Withdraw"}</button>
        )}
        {withdrawDone && (
          <div style={{ marginTop: 28, padding: "12px 28px", borderRadius: 50, background: "rgba(46,213,115,0.1)", border: "1px solid rgba(46,213,115,0.2)", display: "inline-block" }}>
            <span style={{ color: "#2ED573", fontSize: 14, fontWeight: 500 }}>Requested — processing within 48h</span>
          </div>
        )}
        {balance === 0 && !withdrawDone && <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>No balance to withdraw</div>}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Earned</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#FFF", marginTop: 6 }}>${totalEarned}</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Withdrawn</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#2ED573", marginTop: 6 }}>${totalWithdrawn}</div>
        </div>
      </div>
      {ledger.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, overflow: "hidden" }}>
          <button onClick={() => setShowHistory(!showHistory)} style={{
            width: "100%", padding: "16px 20px", border: "none", background: "transparent", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: font,
          }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Transactions</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showHistory ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {showHistory && (
            <div style={{ padding: "0 20px 16px" }}>
              {ledger.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFF" }}>{item.label}</div>
                    {item.date && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>{new Date(item.date).toLocaleDateString("en", { month: "short", day: "numeric" })}</div>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: item.type === "in" ? "#2ED573" : "#FFF" }}>{item.type === "in" ? "+" : "−"}${item.amount}</div>
                    {item.type === "out" && item.status && (
                      <span style={{ fontSize: 10, letterSpacing: "0.06em", color: item.status === "Completed" ? "#2ED573" : "#FBBF24" }}>{item.status === "Completed" ? "PAID" : "PROCESSING"}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── TAB: ACCOUNT ──────────────────────────────────────── */
const AccountTab = ({ creator, userEmail, onPaypalSaved, onLogout }) => {
  const [paypal, setPaypal] = useState(creator.fields.PayPal || "");
  const [editing, setEditing] = useState(!creator.fields.PayPal);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!paypal.trim()) return;
    setSaving(true);
    await updateCreator(creator.id, { PayPal: paypal.trim() });
    onPaypalSaved(paypal.trim());
    setSaving(false); setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inp = { width: "100%", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#FFF", fontSize: 14, fontFamily: font, outline: "none", boxSizing: "border-box", marginBottom: 10 };

  return (
    <div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "24px 20px" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 18 }}>PAYMENT</div>
        {!editing ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px" }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>PayPal</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#FFF", marginTop: 3 }}>{paypal || "Not set"}</div>
            </div>
            <button onClick={() => setEditing(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "8px 18px", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", fontFamily: font, cursor: "pointer" }}>Edit</button>
          </div>
        ) : (
          <div>
            <input type="text" placeholder="PayPal email address" value={paypal} onChange={(e) => setPaypal(e.target.value)} style={inp} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: "15px 0", borderRadius: 14, border: "none", background: "#FFF", color: "#000", fontSize: 14, fontWeight: 500, fontFamily: font, cursor: "pointer", opacity: saving ? 0.5 : 1 }}>{saving ? "Saving..." : "Save"}</button>
              {creator.fields.PayPal && <button onClick={() => { setEditing(false); setPaypal(creator.fields.PayPal || ""); }} style={{ flex: 1, padding: "15px 0", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 500, fontFamily: font, cursor: "pointer" }}>Cancel</button>}
            </div>
          </div>
        )}
        {saved && <div style={{ marginTop: 12, fontSize: 13, color: "#2ED573", textAlign: "center" }}>Saved</div>}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "24px 20px", marginTop: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 18 }}>ACCOUNT</div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Email</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#FFF", marginTop: 3 }}>{userEmail}</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "24px 20px", marginTop: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 18 }}>RATE</div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Base Price Per Post</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#FFF", marginTop: 3 }}>${creator.fields["Price per Post"] || "—"}</div>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 12, lineHeight: 1.5 }}>
          To change your rate, contact support at{" "}
          <a href="https://instagram.com/bigrecordspromo" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>@bigrecordspromo</a>
          {" "}or{" "}
          <a href="mailto:promo@bigrecords.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>promo@bigrecords.com</a>
        </div>
      </div>
      <button onClick={onLogout} style={{
        width: "100%", padding: "14px 0", borderRadius: 14, marginTop: 24,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 500, fontFamily: font, cursor: "pointer",
      }}>Log out</button>
    </div>
  );
};

/* ── MAIN APP ──────────────────────────────────────────── */
export default function App() {
  const [creator, setCreator] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("promos");

  useEffect(() => {
    const saved = localStorage.getItem("big_email");
    if (saved) {
      getCreatorByEmail(saved).then((c) => {
        if (c) {
          setCreator(c); setUserEmail(saved);
          Promise.all([getOrdersForCreator(saved), getWithdrawalsForCreator(saved)]).then(([o, w]) => {
            setOrders(o); setWithdrawals(w); setLoading(false);
          });
        } else { localStorage.removeItem("big_email"); setLoading(false); }
      });
    } else { setLoading(false); }
  }, []);

  const handleLogin = async (rec, email) => {
    setLoading(true); setCreator(rec); setUserEmail(email);
    const [o, w] = await Promise.all([getOrdersForCreator(email), getWithdrawalsForCreator(email)]);
    setOrders(o); setWithdrawals(w);
    localStorage.setItem("big_email", email); setLoading(false);
  };

  const handleUpdate = (id, newFields) =>
    setOrders((prev) => prev.map((r) => (r.id === id ? { ...r, fields: { ...r.fields, ...newFields } } : r)));

  const handleWithdrawDone = async () => {
    const w = await getWithdrawalsForCreator(userEmail);
    setWithdrawals(w);
  };

  const handlePaypalSaved = (val) => {
    setCreator((prev) => ({ ...prev, fields: { ...prev.fields, PayPal: val } }));
  };

  const handleLogout = () => { localStorage.removeItem("big_email"); setCreator(null); };

  if (!creator) return <LoginScreen onLogin={handleLogin} />;

  const name = (creator.fields["Creator Name"] || creator.fields["Name"] || userEmail).split(" ")[0];
  const tabs = [
    { key: "promos", label: "Promos" },
    { key: "wallet", label: "Wallet" },
    { key: "account", label: "Account" },
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: font, color: "#FFF", paddingBottom: 80, background: "#080808" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet" />

      <header style={{
        padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.85)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <img src={LOGO_SRC} alt="BIG Records" style={{ height: 28 }} />
        <div style={{ width: 34, height: 34, borderRadius: 17, background: "linear-gradient(135deg, #A78BFA, #60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500 }}>{name[0]}</div>
      </header>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 48, color: "rgba(255,255,255,0.25)", fontSize: 14 }}>Loading...</div>
        ) : (<>
          {tab === "promos" && <PromosTab orders={orders} name={name} onUpdate={handleUpdate} />}
          {tab === "wallet" && <WalletTab orders={orders} withdrawals={withdrawals} userEmail={userEmail} creatorPaypal={creator.fields.PayPal || ""} creatorName={creator.fields["Creator Name"] || creator.fields["Name"] || userEmail} onWithdrawDone={handleWithdrawDone} />}
          {tab === "account" && <AccountTab creator={creator} userEmail={userEmail} onPaypalSaved={handlePaypalSaved} onLogout={handleLogout} />}
        </>)}

        <div style={{ textAlign: "center", padding: "32px 0 80px", color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
          Need help? DM us on{" "}
          <a href="https://instagram.com/bigrecordspromo" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>@bigrecordspromo</a>
          {" "}or email{" "}
          <a href="mailto:promo@bigrecords.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>promo@bigrecords.com</a>
        </div>
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(8,8,8,0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "center", padding: "10px 0 28px", zIndex: 100,
      }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, maxWidth: 100, padding: "6px 0", border: "none",
            background: "transparent", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}>
            <div style={{ width: tab === t.key ? 16 : 0, height: 2, borderRadius: 1, background: "#FFF", transition: "width 0.2s" }} />
            <span style={{ fontSize: 11, fontWeight: 500, fontFamily: font, color: tab === t.key ? "#FFF" : "rgba(255,255,255,0.2)" }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
