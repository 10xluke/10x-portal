import { useState, useEffect } from "react";

const LOGO_SRC = "data:image/png;base64,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5WaXYbVFW2uzrD9yA+dYa6v5R7GZrcsKiGl/qJF2WYPFBoJcBEE4zLgeFPDAed/3+f1Rz/kdrj/IH0eel+9nY7bgwDnv83zf5/I+7/MCRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERkZZo//9jatWuFagfI4/GgqalJY1WheVNQUCBu3LghDMMQqjEMQzQ0NAiW4uJk88cfSU9PR3BwMIRQr57ZbDasWbMGqampDMki5PDHH7l+/bqS4QAAIQSEENB1nbWFAZnHwY6mZjde0zRl3zsp0sUyTZNHmhiQmfrxqnaviAGZdx6PhxWOGJDpuN1uHmliQKbDGSBiQDhIJwZkcQbEMAy2ggzI/FF9cG6aJltBBmT+qH6hTQgBwzBYWxgQDtKnCwinqBmQeXPjxg3lA9Le3s71JgwIWxArjqGIASFSNyCqn4HZgjAgrGAMCN2qgBAxIDPgNQRSlV/uKBwZGeGRnoW4uDhxxx13IDo6GtHR0YiKikJERATCw8MRHh6OsLAwhISEIDg4GAEBAbDb7QgKChp3IXZsbAy6rkPXdbjdbrjdbgwPD2NoaAiDg4NwuVzo7+9Hb28venp60NPTg9raWk5h38qAyPtBOAb526ZNm0RycjKSkpKQkJCAuLg4LF++HBEREQgKCvL75xseHhYDAwO4evUqOjo60NLSgqamJjQ3N6O1tRVXrlzRGBB2sebF5s2bRUZGBtLT07Fu3TrEx8cjJCRkxjCapjllKKdasjPx/031uul+l6ZpsNlsCA0NRWhoKGJiYpCenj7u59xuNzo6OkR9fT2qq6tRWVmJkydPagzI/5HqC/3mspbs4YcfFllZWdi8eTPS0tIQGRk55fGQx0RWVPk3NE2D3W73ewvpu5xG/muz2RAcHIzExEQkJibiiSee8LY4Fy9exK+//oqffvoJpaWl7KLdjAMHDgghhPB4PEptGmeaphBCiKGhoRn7WDk5OeLYsWOitbV1yo3nPB6P0HVdGIbh/Z0qHQPDMISu68Lj8Uy5+d/AwIA4deqUyMvLE4mJiZwTn6vXXnvNcgHJyMgQRUVFoq2tbdJrZCBUC8NcQyM/py+32y3Onj0rXn75ZQZltvLy8iwTkF27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YhATE4NNmzZN+Vr5NFwZsNlWcvmUW/lcRFVPQvJ4ORwOOJ1O7N27F2fOnFkwA3K/HFXVt5iZa1h8K6vcLtP3bkr5OGj571RXtuVrfF8rp2p9A6kyOUvlcDjwww8/YMeOHQtupoo7K873Af7nuegTn38up10nBsE3DBNfO/GZ6SoHQ+57PDAwgFdffXVBhsNvLYjKa7H80eIsFrI1la3fiRMn8M4776CtrW3BHgQGZJYt4GKqyPPRYsgWEQDOnTuH999/f0GNNTgGucmz/MRCptkPvmX5//bbbzhy5Ai+++47Zc42fglIUFCQ0oU9MjLinYmT93IvpomHuYRC3vUnx06maeLHH3/Exx9/jJMnTyrXDPslIHKxomrdFDnL8sEHH2BgYABvvfUWVq1a5f2+ruvTzkIt1lDIE4fT6cS3336L4uJiVFdXs386k9LSUiWXP8gr/x999JF3Gm7Pnj3i3Llzk64AezweZZeUz3UpiO/n9XXt2jVRUlIidu3aJVjrF0FA5Ps9c+bMpALfuHGjOHLkiGhubp7ydVYJjGma3s8zVfn19vaKkpIS8cILL1gyFH5p+srKysS2bduUu6NN3p7a0tKCxMTEaY9VVlaWyMnJwZYtW7Bu3bpJn1Fe9ZYzerKruZC6nFNdi/G9XiONjY2hvr4e58+fx+nTp1FWVmbp7pNfPtzPP/8sMjMzlT5Q99xzz6zm61NSUsSDDz6IzMxMpKenY/Xq1dNOUpimOW5j74nB8a2ccw2T78VZ+d8T/5WBnWkM1dvbi8bGRlRVVeH3339HVVUVWlpaFs2Ywi8f9O233xZ5eXkIDQ1VakArpyovXLiARx55RPuXwRJr165FWloaUlNTkZSUhNjYWERGRv7rSj/VyoSbbZVcLhe6urrQ2tqKxsZG1NbWoq6uzto3Ki2UgNDULU1sbCzi4uIQGxuLFStW4M4770RUVBSWLVuG2267DSEhIQgODkZgYOCcu6a6rmN0dBSjo6MYHh7G9evX4XK50NfXh7/++gtdXV3o7OxER0cHnE4namtrWRcYEDUlJCSIoKAgyC+5IFK2xoZheNc3ud1ujI2Nwe12o7W1leVLREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREQ0g/8A3L3hhUVf+jEAAAAASUVORK5CYII=";

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
  const data = await airtableFetch(`Creators?filterByFormula=LOWER({Email})="${email.toLowerCase()}"&maxRecords=1`);
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
  Invited:           { color: "#54A0FF", label: "INVITED" },
  Accepted:          { color: "#A78BFA", label: "ACCEPTED" },
  Posted:            { color: "#FBBF24", label: "POSTED" },
  Completed:         { color: "#2ED573", label: "COMPLETED" },
  Declined:          { color: "#888888", label: "DECLINED" },
  "Revision Needed": { color: "#FB923C", label: "REVISION" },
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
    const links = videoLinks.filter((l) => l.trim()).map(l => { const t = l.trim(); return t.match(/^https?:\/\//) ? t : `https://${t}`; });
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

        {(status === "Accepted" || status === "Revision Needed") && !isExpired && (
          <div>
            {status === "Revision Needed" && (
              <div style={{ padding: "14px 16px", borderRadius: 16, background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.15)", marginBottom: 16 }}>
                <span style={{ color: "#FB923C", fontSize: 13, fontWeight: 500 }}>Revision requested — please resubmit your video</span>
              </div>
            )}
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
              <a key={i} href={link.match(/^https?:\/\//)?link:`https://${link}`} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 6, color: "#A78BFA", fontSize: 13, textDecoration: "none" }}>Video #{i + 1} ↗</a>
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

  // Check if a campaign should be archived (expired + not acted on, or declined)
  const isArchived = (o) => {
    const st = o.fields.Status;
    const deadline = Array.isArray(o.fields["Deadline Lookup"]) ? o.fields["Deadline Lookup"][0] : "";
    const isExpired = deadline && new Date(deadline) < new Date();
    // Archive: declined, or expired with status Invited (never acted on)
    if (st === "Declined") return true;
    if (isExpired && st === "Invited") return true;
    return false;
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "accepted", label: "Accepted" },
    { key: "submitted", label: "Submitted" },
    { key: "completed", label: "Completed" },
    { key: "archive", label: "Archive" },
  ];

  const filtered = orders.filter((o) => {
    if (filter === "archive") return isArchived(o);
    if (filter === "new") return o.fields.Status === "Invited" && !isArchived(o);
    if (filter === "accepted") return o.fields.Status === "Accepted";
    if (filter === "submitted") return o.fields.Status === "Posted";
    if (filter === "completed") return o.fields.Status === "Completed";
    // "all" = everything except archived
    return !isArchived(o);
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
  const totalWithdrawn = withdrawals.filter((w) => ["Completed", "Pending", "Paid"].includes(w.fields.Status)).reduce((s, w) => s + (w.fields.Amount || 0), 0);
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
                      <span style={{ fontSize: 10, letterSpacing: "0.06em", color: ["Completed","Paid"].includes(item.status) ? "#2ED573" : "#FBBF24" }}>{["Completed","Paid"].includes(item.status) ? "PAID" : "PROCESSING"}</span>
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
      {/* Help & Info */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: "24px 20px", marginTop: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 18 }}>HELP & INFO</div>
        <a href="/guide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 400, color: "#FFF" }}>Creator Guide</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>How promos, payments & deadlines work</div>
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>→</div>
        </a>
        <a href="/guide#faq" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 400, color: "#FFF" }}>FAQ</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Common questions answered</div>
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>→</div>
        </a>
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
