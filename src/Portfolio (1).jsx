import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];
const RESUME_URL = "https://drive.google.com/file/d/1KhxbItu50wbAjbzkN8EXO1chFGriu2XF/view?usp=sharing";
const PROFILE_IMAGE = null; // Set to your image URL when ready

/* ─────────────────────────────────────────────
   UNIFIED PROFESSIONAL COLOR SYSTEM
   Primary:   #1e3a5f  (deep navy)
   Accent:    #0ea5e9  (sky blue)
   Highlight: #06b6d4  (teal/cyan)
   Surface:   #f0f4f8 / #e8edf5 / #ffffff
   Text:      #0f172a / #334155 / #64748b
───────────────────────────────────────────── */

const SKILLS = {
  Frontend:   ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React.js"],
  Backend:    ["Node.js", "Express.js", "REST API Development", "JWT Authentication"],
  Database:   ["MongoDB", "Mongoose"],
  Tools:      ["Git", "GitHub", "Postman", "VS Code"],
  Deployment: ["Netlify", "Render"],
};

// Unified monochromatic skill palette — navy shades
const SKILL_COLORS = {
  Frontend:   { pill: "#1e3a5f", pillBg: "#e8edf5", border: "#c8d5e8" },
  Backend:    { pill: "#0369a1", pillBg: "#e0f2fe", border: "#bae6fd" },
  Database:   { pill: "#0e7490", pillBg: "#ecfeff", border: "#a5f3fc" },
  Tools:      { pill: "#1d4ed8", pillBg: "#eff6ff", border: "#bfdbfe" },
  Deployment: { pill: "#4f46e5", pillBg: "#eef2ff", border: "#c7d2fe" },
};

const PROJECTS = [
  {
    title: "College Placement Management System",
    desc: "A role-based full-stack web app managing student placements and company recruitment workflows with JWT authentication for Student, TPO, and Admin roles.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    highlights: [
      "10+ RESTful APIs for job posting & interview scheduling",
      "Role-based access: Student, TPO, Admin",
      "JWT-based secure authentication",
    ],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "https://sparkling-vacherin-edc492.netlify.app/",
    accent: "#0ea5e9", tag: "Full-Stack",
  },
  {
    title: "Invoice Builder",
    desc: "A professional invoice management app with automatic total and tax calculation, dynamic forms, invoice preview and export functionality.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Dynamic invoice forms with real-time calculations",
      "Invoice preview and PDF export",
      "Tax & total auto-computation",
    ],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "#",
    accent: "#06b6d4", tag: "Web App",
  },
  {
    title: "MERN Capstone Project",
    desc: "A full-stack MERN application demonstrating end-to-end development skills — REST API design, React UI, MongoDB integration, and cloud deployment.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Full-stack MERN architecture",
      "RESTful API design & integration",
      "Deployed on Netlify & Render",
    ],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "#",
    accent: "#1d4ed8", tag: "Capstone",
  },
];

function useIntersection(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Avatar() {
  return (
    <div style={{ position:"relative", flexShrink:0 }}>
      {/* outer glow */}
      <div style={{ position:"absolute", inset:"-8px", borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#06b6d4,#1e3a5f)", opacity:0.25, filter:"blur(14px)", zIndex:0 }} />
      {/* gradient ring */}
      <div style={{ position:"absolute", inset:"-3px", borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9 0%,#06b6d4 50%,#1d4ed8 100%)", zIndex:1 }} />
      {/* inner white border + photo */}
      <div style={{
        position:"relative", zIndex:2,
        width:"clamp(155px,16vw,220px)", height:"clamp(155px,16vw,220px)",
        borderRadius:"50%", overflow:"hidden",
        border:"4px solid rgba(255,255,255,0.18)",
        background:"linear-gradient(135deg,#1e3a5f,#0f2a48)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {PROFILE_IMAGE ? (
          <img src={PROFILE_IMAGE} alt="Anand J" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        ) : (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"clamp(2.8rem,5.5vw,4rem)", lineHeight:1 }}>👨‍💻</div>
            <div style={{ fontSize:"0.55rem", color:"#7dd3fc", fontWeight:800, marginTop:"6px", letterSpacing:"0.08em" }}>ADD PHOTO</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small teal dot used in section labels */
function Dot() {
  return <span style={{ display:"inline-block", width:"6px", height:"6px", borderRadius:"50%", background:"#06b6d4", marginRight:"8px", verticalAlign:"middle" }} />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [typedText, setTypedText]         = useState("");
  const [menuOpen, setMenuOpen]           = useState(false);
  const roles    = ["MERN Stack Developer", "React.js Enthusiast", "Full-Stack Builder"];
  const roleIdx  = useRef(0);
  const charIdx  = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const cur = roles[roleIdx.current];
      if (!deleting.current) {
        setTypedText(cur.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === cur.length) { deleting.current = true; setTimeout(tick, 1800); return; }
      } else {
        setTypedText(cur.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % roles.length; }
      }
      setTimeout(tick, deleting.current ? 48 : 85);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => {
      const offsets = NAV_LINKS.map((id) => {
        const el = document.getElementById(id.toLowerCase());
        return el ? { id, top: Math.abs(el.getBoundingClientRect().top) } : { id, top: Infinity };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActiveSection(offsets[0].id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const W = { maxWidth:"1200px", margin:"0 auto", padding:"0 clamp(1.5rem,6vw,6rem)" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }

        :root {
          --font      : Calibri, 'Nunito', 'Segoe UI', Tahoma, sans-serif;
          /* Unified palette */
          --navy      : #0f172a;
          --navy-mid  : #1e3a5f;
          --navy-light: #1e40af;
          --sky       : #0ea5e9;
          --teal      : #06b6d4;
          --indigo    : #4f46e5;
          /* Text */
          --tx-dark   : #0f172a;
          --tx-mid    : #334155;
          --tx-soft   : #64748b;
          --tx-faint  : #94a3b8;
          /* Surface */
          --surf-0    : #ffffff;
          --surf-1    : #f0f5fa;
          --surf-2    : #e5edf6;
          --border    : #dce5f0;
          /* Dark surfaces (hero/nav/footer) */
          --dark-0    : #080f1a;
          --dark-1    : #0d1829;
          --dark-2    : #162236;
          --dark-bd   : rgba(14,165,233,0.15);
        }

        body { font-family: var(--font); background: var(--surf-0); color: var(--tx-dark); }

        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .avatar-float { animation: float 5s ease-in-out infinite; }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background: var(--dark-0); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(var(--sky), var(--teal)); border-radius:4px; }

        /* ══ NAV ══ */
        .nav-root {
          position:fixed; top:0; left:0; right:0; z-index:300;
          height:64px; display:flex; align-items:center; justify-content:space-between;
          padding:0 clamp(1.5rem,5vw,5rem);
          background: var(--dark-1);
          border-bottom: 1px solid var(--dark-bd);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5);
        }
        .nav-logo {
          font-size:1.45rem; font-weight:900; letter-spacing:-0.02em;
          background: linear-gradient(90deg,#fff,#7dd3fc);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .nav-logo em { font-style:normal; -webkit-text-fill-color: var(--teal); }
        .nav-ul { display:flex; gap:1.6rem; list-style:none; }
        .nli {
          cursor:pointer; font-family:var(--font); font-size:0.86rem; font-weight:600;
          letter-spacing:0.03em; padding:5px 0; border-bottom:2px solid transparent;
          color:rgba(255,255,255,0.55); transition:color .2s,border-color .2s;
        }
        .nli:hover { color:#fff; }
        .nli.on { color:#fff; border-bottom-color: var(--teal); }
        .nav-btn {
          font-family:var(--font); font-weight:700; font-size:0.84rem;
          background: linear-gradient(90deg, var(--sky), var(--teal));
          color:#fff; border:none; border-radius:7px; padding:8px 20px;
          cursor:pointer; text-decoration:none; display:inline-block;
          transition:transform .2s,box-shadow .2s;
          box-shadow: 0 2px 12px rgba(14,165,233,0.3);
        }
        .nav-btn:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(6,182,212,0.45); }
        .hbg { display:none; flex-direction:column; gap:5px; cursor:pointer; }
        .hbg span { display:block; width:21px; height:2px; background:#fff; border-radius:2px; transition:.3s; }
        .mob-menu {
          position:fixed; top:64px; left:0; right:0; z-index:299;
          background:var(--dark-1); border-bottom:1px solid var(--dark-bd);
          padding:1.2rem 2rem 1.6rem; display:flex; flex-direction:column; gap:.9rem;
          box-shadow:0 8px 32px rgba(0,0,0,0.4);
        }
        .mob-li { font-family:var(--font); font-size:1rem; font-weight:700; color:rgba(255,255,255,0.6); cursor:pointer; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
        .mob-li:hover { color:#fff; }

        /* ══ HERO ══ */
        .hero-root {
          min-height:100vh; display:flex; align-items:center;
          padding:86px clamp(1.5rem,6vw,6rem) 0;
          background: var(--dark-0);
          position:relative; overflow:hidden;
        }
        /* subtle noise texture */
        .hero-root::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          background-size:200px;
        }
        .hero-grid { display:grid; grid-template-columns:1fr auto; gap:4rem; align-items:center; width:100%; max-width:1200px; margin:0 auto; position:relative; z-index:1; padding-bottom:5rem; }

        /* ══ SECTION COMMON ══ */
        .sec-label {
          display:flex; align-items:center; gap:6px;
          font-size:0.7rem; font-weight:800; letter-spacing:0.2em;
          text-transform:uppercase; color:var(--sky); margin-bottom:0.55rem;
        }
        .sec-title {
          font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:900;
          letter-spacing:-0.03em; color:var(--tx-dark); margin-bottom:2.8rem; line-height:1.1;
        }

        /* ══ SKILLS ══ */
        .skills-root { background:var(--surf-1); padding:5.5rem 0; border-top:1px solid var(--border); }
        .skill-card {
          background:var(--surf-0); border:1px solid var(--border);
          border-radius:14px; padding:1.4rem;
          transition:transform .25s,box-shadow .25s,border-color .25s;
        }
        .skill-card:hover { transform:translateY(-5px); box-shadow:0 12px 32px rgba(14,165,233,0.1); border-color:#bcd0e8; }

        /* ══ PROJECTS ══ */
        .proj-root { background:var(--surf-0); padding:5.5rem 0; }
        .proj-card {
          background:var(--surf-0); border:1px solid var(--border);
          border-radius:18px; padding:1.8rem;
          display:flex; flex-direction:column; gap:.85rem;
          height:100%; transition:transform .3s,box-shadow .3s,border-color .3s;
        }
        .proj-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(15,23,42,0.12); border-color:#b8cfe0; }
        .gh-btn {
          display:inline-flex; align-items:center; gap:5px; font-family:var(--font);
          font-size:.78rem; font-weight:700; color:var(--tx-soft);
          text-decoration:none; border:1.5px solid var(--border);
          padding:6px 13px; border-radius:7px; transition:all .2s;
        }
        .gh-btn:hover { border-color:var(--sky); color:var(--sky); background:#f0f9ff; }

        /* ══ CERTIFICATIONS ══ */
        .cert-root { background:var(--surf-1); padding:5.5rem 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
        .cert-card {
          background:var(--surf-0); border:1px solid var(--border);
          border-left:4px solid var(--teal);
          border-radius:18px; padding:2.2rem;
          display:flex; align-items:center; gap:1.8rem;
          max-width:520px;
          box-shadow:0 4px 24px rgba(6,182,212,0.07);
          transition:transform .25s,box-shadow .25s;
        }
        .cert-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(6,182,212,0.13); }

        /* ══ CONTACT ══ */
        .contact-root { background:var(--surf-0); padding:5.5rem 0; }
        .contact-link {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px; border-radius:13px;
          background:var(--surf-1); border:1px solid var(--border);
          color:var(--tx-dark); text-decoration:none;
          font-weight:600; font-size:.9rem; margin-bottom:.85rem;
          transition:all .22s;
        }
        .contact-link:hover { border-color:var(--sky); box-shadow:0 4px 20px rgba(14,165,233,0.12); transform:translateX(5px); background:#f0f9ff; }

        /* ══ FOOTER ══ */
        .footer-root {
          background: var(--dark-0);
          border-top: 1px solid rgba(14,165,233,0.18);
          position:relative; overflow:hidden;
        }
        .footer-root::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(14,165,233,0.06) 0%, transparent 70%);
        }
        .footer-link { font-family:var(--font); font-size:0.82rem; font-weight:700; text-decoration:none; letter-spacing:0.04em; color:rgba(255,255,255,0.4); transition:color .2s; }
        .footer-link:hover { color: var(--teal); }

        /* ══ HERO BUTTONS ══ */
        .h-btn-p {
          font-family:var(--font); font-weight:700; font-size:.95rem;
          background:linear-gradient(90deg, var(--sky), var(--teal));
          color:#fff; border:none; border-radius:9px; padding:13px 30px;
          cursor:pointer; transition:transform .2s,box-shadow .2s;
          box-shadow:0 4px 20px rgba(14,165,233,0.35);
        }
        .h-btn-p:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(6,182,212,0.5); }
        .h-btn-o {
          font-family:var(--font); font-weight:700; font-size:.95rem;
          background:transparent; color:rgba(255,255,255,0.8);
          border:1.5px solid rgba(255,255,255,0.2); border-radius:9px;
          padding:12px 28px; cursor:pointer; transition:all .2s;
        }
        .h-btn-o:hover { border-color:var(--teal); color:#fff; background:rgba(6,182,212,0.08); }

        /* ══ STATS ══ */
        .stat-num {
          font-size:1.65rem; font-weight:900; letter-spacing:-0.03em;
          background:linear-gradient(90deg,#fff,#7dd3fc);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .stat-lbl { font-size:0.74rem; color:rgba(255,255,255,0.38); font-weight:600; letter-spacing:0.05em; margin-top:2px; }

        /* ══ RESPONSIVE ══ */
        @media(max-width:768px){
          .hero-grid  { grid-template-columns:1fr !important; text-align:center; padding-bottom:3rem; }
          .h-btns     { justify-content:center !important; }
          .stats-row  { justify-content:center !important; }
          .nav-ul     { display:none !important; }
          .hbg        { display:flex !important; }
          .avcol      { order:-1; margin:0 auto; }
          .footer-row { grid-template-columns:1fr !important; text-align:center; }
          .footer-links { justify-content:center !important; margin-top:1rem; }
        }
      `}</style>

      <div style={{ fontFamily:"var(--font)", minHeight:"100vh" }}>

        {/* ══════════════════ NAV ══════════════════ */}
        <nav className="nav-root">
          <div className="nav-logo">AJ<em>.</em></div>
          <ul className="nav-ul">
            {NAV_LINKS.map(l => (
              <li key={l} className={`nli${activeSection===l?" on":""}`} onClick={()=>scrollTo(l)}>{l}</li>
            ))}
          </ul>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="nav-btn">Resume ↗</a>
            <div className="hbg" onClick={()=>setMenuOpen(o=>!o)}>
              <span style={{ transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }} />
              <span style={{ opacity:menuOpen?0:1 }} />
              <span style={{ transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }} />
            </div>
          </div>
        </nav>
        {menuOpen && (
          <div className="mob-menu">
            {NAV_LINKS.map(l=><div key={l} className="mob-li" onClick={()=>scrollTo(l)}>{l}</div>)}
          </div>
        )}

        {/* ══════════════════ HERO ══════════════════ */}
        <section id="about" className="hero-root">
          {/* radial glows */}
          <div style={{ position:"absolute", top:"-100px", right:"-80px", width:"550px", height:"550px", borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-80px", left:"-60px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg,transparent 0%,var(--sky) 30%,var(--teal) 70%,transparent 100%)", opacity:0.6 }} />

          <div className="hero-grid">
            <div>
              {/* availability pill */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(14,165,233,0.1)", border:"1px solid rgba(14,165,233,0.25)", borderRadius:"100px", padding:"6px 16px", marginBottom:"1.6rem" }}>
                <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 0 3px rgba(34,197,94,0.22)" }} />
                <span style={{ fontSize:"0.72rem", fontWeight:800, color:"#7dd3fc", letterSpacing:"0.1em" }}>OPEN TO OPPORTUNITIES</span>
              </div>

              {/* name */}
              <h1 style={{
                fontSize:"clamp(3rem,6.5vw,5.5rem)", fontWeight:900, lineHeight:1.0,
                letterSpacing:"-0.04em", marginBottom:"0.85rem",
                background:"linear-gradient(125deg, #ffffff 0%, #bae6fd 40%, #67e8f9 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>Anand J</h1>

              {/* typed role */}
              <div style={{ fontSize:"clamp(1rem,2vw,1.4rem)", fontWeight:600, color:"rgba(255,255,255,0.45)", marginBottom:"1.5rem", minHeight:"2em" }}>
                <span style={{ color:"#38bdf8" }}>{typedText}</span>
                <span style={{ display:"inline-block", width:"2px", height:"1.1em", background:"#38bdf8", marginLeft:"3px", verticalAlign:"middle", animation:"blink 1s step-end infinite" }} />
              </div>

              <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"1rem", lineHeight:1.9, maxWidth:"500px", marginBottom:"2.5rem" }}>
                MERN Stack Developer passionate about building scalable full-stack applications.
                Experienced with REST APIs, JWT authentication, and modern React patterns.
              </p>

              <div className="h-btns" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="h-btn-p" onClick={()=>scrollTo("Projects")}>View Projects →</button>
                <button className="h-btn-o" onClick={()=>scrollTo("Contact")}>Get In Touch</button>
              </div>

              {/* divider */}
              <div style={{ width:"56px", height:"1px", background:"linear-gradient(90deg,var(--teal),transparent)", margin:"2.8rem 0 2.2rem" }} />

              {/* stats */}
              <div className="stats-row" style={{ display:"flex", gap:"2.8rem", flexWrap:"wrap" }}>
                {[["2+","Projects Built"],["10+","APIs Developed"],["GUVI","Certified"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="stat-num">{n}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="avatar-float avcol"><Avatar /></div>
          </div>
        </section>

        {/* ══════════════════ SKILLS ══════════════════ */}
        <section id="skills" className="skills-root">
          <div style={W}>
            <FadeIn>
              <div className="sec-label"><Dot />What I work with</div>
              <h2 className="sec-title">Technical Skills</h2>
            </FadeIn>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(205px,1fr))", gap:"1.1rem" }}>
              {Object.entries(SKILLS).map(([cat,items],i)=>{
                const c = SKILL_COLORS[cat];
                return (
                  <FadeIn key={cat} delay={i*0.07}>
                    <div className="skill-card" style={{ borderTop:`3px solid ${c.pill}` }}>
                      <div style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:c.pill, marginBottom:"0.9rem" }}>{cat}</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                        {items.map(s=>(
                          <span key={s} style={{ background:c.pillBg, border:`1px solid ${c.border}`, color:c.pill, fontSize:"0.76rem", fontWeight:700, padding:"4px 11px", borderRadius:"5px" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════ PROJECTS ══════════════════ */}
        <section id="projects" className="proj-root">
          <div style={W}>
            <FadeIn>
              <div className="sec-label"><Dot />What I've built</div>
              <h2 className="sec-title">Projects</h2>
            </FadeIn>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.6rem" }}>
              {PROJECTS.map((p,i)=>(
                <FadeIn key={p.title} delay={i*0.09}>
                  <div className="proj-card" style={{ borderTop:`3px solid ${p.accent}` }}>
                    {/* tag + icon */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ background:`${p.accent}12`, color:p.accent, border:`1px solid ${p.accent}30`, fontSize:"0.7rem", fontWeight:800, padding:"4px 12px", borderRadius:"100px", letterSpacing:"0.08em" }}>{p.tag}</span>
                      <span style={{ fontSize:"1.1rem", color:p.accent, opacity:0.3 }}>◈</span>
                    </div>
                    {/* title */}
                    <div style={{ fontSize:"1.05rem", fontWeight:800, color:"var(--tx-dark)", lineHeight:1.3 }}>{p.title}</div>
                    {/* desc */}
                    <p style={{ fontSize:"0.86rem", color:"var(--tx-soft)", lineHeight:1.78 }}>{p.desc}</p>
                    {/* highlights */}
                    <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                      {p.highlights.map(h=>(
                        <div key={h} style={{ fontSize:"0.79rem", color:"var(--tx-soft)", paddingLeft:"10px", borderLeft:`2px solid ${p.accent}40`, lineHeight:1.55 }}>{h}</div>
                      ))}
                    </div>
                    {/* stack */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                      {p.stack.map(s=>(
                        <span key={s} style={{ background:`${p.accent}0e`, border:`1px solid ${p.accent}28`, color:p.accent, fontSize:"0.71rem", fontWeight:700, padding:"3px 9px", borderRadius:"4px" }}>{s}</span>
                      ))}
                    </div>
                    {/* links */}
                    <div style={{ display:"flex", gap:".65rem", flexWrap:"wrap", marginTop:"auto", paddingTop:"0.5rem" }}>
                      <a href={p.github_fe} target="_blank" rel="noreferrer" className="gh-btn">⌥ Frontend</a>
                      <a href={p.github_be} target="_blank" rel="noreferrer" className="gh-btn">⌥ Backend</a>
                      {p.live!="#"&&(
                        <a href={p.live} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize:".78rem", fontWeight:700, color:p.accent, textDecoration:"none", border:`1.5px solid ${p.accent}35`, padding:"6px 13px", borderRadius:"7px", background:`${p.accent}08`, fontFamily:"var(--font)", transition:"all .2s" }}>↗ Live</a>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ CERTIFICATIONS ══════════════════ */}
        <section id="certifications" className="cert-root">
          <div style={W}>
            <FadeIn>
              <div className="sec-label"><Dot />Credentials</div>
              <h2 className="sec-title">Certifications</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="cert-card">
                {/* icon */}
                <div style={{ width:"66px", height:"66px", borderRadius:"14px", background:"linear-gradient(135deg,#ecfeff,#cffafe)", border:"1px solid #a5f3fc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.9rem", flexShrink:0 }}>🏆</div>
                <div>
                  <div style={{ fontSize:"1.08rem", fontWeight:800, color:"var(--tx-dark)", marginBottom:"3px" }}>MERN Stack Development</div>
                  <div style={{ fontSize:"0.88rem", fontWeight:700, color:"#0891b2" }}>GUVI — Geek Networks</div>
                  <div style={{ fontSize:"0.78rem", color:"var(--tx-faint)", marginTop:"4px" }}>2024 · Capstone Certified</div>
                  <div style={{ marginTop:"12px", display:"inline-flex", alignItems:"center", gap:"5px", background:"#f0fdf4", border:"1px solid #bbf7d0", color:"#16a34a", fontSize:"0.7rem", fontWeight:800, padding:"4px 12px", borderRadius:"100px", letterSpacing:"0.1em" }}>
                    <span style={{ fontSize:"0.8rem" }}>✓</span> VERIFIED
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════ CONTACT ══════════════════ */}
        <section id="contact" className="contact-root">
          <div style={W}>
            <FadeIn>
              <div className="sec-label"><Dot />Let's connect</div>
              <h2 className="sec-title">Get In Touch</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p style={{ color:"var(--tx-soft)", fontSize:"1rem", lineHeight:1.88, maxWidth:"540px", marginBottom:"2.4rem" }}>
                I'm actively looking for fresher MERN Stack opportunities. Feel free to reach out for positions, collaborations, or just to say hi!
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"0.9rem", maxWidth:"700px" }}>
                {[
                  { icon:"✉",  label:"Email",    sub:"anandjayakumardae@gmail.com", href:"mailto:anandjayakumardae@gmail.com", iconBg:"#e0f2fe", iconColor:"#0369a1" },
                  { icon:"💼", label:"LinkedIn",  sub:"linkedin.com/in/anand-j",      href:"https://www.linkedin.com/in/anand-j/",       iconBg:"#dbeafe",  iconColor:"#1d4ed8" },
                  { icon:"🐙", label:"GitHub",    sub:"github.com/Anand12082001",     href:"https://github.com/Anand12082001",           iconBg:"#f1f5f9",  iconColor:"#334155" },
                  { icon:"📍", label:"Location",  sub:"Salem, Tamil Nadu, India",      href:null,                                          iconBg:"#ecfeff",  iconColor:"#0e7490" },
                ].map(({icon,label,sub,href,iconBg,iconColor})=>(
                  <a key={label} href={href||undefined} target={href&&!href.startsWith("mailto")?"_blank":undefined} rel="noreferrer" className="contact-link" style={{ cursor:href?"pointer":"default" }}>
                    <span style={{ width:"42px", height:"42px", borderRadius:"10px", background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.15rem", flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight:700, color:"var(--tx-dark)", fontSize:"0.9rem" }}>{label}</div>
                      <div style={{ fontSize:"0.76rem", color:"var(--tx-faint)", marginTop:"2px" }}>{sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════ FOOTER ══════════════════ */}
        <footer className="footer-root">
          {/* top shimmer line */}
          <div style={{ height:"2px", background:"linear-gradient(90deg,transparent 0%,var(--sky) 30%,var(--teal) 70%,transparent 100%)", opacity:0.6 }} />

          <div style={{ ...W, padding:"clamp(2.5rem,5vw,3.5rem) clamp(1.5rem,6vw,6rem)", position:"relative", zIndex:1 }}>
            {/* main row */}
            <div className="footer-row" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"2rem", alignItems:"start" }}>
              {/* brand */}
              <div>
                <div style={{ fontSize:"1.5rem", fontWeight:900, background:"linear-gradient(90deg,#fff,#7dd3fc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:"0.5rem" }}>
                  AJ<span style={{ WebkitTextFillColor:"var(--teal)" }}>.</span>
                </div>
                <div style={{ fontSize:"0.84rem", color:"rgba(255,255,255,0.38)", marginBottom:"3px" }}>MERN Stack Developer</div>
                <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.22)" }}>Salem, Tamil Nadu, India</div>
              </div>
              {/* links */}
              <div className="footer-links" style={{ display:"flex", flexDirection:"column", gap:"0.7rem", alignItems:"flex-end" }}>
                {[
                  { label:"GitHub",   href:"https://github.com/Anand12082001" },
                  { label:"LinkedIn", href:"https://www.linkedin.com/in/anand-j/" },
                  { label:"Resume",   href:RESUME_URL },
                ].map(({label,href})=>(
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="footer-link">{label} ↗</a>
                ))}
              </div>
            </div>

            {/* divider + copyright */}
            <div style={{ marginTop:"2.2rem", paddingTop:"1.4rem", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
              <span style={{ fontSize:"0.76rem", color:"rgba(255,255,255,0.2)" }}>
                © {new Date().getFullYear()} Anand J · All rights reserved
              </span>
              <span style={{ fontSize:"0.76rem", color:"rgba(255,255,255,0.2)" }}>
                Built with <span style={{ color:"var(--sky)" }}>React.js</span> · Calibri
              </span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
