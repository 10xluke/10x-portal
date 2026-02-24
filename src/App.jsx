import { useState } from "react";

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiirel6deatqEFjplrNd3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4OfwxrPw58aTXb+FWu5JNL1SND5kI3kqzKBkf3sgH7zAjB41/CjfCX4W6ofEtn4pu/FGqwI/2K0htzGFZlK5YkYzgkZJ4yTgnFAHCfDnU7nWv2htG1PULSKzu7vWFnmgijKKjsSTgNkjnnn1pvx9uTZfHnxDcoqs0N5FIFYcEiOM4P5Vn+EPGMcvxp0/xb4jmEET6p9tuXVWYRgsSQAMkgcAfSnfE/xVp2o/GjUfE2j+VqOn/bYrmITREJMEVMqysM4JUggigD2bxkvww+NN3Z65N4yPh3Wvs627214FCrgkgYfAJBY8q2DXD/FnSPHHw6PhWa98QR67oFm6tpM6gGNSqj5GXrgrj+Igr0PFbHiW0+DnxCvItcg8TP4RuZI0Fzp32D5AwGMqFG3OOMgkHGcA5rnvjX458N3vg3w54H8FS3V9pOjMZGv7lSplfDABQQDj5mPQDkAcCgDC/wCEm0CXTzANR1m10lrY2raKtnFLtQzGbYk7PjiQkrIyb1Bxg9+I8S6u2uaxNemBLaMhI4YIySsMSKERATycKoGT1696y6KACiiigAooooAKWkooAKKKKACiiigAooooAKXNJRQAUuaSigAooooAKXNJRQAUUUUALmkoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z";

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

async function updateOrder(recordId, fields) {
  return airtableFetch(`Orders/${recordId}`, { method: "PATCH", body: JSON.stringify({ fields }) });
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ── TOKENS ────────────────────────────────────────────── */
const T = {
  bg: "#000000",
  card: "#FFFFFF",
  cardDark: "rgba(255,255,255,0.06)",
  text: "#000000",
  textWhite: "#FFFFFF",
  textGray: "#999999",
  border: "#EEEEEE",
  orange: "#E07C3E",
  blue: "#5B8FCA",
  purple: "#8B6FC0",
  green: "#3DA65A",
  red: "#C75050",
  yellow: "#C9963A",
};

const font = "'Inter', -apple-system, sans-serif";

const statusStyle = {
  Invited:  { color: T.orange, bg: "rgba(224,124,62,0.1)",  label: "New Promo" },
  Accepted: { color: T.blue,   bg: "rgba(91,143,202,0.1)",  label: "In Progress" },
  Posted:   { color: T.purple, bg: "rgba(139,111,192,0.1)", label: "Submitted" },
  Paid:     { color: T.green,  bg: "rgba(61,166,90,0.1)",   label: "Paid" },
  Declined: { color: T.red,    bg: "rgba(199,80,80,0.1)",   label: "Declined" },
  Verified: { color: T.purple, bg: "rgba(139,111,192,0.1)", label: "Submitted" },
};

const Badge = ({ status }) => {
  const s = statusStyle[status] || statusStyle.Invited;
  return (
    <span style={{
      display: "inline-block", padding: "4px 10px", borderRadius: 6,
      fontSize: 12, fontWeight: 500, color: s.color, background: s.bg,
      fontFamily: font,
    }}>{s.label}</span>
  );
};

const Inp = (props) => (
  <input {...props} style={{
    width: "100%", padding: "14px 16px", borderRadius: 10,
    border: `1px solid ${T.border}`, background: "#F8F8F8",
    color: T.text, fontSize: 15, fontFamily: font,
    outline: "none", boxSizing: "border-box", marginBottom: 10,
    ...props.style,
  }} />
);

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
      if (!c) { setError("Email not found. Check with your manager."); setLoading(false); return; }
      const code = generateOTP();
      setPending(code);
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code }),
      });
      if (!res.ok) throw new Error("Send failed");
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
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: T.bg, fontFamily: font,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
      <div style={{
        width: 400, padding: "44px 36px", borderRadius: 24,
        background: T.card, color: T.text,
      }}>
        <img src={LOGO_SRC} alt="10X Projects" style={{ height: 24, marginBottom: 28, display: "block", filter: "invert(1)" }} />
        <h1 style={{ fontSize: 30, fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.03em" }}>
          Creator Portal
        </h1>
        <p style={{ color: T.textGray, fontSize: 15, margin: "0 0 36px" }}>
          Sign in to your account
        </p>

        {step === "email" ? (<>
          <Inp type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
          {error && <p style={{ color: T.red, fontSize: 13, margin: "0 0 10px" }}>{error}</p>}
          <button onClick={sendOtp} disabled={loading} style={{
            width: "100%", padding: "14px 0", borderRadius: 10,
            border: "none", background: T.text, color: T.card,
            fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer",
            opacity: loading ? 0.5 : 1,
          }}>{loading ? "Checking..." : "Send Code"}</button>
        </>) : (<>
          <p style={{ color: T.textGray, fontSize: 14, margin: "0 0 14px" }}>
            Code sent to <strong style={{ color: T.text }}>{email}</strong>
          </p>
          <Inp type="text" placeholder="000000" value={otp}
            onChange={(e) => setOtp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            style={{ textAlign: "center", fontSize: 26, letterSpacing: 10 }} />
          {error && <p style={{ color: T.red, fontSize: 13, margin: "0 0 10px" }}>{error}</p>}
          <button onClick={verify} disabled={loading} style={{
            width: "100%", padding: "14px 0", borderRadius: 10,
            border: "none", background: T.text, color: T.card,
            fontSize: 15, fontWeight: 500, fontFamily: font, cursor: "pointer",
            opacity: loading ? 0.5 : 1,
          }}>{loading ? "Verifying..." : "Login"}</button>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button onClick={() => { setStep("email"); setError(""); }} style={{
              background: "none", border: "none", color: T.textGray,
              fontSize: 13, fontFamily: font, cursor: "pointer",
            }}>Back</button>
          </div>
        </>)}
      </div>
    </div>
  );
};

/* ── ORDER CARD ────────────────────────────────────────── */
const OrderCard = ({ record, onUpdate, expanded, onToggle }) => {
  const f = record.fields;
  const status = f.Status || "Invited";
  const deadline = Array.isArray(f["Deadline Lookup"]) ? f["Deadline Lookup"][0] : f["Deadline Lookup"] || "";
  const isExpired = deadline && new Date(deadline) < new Date() && !["Posted", "Paid", "Verified"].includes(status);
  const daysLeft = deadline ? Math.ceil((new Date(deadline) - new Date()) / 86400000) : null;
  const campaign = Array.isArray(f["Campaign Name Lookup"]) ? f["Campaign Name Lookup"][0] : f["Campaign Name Lookup"] || "—";
  const songName = Array.isArray(f["Song Name Lookup"]) ? f["Song Name Lookup"][0] : f["Song Name Lookup"] || "";
  const soundLink = Array.isArray(f["Sound Link Lookup"]) ? f["Sound Link Lookup"][0] : f["Sound Link Lookup"] || "";
  const soundCover = Array.isArray(f["Sound Cover Lookup"]) && f["Sound Cover Lookup"][0] ? f["Sound Cover Lookup"][0].url : "";
  const brief = Array.isArray(f["Brief Lookup"]) ? f["Brief Lookup"][0] : f["Brief Lookup"] || "";
  const assignedPosts = f["Assigned Posts"] || 1;
  const totalPrice = f["Total Price"] || 0;
  const existingLinks = f["Video Links"] || "";
  const existingPaypal = f["PayPal/Crypto"] || "";

  const [videoLinks, setVideoLinks] = useState(
    existingLinks ? existingLinks.split("\n").filter(Boolean) : Array(assignedPosts).fill("")
  );
  const [paypal, setPaypal] = useState(existingPaypal);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const doUpdate = async (fields) => {
    setSubmitting(true);
    await updateOrder(record.id, fields);
    onUpdate(record.id, fields);
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    const links = videoLinks.filter((l) => l.trim());
    if (links.length < assignedPosts) { setMsg(`Enter all ${assignedPosts} video link(s).`); return; }
    if (!paypal.trim()) { setMsg("Enter payment address."); return; }
    setMsg(""); setSubmitting(true);
    await updateOrder(record.id, { Status: "Posted", "Video Links": links.join("\n"), "PayPal/Crypto": paypal });
    onUpdate(record.id, { Status: "Posted", "Video Links": links.join("\n"), "PayPal/Crypto": paypal });
    setSubmitting(false); setMsg("Submitted");
  };

  /* Collapsed */
  if (!expanded) {
    return (
      <div onClick={onToggle} style={{
        background: T.cardDark, borderRadius: 16, padding: "18px 20px",
        cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: soundCover ? "transparent" : "rgba(255,255,255,0.06)",
          overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {soundCover
            ? <img src={soundCover} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            : <span style={{ fontSize: 13, color: T.textGray }}>♫</span>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 16, fontWeight: 500, color: T.textWhite,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{campaign}</div>
          <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <Badge status={status} />
            <span style={{ fontSize: 13, color: T.textGray }}>${totalPrice}</span>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    );
  }

  /* Expanded */
  return (
    <div style={{
      background: T.card, borderRadius: 20, color: T.text,
      overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
    }}>
      {soundCover && (
        <div style={{ width: "100%", height: 160, overflow: "hidden", position: "relative" }}>
          <img src={soundCover} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} alt="" />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 20px 16px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: "#FFF", letterSpacing: "-0.02em" }}>{campaign}</div>
            {songName && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{songName}</div>}
          </div>
          <button onClick={onToggle} style={{
            position: "absolute", top: 12, right: 12,
            width: 32, height: 32, borderRadius: 16,
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}
      {!soundCover && (
        <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>{campaign}</div>
            {songName && <div style={{ fontSize: 13, color: T.textGray, marginTop: 2 }}>{songName}</div>}
          </div>
          <button onClick={onToggle} style={{
            width: 32, height: 32, borderRadius: 16, background: "#F0F0F0",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      <div style={{ padding: "16px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <Badge status={status} />
          <span style={{ fontSize: 14, color: T.textGray }}>{assignedPosts} post{assignedPosts > 1 ? "s" : ""}</span>
          <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 500, color: T.text }}>${totalPrice}</span>
        </div>

        {brief && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 400, color: T.textGray, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Brief</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#444", padding: "14px 16px", borderRadius: 12, background: "#F6F6F6" }}>{brief}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: T.border, borderRadius: 12, overflow: "hidden", marginBottom: 18 }}>
          {[
            { label: "Deadline", value: deadline ? new Date(deadline).toLocaleDateString("en", { month: "short", day: "numeric" }) : "—", color: isExpired ? T.red : T.text },
            { label: "Per Post", value: `$${f["Creator Price"] || totalPrice}`, color: T.text },
            { label: "Timeline", value: daysLeft !== null && !["Paid","Declined","Verified"].includes(status) ? (isExpired ? "Expired" : `${daysLeft}d left`) : (statusStyle[status]?.label || "—"), color: isExpired ? T.red : (daysLeft !== null && daysLeft <= 3) ? T.yellow : T.text },
          ].map((item) => (
            <div key={item.label} style={{ background: "#FAFAFA", padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: T.textGray, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
              <div style={{ marginTop: 3, fontSize: 14, fontWeight: 500, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {soundLink && (
          <a href={soundLink} target="_blank" rel="noreferrer" style={{
            display: "block", padding: "12px 16px", borderRadius: 10,
            background: "#F6F6F6", color: T.orange, fontSize: 13,
            textDecoration: "none", marginBottom: 18, fontWeight: 500,
          }}>Open Sound Link →</a>
        )}

        {status === "Invited" && !isExpired && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => doUpdate({ Status: "Accepted" })} disabled={submitting} style={{
              flex: 1, padding: "14px 0", borderRadius: 12, border: "none",
              background: T.text, color: T.card,
              fontSize: 14, fontWeight: 500, fontFamily: font, cursor: "pointer",
              opacity: submitting ? 0.5 : 1,
            }}>Accept</button>
            <button onClick={() => doUpdate({ Status: "Declined" })} disabled={submitting} style={{
              flex: 1, padding: "14px 0", borderRadius: 12,
              border: "1.5px solid #DDD", background: "transparent",
              color: T.textGray, fontSize: 14, fontWeight: 500, fontFamily: font, cursor: "pointer",
              opacity: submitting ? 0.5 : 1,
            }}>Decline</button>
          </div>
        )}

        {status === "Accepted" && !isExpired && (<div>
          <div style={{ fontSize: 12, fontWeight: 400, color: T.textGray, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Submit Videos</div>
          {Array.from({ length: assignedPosts }, (_, i) => (
            <Inp key={i} type="url" placeholder={`Video Link #${i + 1}`}
              value={videoLinks[i] || ""}
              onChange={(e) => { const v = [...videoLinks]; v[i] = e.target.value; setVideoLinks(v); }} />
          ))}
          <Inp type="text" placeholder="PayPal email address" value={paypal} onChange={(e) => setPaypal(e.target.value)} />
          {msg && <p style={{ color: msg === "Submitted" ? T.green : T.red, fontSize: 13, margin: "0 0 10px" }}>{msg}</p>}
          <button onClick={handleSubmit} disabled={submitting} style={{
            width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
            background: T.purple, color: "#FFF",
            fontSize: 14, fontWeight: 500, fontFamily: font, cursor: "pointer",
            opacity: submitting ? 0.5 : 1,
          }}>{submitting ? "Submitting..." : "Submit"}</button>
        </div>)}

        {["Posted","Paid","Verified"].includes(status) && existingLinks && (<div>
          <div style={{ fontSize: 12, fontWeight: 400, color: T.textGray, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Videos</div>
          {existingLinks.split("\n").filter(Boolean).map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noreferrer" style={{
              display: "block", padding: "11px 14px", borderRadius: 10,
              background: "#F6F6F6", marginBottom: 6,
              color: T.purple, fontSize: 13, textDecoration: "none",
            }}>Video #{i + 1}</a>
          ))}
          {status === "Paid" && (
            <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: 12, background: "rgba(61,166,90,0.08)" }}>
              <span style={{ color: T.green, fontSize: 14, fontWeight: 500 }}>${totalPrice} paid to {existingPaypal}</span>
            </div>
          )}
        </div>)}

        {isExpired && status !== "Declined" && (
          <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(199,80,80,0.08)" }}>
            <span style={{ color: T.red, fontSize: 13 }}>Deadline has passed</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── MAIN APP ──────────────────────────────────────────── */
export default function App() {
  const [creator, setCreator] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");

  useState(() => {
    const saved = localStorage.getItem("10x_email");
    if (saved) {
      getCreatorByEmail(saved).then((c) => {
        if (c) {
          setCreator(c); setUserEmail(saved);
          getOrdersForCreator(saved).then((r) => { setOrders(r); setLoading(false); });
        } else { localStorage.removeItem("10x_email"); setLoading(false); }
      });
    } else { setLoading(false); }
  }, []);

  const handleLogin = async (creatorRecord, email) => {
    setLoading(true); setCreator(creatorRecord); setUserEmail(email);
    const records = await getOrdersForCreator(email);
    setOrders(records); localStorage.setItem("10x_email", email); setLoading(false);
  };

  const handleUpdate = (id, newFields) =>
    setOrders((prev) => prev.map((r) => (r.id === id ? { ...r, fields: { ...r.fields, ...newFields } } : r)));

  if (!creator) return <LoginScreen onLogin={handleLogin} />;

  const name = creator.fields["Creator Name"] || creator.fields["Name"] || userEmail;
  const activeCount = orders.filter((o) => ["Invited", "Accepted"].includes(o.fields.Status)).length;
  const totalEarned = orders.filter((o) => o.fields.Status === "Paid").reduce((s, o) => s + (o.fields["Total Price"] || 0), 0);
  const pendingPay = orders.filter((o) => ["Posted", "Verified"].includes(o.fields.Status)).reduce((s, o) => s + (o.fields["Total Price"] || 0), 0);

  const filters = [
    { key: "all", label: "All", count: orders.length },
    { key: "active", label: "Active", count: orders.filter((o) => ["Invited", "Accepted"].includes(o.fields.Status)).length },
    { key: "completed", label: "Done", count: orders.filter((o) => ["Posted", "Paid", "Verified"].includes(o.fields.Status)).length },
    { key: "declined", label: "Declined", count: orders.filter((o) => o.fields.Status === "Declined").length },
  ];

  const statusPriority = { Invited: 0, Accepted: 1, Posted: 2, Verified: 2, Paid: 3, Declined: 4 };

  const filtered = orders.filter((o) => {
    if (filter === "active") return ["Invited", "Accepted"].includes(o.fields.Status);
    if (filter === "completed") return ["Posted", "Paid", "Verified"].includes(o.fields.Status);
    if (filter === "declined") return o.fields.Status === "Declined";
    return true;
  }).sort((a, b) => {
    const pa = statusPriority[a.fields.Status] ?? 9;
    const pb = statusPriority[b.fields.Status] ?? 9;
    if (pa !== pb) return pa - pb;
    const da = a.fields["Deadline Lookup"]?.[0] || a.fields["Deadline Lookup"] || "";
    const db = b.fields["Deadline Lookup"]?.[0] || b.fields["Deadline Lookup"] || "";
    return new Date(da) - new Date(db);
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: font, color: T.textWhite }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap" rel="stylesheet" />

      <header style={{
        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      }}>
        <img src={LOGO_SRC} alt="10X Projects" style={{ height: 18 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
          <button onClick={() => { localStorage.removeItem("10x_email"); setCreator(null); }} style={{
            background: "rgba(255,255,255,0.08)", border: "none",
            borderRadius: 8, padding: "6px 12px",
            color: T.textGray, fontSize: 12, fontFamily: font, cursor: "pointer",
          }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "28px 16px" }}>
        <div style={{ marginBottom: 8 }}>
          <p style={{ color: T.textGray, fontSize: 14, margin: "0 0 4px" }}>Welcome back,</p>
          <h1 style={{ fontSize: 30, fontWeight: 500, margin: 0, letterSpacing: "-0.03em" }}>{name.split(" ")[0]}.</h1>
        </div>

        <div style={{
          background: T.card, borderRadius: 20, padding: "24px 22px",
          color: T.text, margin: "20px 0 28px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: T.textGray }}>Total Earned</div>
              <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.03em", marginTop: 2, color: T.text }}>${totalEarned}</div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: `linear-gradient(135deg, ${T.orange}, ${T.yellow})`,
            }} />
          </div>
          <div style={{ display: "flex", gap: 0, background: "#F2F2F2", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: T.textGray, fontWeight: 400 }}>Active</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: T.orange, marginTop: 2 }}>{activeCount}</div>
            </div>
            <div style={{ width: 1, background: "#E4E4E4" }} />
            <div style={{ flex: 1, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: T.textGray, fontWeight: 400 }}>Pending</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: T.yellow, marginTop: 2 }}>${pendingPay}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "7px 14px", borderRadius: 8, border: "none",
              background: filter === f.key ? "rgba(255,255,255,0.12)" : "transparent",
              color: filter === f.key ? T.textWhite : T.textGray,
              fontSize: 13, fontWeight: 500, fontFamily: font, cursor: "pointer",
            }}>
              {f.label} <span style={{ fontWeight: 300, opacity: 0.6 }}>{f.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 48, color: T.textGray, fontSize: 14 }}>Loading campaigns...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((record) => (
              <OrderCard key={record.id} record={record} onUpdate={handleUpdate}
                expanded={expanded === record.id}
                onToggle={() => setExpanded(expanded === record.id ? null : record.id)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 48, color: T.textGray, fontSize: 14 }}>No campaigns found</div>
            )}
          </div>
        )}

        <div style={{
          textAlign: "center", padding: "40px 0 20px",
          color: "rgba(255,255,255,0.3)", fontSize: 13,
        }}>
          Need help? DM us on{" "}
          <a href="https://instagram.com/10xprojects" target="_blank" rel="noreferrer"
            style={{ color: T.orange, textDecoration: "none" }}>Instagram</a>
          {" "}or email{" "}
          <a href="mailto:support@10xprojects.co"
            style={{ color: T.orange, textDecoration: "none" }}>support@10xprojects.co</a>
        </div>
      </div>
    </div>
  );
}
