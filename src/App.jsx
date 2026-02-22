import { useState } from "react";

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
  return airtableFetch(`Orders/${recordId}`, { method:"PATCH", body: JSON.stringify({ fields }) });
}

function generateOTP() { return Math.floor(100000 + Math.random()*900000).toString(); }

const statusConfig = {
  Invited:  { color:"#F59E0B", bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.25)",  icon:"📩", label:"New Brief" },
  Accepted: { color:"#3B82F6", bg:"rgba(59,130,246,0.12)",  border:"rgba(59,130,246,0.25)",  icon:"✅", label:"In Progress" },
  Posted:   { color:"#8B5CF6", bg:"rgba(139,92,246,0.12)",  border:"rgba(139,92,246,0.25)",  icon:"📹", label:"Submitted" },
  Paid:     { color:"#10B981", bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  icon:"💰", label:"Paid" },
  Declined: { color:"#EF4444", bg:"rgba(239,68,68,0.12)",   border:"rgba(239,68,68,0.25)",   icon:"✖",  label:"Declined" },
  Verified: { color:"#8B5CF6", bg:"rgba(139,92,246,0.12)", border:"rgba(139,92,246,0.25)", icon:"📹", label:"Submitted" },
};
const font = "'Outfit', sans-serif";

const StatusBadge = ({ status }) => {
  const c = statusConfig[status] || statusConfig.Invited;
  return <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, color:c.color, background:c.bg, border:`1px solid ${c.border}` }}>{c.icon} {c.label}</span>;
};

const Inp = (props) => <input {...props} style={{ width:"100%", padding:"12px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", marginBottom:10, fontFamily:font, ...props.style }} />;

const LoginScreen = ({ onLogin }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState("");
  const [devCode, setDevCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!email.trim()) return;
    setLoading(true); setError("");
    try {
      const c = await getCreatorByEmail(email.trim());
      if (!c) { setError("Email not found. Check with your manager."); setLoading(false); return; }
      const code = generateOTP();
      setPending(code); setDevCode(code);
      setStep("otp");
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const verify = async () => {
    if (otp.trim() !== pending) { setError("Wrong code. Try again."); return; }
    setLoading(true);
    const c = await getCreatorByEmail(email.trim());
    onLogin(c, email.trim());
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0F0F0F 0%,#1A1A2E 50%,#16213E 100%)", fontFamily:font }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ width:400, padding:48, borderRadius:24, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(20px)", textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:8 }}>🎵</div>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:700, margin:"0 0 8px" }}>10X Projects</h1>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 36px" }}>Creator Portal</p>
        {step==="email" ? <>
          <Inp type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendOtp()} />
          {error && <p style={{ color:"#EF4444", fontSize:13, margin:"0 0 12px" }}>{error}</p>}
          <button onClick={sendOtp} disabled={loading} style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"linear-gradient(135deg,#FF6B00,#FF8C00)", color:"#fff", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:font }}>{loading?"Checking...":"Send Code →"}</button>
        </> : <>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 16px" }}>Code sent to <strong style={{color:"#fff"}}>{email}</strong></p>
          {devCode && <div style={{ background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.3)", borderRadius:10, padding:"10px 16px", marginBottom:16, fontSize:13, color:"#FF6B00" }}>🔐 Dev mode — code: <strong>{devCode}</strong></div>}
          <Inp type="text" placeholder="000000" value={otp} onChange={e=>setOtp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&verify()} style={{ textAlign:"center", fontSize:24, letterSpacing:8 }} />
          {error && <p style={{ color:"#EF4444", fontSize:13, margin:"0 0 12px" }}>{error}</p>}
          <button onClick={verify} disabled={loading} style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"linear-gradient(135deg,#FF6B00,#FF8C00)", color:"#fff", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:font }}>{loading?"Verifying...":"Login →"}</button>
          <button onClick={()=>{setStep("email");setError("");}} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", fontSize:13, cursor:"pointer", marginTop:16, fontFamily:font }}>← Back</button>
        </>}
      </div>
    </div>
  );
};

const OrderCard = ({ record, onUpdate, expanded, onToggle }) => {
  const f = record.fields;
  const status = f.Status || "Invited";
  const c = statusConfig[status] || statusConfig.Invited;
  const deadline = Array.isArray(f["Deadline Lookup"]) ? f["Deadline Lookup"][0] : f["Deadline Lookup"] || "";
  const isExpired = deadline && new Date(deadline) < new Date() && !["Posted","Paid","Verified","Verified","Verified"].includes(status);
  const daysLeft = deadline ? Math.ceil((new Date(deadline)-new Date())/86400000) : null;
  const campaign = Array.isArray(f["Campaign Name Lookup"]) ? f["Campaign Name Lookup"][0] : f["Campaign Name Lookup"] || "—";
  const songName = Array.isArray(f["Song Name Lookup"]) ? f["Song Name Lookup"][0] : f["Song Name Lookup"] || "";
  const soundLink = Array.isArray(f["Sound Link Lookup"]) ? f["Sound Link Lookup"][0] : f["Sound Link Lookup"] || "";
  const soundCover = Array.isArray(f["Sound Cover Lookup"]) && f["Sound Cover Lookup"][0] ? f["Sound Cover Lookup"][0].url : "";
  const brief = Array.isArray(f["Brief Lookup"]) ? f["Brief Lookup"][0] : f["Brief Lookup"] || "";
  const assignedPosts = f["Assigned Posts"] || 1;
  const totalPrice = f["Total Price"] || 0;
  const creatorPrice = f["Creator Price"] || 0;
  const paymentStatus = f["Payment Status"] || "";
  const existingLinks = f["Video Links"] || "";
  const existingPaypal = f["PayPal/Crypto"] || "";

  const [videoLinks, setVideoLinks] = useState(existingLinks ? existingLinks.split("\n").filter(Boolean) : Array(assignedPosts).fill(""));
  const [paypal, setPaypal] = useState(existingPaypal);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const doUpdate = async (fields) => { setSubmitting(true); await updateOrder(record.id, fields); onUpdate(record.id, fields); setSubmitting(false); };

  const handleSubmit = async () => {
    const links = videoLinks.filter(l=>l.trim());
    if (links.length < assignedPosts) { setMsg(`Please enter all ${assignedPosts} video link(s).`); return; }
    if (!paypal.trim()) { setMsg("Please enter your PayPal/Crypto address."); return; }
    setMsg(""); setSubmitting(true);
    await updateOrder(record.id, { Status:"Posted", "Video Links":links.join("\n"), "PayPal/Crypto":paypal });
    onUpdate(record.id, { Status:"Posted", "Video Links":links.join("\n"), "PayPal/Crypto":paypal });
    setSubmitting(false); setMsg("✅ Submitted!");
  };

  const Box = ({label, children, style={}}) => (
    <div style={{ background:"rgba(255,255,255,0.03)", padding:"14px 16px", borderRadius:10, ...style }}>
      <div style={{ color:"rgba(255,255,255,0.35)", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</div>
      <div style={{ color:"#fff", fontSize:14, fontWeight:500, marginTop:4 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${expanded?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.06)"}`, borderRadius:16, overflow:"hidden", transition:"all 0.3s" }}>
      <div onClick={onToggle} style={{ padding:"20px 24px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, flex:1 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:c.bg, border:`1px solid ${c.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, overflow:"hidden" }}>{soundCover ? <img src={soundCover} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : c.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <h3 style={{ color:"#fff", fontSize:16, fontWeight:600, margin:0 }}>{campaign}</h3>
              <StatusBadge status={status}/>
            </div>
            <div style={{ display:"flex", gap:16, marginTop:6, flexWrap:"wrap" }}>
              {songName && <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>🎵 {songName}</span>}
              <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>📹 {assignedPosts} post{assignedPosts>1?"s":""}</span>
              <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>💵 ${totalPrice}</span>
              {!["Paid","Declined","Verified","Verified","Verified","Verified"].includes(status) && daysLeft!==null && (
                <span style={{ color:isExpired?"#EF4444":daysLeft<=3?"#F59E0B":"rgba(255,255,255,0.35)", fontSize:13, fontWeight:isExpired||daysLeft<=3?"600":"400" }}>⏰ {isExpired?"Expired":`${daysLeft}d left`}</span>
              )}
            </div>
          </div>
        </div>
        <span style={{ color:"rgba(255,255,255,0.3)", fontSize:18, transform:expanded?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s", flexShrink:0 }}>▾</span>
      </div>

      {expanded && (
        <div style={{ padding:"0 24px 24px", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:20 }}>
          {brief && <div style={{ marginBottom:20 }}>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Campaign Brief</div>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, lineHeight:1.6, margin:0, background:"rgba(255,255,255,0.03)", padding:"14px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)" }}>{brief}</p>
          </div>}

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
            {soundLink && <Box label="Sound Link"><a href={soundLink} target="_blank" rel="noreferrer" style={{ color:"#FF6B00", textDecoration:"none", wordBreak:"break-all" }}>{soundLink}</a></Box>}
            <Box label="Deadline" style={isExpired?{borderColor:"rgba(239,68,68,0.3)"}:{}}><span style={{ color:isExpired?"#EF4444":"#fff" }}>{deadline ? new Date(deadline).toLocaleDateString() : "—"}{isExpired?" ⚠️":""}</span></Box>
            <Box label="Posts Required">{assignedPosts}</Box>
            <Box label="Payment"><span style={{ color:"#10B981", fontWeight:600 }}>${totalPrice}</span></Box>
            {creatorPrice > 0 && <Box label="Per Post">${creatorPrice}</Box>}
            {paymentStatus && <Box label="Payment Status"><span style={{ color:paymentStatus==="Paid"?"#10B981":"#F59E0B" }}>{paymentStatus}</span></Box>}
          </div>

          {status==="Invited" && !isExpired && (
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={()=>doUpdate({Status:"Accepted"})} disabled={submitting} style={{ flex:1, padding:12, borderRadius:10, border:"none", background:"linear-gradient(135deg,#10B981,#059669)", color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:font }}>✅ Accept Campaign</button>
              <button onClick={()=>doUpdate({Status:"Declined"})} disabled={submitting} style={{ flex:1, padding:12, borderRadius:10, border:"1px solid rgba(239,68,68,0.3)", background:"rgba(239,68,68,0.1)", color:"#EF4444", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:font }}>✖ Decline</button>
            </div>
          )}

          {status==="Accepted" && !isExpired && (
            <div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Submit Your Videos</div>
              {Array.from({length:assignedPosts},(_,i) => (
                <Inp key={i} type="url" placeholder={`Video Link #${i+1} (TikTok URL)`} value={videoLinks[i]||""} onChange={e=>{const v=[...videoLinks];v[i]=e.target.value;setVideoLinks(v);}}/>
              ))}
              <Inp type="text" placeholder="PayPal email or Crypto address" value={paypal} onChange={e=>setPaypal(e.target.value)}/>
              {msg && <p style={{ color:msg.startsWith("✅")?"#10B981":"#EF4444", fontSize:13, margin:"0 0 10px" }}>{msg}</p>}
              <button onClick={handleSubmit} disabled={submitting} style={{ width:"100%", padding:12, borderRadius:10, border:"none", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:font }}>{submitting?"Submitting...":"📹 Submit Videos"}</button>
            </div>
          )}

          {["Posted","Paid","Verified","Verified"].includes(status) && existingLinks && (
            <div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Submitted Videos</div>
              {existingLinks.split("\n").filter(Boolean).map((link,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.03)", padding:"10px 14px", borderRadius:8, marginBottom:6 }}>
                  <a href={link} target="_blank" rel="noreferrer" style={{ color:"#818CF8", fontSize:13, textDecoration:"none" }}>📹 Video #{i+1}: {link}</a>
                </div>
              ))}
              {status==="Paid" && <div style={{ marginTop:12, padding:"12px 16px", borderRadius:10, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)" }}>
                <span style={{ color:"#10B981", fontSize:14, fontWeight:600 }}>💰 Payment of ${totalPrice} sent to {existingPaypal}</span>
              </div>}
            </div>
          )}

          {isExpired && status!=="Declined" && (
            <div style={{ padding:"12px 16px", borderRadius:10, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)" }}>
              <span style={{ color:"#EF4444", fontSize:14 }}>⚠️ This campaign deadline has passed</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
    getCreatorByEmail(saved).then(c => {
      if (c) {
        setCreator(c);
        setUserEmail(saved);
        getOrdersForCreator(saved).then(r => { setOrders(r); setLoading(false); });
      } else { localStorage.removeItem("10x_email"); setLoading(false); }
    });
  } else { setLoading(false); }
}, []);

  const handleLogin = async (creatorRecord, email) => {
    setLoading(true);
    setCreator(creatorRecord);
    setUserEmail(email);
    const records = await getOrdersForCreator(email);
    setOrders(records);
    localStorage.setItem("10x_email", email);
    setLoading(false);
  };

  const handleUpdate = (id, newFields) => setOrders(prev => prev.map(r => r.id===id ? {...r, fields:{...r.fields,...newFields}} : r));

  if (!creator) return <LoginScreen onLogin={handleLogin}/>;

  const name = creator.fields["Creator Name"] || creator.fields["Name"] || userEmail;
  const niche = creator.fields["Niche"] || "";
  const activeCount = orders.filter(o=>["Invited","Accepted"].includes(o.fields.Status)).length;
  const totalEarned = orders.filter(o=>o.fields.Status==="Paid").reduce((s,o)=>s+(o.fields["Total Price"]||0),0);
  const pendingPay = orders.filter(o=>["Posted","Verified"].includes(o.fields.Status)).reduce((s,o)=>s+(o.fields["Total Price"]||0),0);

  const filters = [
    {key:"all",label:"All",count:orders.length},
    {key:"active",label:"Active",count:orders.filter(o=>["Invited","Accepted"].includes(o.fields.Status)).length},
    {key:"completed",label:"Completed",count:orders.filter(o=>["Posted","Paid","Verified","Verified"].includes(o.fields.Status)).length},
    {key:"declined",label:"Declined",count:orders.filter(o=>o.fields.Status==="Declined").length},
  ];

  const filtered = orders.filter(o=>{
    if(filter==="active") return ["Invited","Accepted"].includes(o.fields.Status);
    if(filter==="completed") return ["Posted","Paid","Verified","Verified"].includes(o.fields.Status);
    if(filter==="declined") return o.fields.Status==="Declined";
    return true;
  });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#0F0F0F 0%,#111118 100%)", fontFamily:font, color:"#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <header style={{ padding:"20px 32px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:"rgba(15,15,15,0.9)", backdropFilter:"blur(12px)", zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:24 }}>🎵</span>
          <span style={{ fontSize:18, fontWeight:700, letterSpacing:"-0.02em" }}>10X Projects</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:14, fontWeight:500 }}>{name}</div>
            {niche && <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>{niche}</div>}
          </div>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#FF6B00,#FF8C00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700 }}>{name[0]?.toUpperCase()}</div><button onClick={() => { localStorage.removeItem("10x_email"); setCreator(null); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", fontSize:12, cursor:"pointer", fontFamily:font }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:28, fontWeight:700, margin:"0 0 4px", letterSpacing:"-0.02em" }}>Welcome back, {name.split(" ")[0]} 👋</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:15, margin:0 }}>Here's your campaign overview</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:32 }}>
          {[{label:"Active",value:activeCount,color:"#FF6B00"},{label:"Earned",value:`$${totalEarned}`,color:"#10B981"},{label:"Pending",value:`$${pendingPay}`,color:"#F59E0B"}].map(s=>(
            <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:20 }}>
              <div style={{ color:"rgba(255,255,255,0.35)", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</div>
              <div style={{ fontSize:28, fontWeight:700, marginTop:4, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {filters.map(f=>(
            <button key={f.key} onClick={()=>setFilter(f.key)} style={{ padding:"8px 16px", borderRadius:20, border:filter===f.key?"1px solid rgba(255,107,0,0.4)":"1px solid rgba(255,255,255,0.08)", background:filter===f.key?"rgba(255,107,0,0.12)":"rgba(255,255,255,0.03)", color:filter===f.key?"#FF6B00":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:font, display:"flex", alignItems:"center", gap:6 }}>
              {f.label}<span style={{ background:filter===f.key?"rgba(255,107,0,0.25)":"rgba(255,255,255,0.08)", padding:"1px 7px", borderRadius:10, fontSize:11 }}>{f.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:48, color:"rgba(255,255,255,0.3)" }}>Loading campaigns...</div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(record=>(
              <OrderCard key={record.id} record={record} onUpdate={handleUpdate} expanded={expanded===record.id} onToggle={()=>setExpanded(expanded===record.id?null:record.id)}/>
            ))}
            {filtered.length===0 && <div style={{ textAlign:"center", padding:48, color:"rgba(255,255,255,0.25)", fontSize:14 }}>No campaigns found</div>}
          </div>
        )}
      </div>
    </div>
  );
}
