import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];
const RESUME_URL = "https://drive.google.com/file/d/1KhxbItu50wbAjbzkN8EXO1chFGriu2XF/view?usp=sharing";
const PROFILE_IMAGE = "/Anand.png";

// ── EmailJS Config ─────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_u1txvzs";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_3tiac9e";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "0EuleLIVzHzhHTvyq";
// ───────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "React.js",            icon: "⚛",  cat: "Frontend"  },
  { name: "JavaScript ES6+",     icon: "𝐉𝐒", cat: "Frontend"  },
  { name: "HTML5 / CSS3",        icon: "🌐", cat: "Frontend"  },
  { name: "Tailwind CSS",        icon: "🎨", cat: "Frontend"  },
  { name: "React Hooks",         icon: "🪝", cat: "Frontend"  },
  { name: "React Router v6",     icon: "🔀", cat: "Frontend"  },
  { name: "Node.js",             icon: "🟢", cat: "Backend"   },
  { name: "Express.js",          icon: "🚂", cat: "Backend"   },
  { name: "REST API",            icon: "🔌", cat: "Backend"   },
  { name: "JWT Auth",            icon: "🔐", cat: "Backend"   },
  { name: "MongoDB",             icon: "🍃", cat: "Database"  },
  { name: "Mongoose ODM",        icon: "📦", cat: "Database"  },
  { name: "Git / GitHub",        icon: "🐙", cat: "Tools"     },
  { name: "Postman",             icon: "📮", cat: "Tools"     },
  { name: "Axios",               icon: "📡", cat: "Tools"     },
  { name: "Netlify / Render",    icon: "🚀", cat: "Deploy"    },
];

const PROJECTS = [
  {
    num: "01",
    title: "College Placement Management System",
    desc: "A production-grade, role-based full-stack web app that digitizes student placements and company recruitment workflows with JWT authentication for Student, TPO, and Admin roles.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Axios"],
    highlights: [
      "10+ RESTful APIs for job posting & interview scheduling",
      "Role-based access: Student, TPO, Admin",
      "JWT auth + Axios centralized error handling",
      "CI/CD pipeline — Netlify & Render",
    ],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "https://sparkling-vacherin-edc492.netlify.app/",
    tag: "Full-Stack · MERN",
    color: "#38bdf8",
  },
  {
    num: "02",
    title: "Invoice Builder",
    desc: "A full-stack invoice management app to create, edit, preview, and export professional invoices with real-time total and tax calculation and dynamic React form components.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    highlights: [
      "Dynamic forms with real-time quantity, rate & tax",
      "Invoice preview and PDF export",
      "Full CRUD via Express REST API",
      "MongoDB + Mongoose data persistence",
    ],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "https://velvety-lily-fbab4f.netlify.app/",
    tag: "Full-Stack · MERN",
    color: "#34d399",
  },
  {
    num: "03",
    title: "Movie Review App",
    desc: "A responsive React app to search, explore and review movies powered by the OMDB public API. Real-time search with debounced input, movie detail cards and clean Tailwind UI.",
    stack: ["React.js", "Tailwind CSS", "React Hooks", "OMDB API"],
    highlights: [
      "Real-time search via OMDB API with debounce",
      "Poster, rating, genre, plot & year cards",
      "useState & useEffect state management",
      "Fully responsive Tailwind CSS UI",
    ],
    github_fe: "https://github.com/Anand12082001/Project_2_movieReview.git",
    github_be: null,
    live: "https://gleaming-tapioca-a677cc.netlify.app/",
    tag: "Frontend · React",
    color: "#a78bfa",
  },
];

const CERTS = [
  { title: "MERN Stack Development", issuer: "GUVI — Geek Networks", sub: "Full-Stack Web Development Certification", date: "Dec 2024", color: "#38bdf8" },
  { title: "Version Control — Git & GitHub", issuer: "GUVI — Geek Networks", sub: "Branching, pull requests & collaborative workflows", date: "2024", color: "#34d399" },
];

/* ── Helpers ── */
function useVisible(threshold = 0.12) {
  const ref = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 30 }) {
  const [ref, v] = useVisible();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`, transition: `opacity .75s cubic-bezier(.4,0,.2,1) ${delay}s, transform .75s cubic-bezier(.4,0,.2,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── GitHub SVG icon ── */
const GH = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function App() {
  const [active, setActive]   = useState("About");
  const [typed, setTyped]     = useState("");
  const [menu, setMenu]       = useState(false);
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [err, setErr]         = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("All");

  const roles   = ["MERN Stack Developer", "Full Stack Developer", "React.js Engineer"];
  const rIdx    = useRef(0);
  const cIdx    = useRef(0);
  const del     = useRef(false);

  /* typing */
  useEffect(() => {
    const tick = () => {
      const cur = roles[rIdx.current];
      if (!del.current) {
        setTyped(cur.slice(0, cIdx.current + 1));
        cIdx.current++;
        if (cIdx.current === cur.length) { del.current = true; setTimeout(tick, 1800); return; }
      } else {
        setTyped(cur.slice(0, cIdx.current - 1));
        cIdx.current--;
        if (cIdx.current === 0) { del.current = false; rIdx.current = (rIdx.current + 1) % roles.length; }
      }
      setTimeout(tick, del.current ? 45 : 80);
    };
    const t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, []);

  /* scrollspy */
  useEffect(() => {
    const h = () => {
      const hits = NAV_LINKS.map(id => {
        const el = document.getElementById(id.toLowerCase());
        return el ? { id, top: Math.abs(el.getBoundingClientRect().top) } : { id, top: Infinity };
      }).sort((a, b) => a.top - b.top);
      setActive(hits[0].id);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" }); setMenu(false); };

  /* form */
  const fc = e => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setErr(""); };
  const fs = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setErr("Please fill in all required fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr("Enter a valid email address."); return; }
    setLoading(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: form.name, from_email: form.email, subject: form.subject || `Message from ${form.name}`, message: form.message }, EMAILJS_PUBLIC_KEY);
      setSent(true);
      setForm({ name:"", email:"", subject:"", message:"" });
      setTimeout(() => setSent(false), 6000);
    } catch { setErr("Send failed. Email me directly: anandjayakumardae@gmail.com"); }
    finally { setLoading(false); }
  };

  const skillCats = ["All", ...new Set(SKILLS.map(s => s.cat))];
  const filteredSkills = activeSkillCat === "All" ? SKILLS : SKILLS.filter(s => s.cat === activeSkillCat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }

        :root {
          --font   : Calibri, 'Inter', 'Segoe UI', sans-serif;
          --bg     : #0a0a0f;
          --bg2    : #0f0f1a;
          --bg3    : #13131f;
          --card   : #111120;
          --border : rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --sky    : #38bdf8;
          --teal   : #34d399;
          --purple : #a78bfa;
          --text   : #f1f5f9;
          --muted  : #94a3b8;
          --faint  : #475569;
        }

        body { font-family:var(--font); background:var(--bg); color:var(--text); overflow-x:hidden; }

        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow-p  { 0%,100%{opacity:.4} 50%{opacity:.7} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slide-r { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        .avatar-float { animation:float 6s ease-in-out infinite; }

        /* scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:linear-gradient(var(--sky),var(--purple)); border-radius:4px; }

        /* ── NAV ── */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:500;
          height:68px; display:flex; align-items:center; justify-content:space-between;
          padding:0 clamp(1.5rem,5vw,5rem);
          background:rgba(10,10,15,0.85);
          backdrop-filter:blur(20px);
          border-bottom:1px solid var(--border);
        }
        .nav-logo {
          font-size:1.5rem; font-weight:900; letter-spacing:-.03em;
          background:linear-gradient(90deg,#fff 0%,var(--sky) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .nav-ul { display:flex; gap:2rem; list-style:none; }
        .nav-li {
          cursor:pointer; font-size:.85rem; font-weight:500; letter-spacing:.04em;
          color:var(--muted); padding:4px 0; border-bottom:2px solid transparent;
          transition:color .2s,border-color .2s; font-family:var(--font);
        }
        .nav-li:hover { color:var(--text); }
        .nav-li.on { color:#fff; border-bottom-color:var(--sky); }
        .nav-cta {
          font-family:var(--font); font-size:.83rem; font-weight:700;
          color:var(--bg); background:var(--sky);
          border:none; border-radius:8px; padding:9px 22px;
          cursor:pointer; text-decoration:none; display:inline-block;
          transition:transform .2s,box-shadow .2s;
          box-shadow:0 0 20px rgba(56,189,248,.3);
        }
        .nav-cta:hover { transform:translateY(-2px); box-shadow:0 0 32px rgba(56,189,248,.5); }
        .hbg { display:none; flex-direction:column; gap:5px; cursor:pointer; }
        .hbg span { display:block; width:22px; height:2px; background:#fff; border-radius:2px; transition:.3s; }
        .mob-menu {
          position:fixed; top:68px; left:0; right:0; z-index:499;
          background:rgba(10,10,15,.97); backdrop-filter:blur(20px);
          border-bottom:1px solid var(--border);
          padding:1.5rem 2rem 2rem;
          display:flex; flex-direction:column; gap:1rem;
        }
        .mob-li { font-family:var(--font); font-size:1.1rem; font-weight:600; color:var(--muted); cursor:pointer; padding:8px 0; border-bottom:1px solid var(--border); }
        .mob-li:hover { color:#fff; }

        /* ── HERO ── */
        .hero {
          min-height:100vh; position:relative; overflow:hidden;
          display:flex; align-items:center;
          padding:90px clamp(1.5rem,6vw,6rem) 0;
          background:var(--bg);
        }
        /* big radial glow behind name */
        .hero::before {
          content:''; position:absolute;
          top:50%; left:30%; transform:translate(-50%,-50%);
          width:900px; height:900px; border-radius:50%;
          background:radial-gradient(circle, rgba(56,189,248,.07) 0%, transparent 65%);
          pointer-events:none;
        }
        .hero::after {
          content:''; position:absolute;
          top:60%; right:10%; width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle, rgba(167,139,250,.05) 0%, transparent 65%);
          pointer-events:none;
        }
        .hero-inner { display:grid; grid-template-columns:1fr auto; gap:5rem; align-items:center; width:100%; max-width:1200px; margin:0 auto; position:relative; z-index:1; padding-bottom:6rem; }
        .hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(56,189,248,.08); border:1px solid rgba(56,189,248,.2); border-radius:100px; padding:6px 18px; margin-bottom:1.8rem; }
        .hero-dot { width:7px; height:7px; border-radius:50%; background:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.25); }
        .hero-tag-txt { font-size:.72rem; font-weight:700; color:var(--sky); letter-spacing:.12em; text-transform:uppercase; }
        .hero-name {
          font-size:clamp(3.5rem,7vw,6rem); font-weight:900; line-height:.95;
          letter-spacing:-.05em; margin-bottom:1rem;
          background:linear-gradient(120deg,#fff 0%,#e0f2fe 45%,var(--sky) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .hero-role { font-size:clamp(1rem,2vw,1.35rem); font-weight:500; color:var(--muted); margin-bottom:1.6rem; min-height:2em; }
        .hero-role span { color:var(--sky); }
        .hero-cursor { display:inline-block; width:2px; height:1.1em; background:var(--sky); margin-left:3px; vertical-align:middle; animation:blink 1s step-end infinite; }
        .hero-desc { font-size:1rem; line-height:1.9; color:var(--faint); max-width:490px; margin-bottom:2.8rem; }
        .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; }
        .btn-solid { font-family:var(--font); font-size:.95rem; font-weight:700; background:var(--sky); color:#000; border:none; border-radius:10px; padding:13px 30px; cursor:pointer; transition:transform .2s,box-shadow .2s; box-shadow:0 0 24px rgba(56,189,248,.3); }
        .btn-solid:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(56,189,248,.5); }
        .btn-ghost { font-family:var(--font); font-size:.95rem; font-weight:600; background:transparent; color:var(--text); border:1.5px solid var(--border2); border-radius:10px; padding:12px 28px; cursor:pointer; transition:all .2s; }
        .btn-ghost:hover { border-color:var(--sky); color:var(--sky); }
        .hero-divider { width:48px; height:1px; background:linear-gradient(90deg,var(--sky),transparent); margin:2.8rem 0 2.2rem; }
        .stats { display:flex; gap:3rem; flex-wrap:wrap; }
        .stat-n { font-size:1.8rem; font-weight:900; color:#fff; letter-spacing:-.03em; }
        .stat-l { font-size:.73rem; color:var(--faint); font-weight:600; letter-spacing:.06em; margin-top:2px; }

        /* ── AVATAR ── */
        .avatar-wrap { position:relative; flex-shrink:0; }
        .av-glow { position:absolute; inset:-12px; border-radius:50%; background:linear-gradient(135deg,var(--sky),var(--purple)); opacity:.2; filter:blur(20px); z-index:0; animation:glow-p 4s ease-in-out infinite; }
        .av-ring { position:absolute; inset:-3px; border-radius:50%; background:linear-gradient(135deg,var(--sky) 0%,var(--teal) 50%,var(--purple) 100%); z-index:1; }
        .av-img {
          position:relative; z-index:2;
          width:clamp(160px,17vw,230px); height:clamp(160px,17vw,230px);
          border-radius:50%; overflow:hidden;
          border:4px solid rgba(0,0,0,.5);
          background:linear-gradient(135deg,#1a1a2e,#16213e);
          display:flex; align-items:center; justify-content:center;
        }
        .av-img img { width:100%; height:100%; object-fit:cover; }
        .av-placeholder { font-size:clamp(3rem,6vw,4.2rem); }

        /* ── SECTION COMMON ── */
        .sec { padding:6rem 0; }
        .sec-inner { max-width:1200px; margin:0 auto; padding:0 clamp(1.5rem,6vw,6rem); }
        .sec-eyebrow { font-size:.7rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--sky); margin-bottom:.5rem; display:flex; align-items:center; gap:8px; }
        .sec-eyebrow::before { content:''; display:block; width:20px; height:1px; background:var(--sky); }
        .sec-h2 { font-size:clamp(2rem,4vw,3rem); font-weight:900; letter-spacing:-.04em; color:#fff; margin-bottom:3rem; line-height:1; }

        /* ── SKILLS ── */
        .skills-bg { background:var(--bg2); }
        .skill-filter { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:2rem; }
        .sf-btn { font-family:var(--font); font-size:.75rem; font-weight:700; padding:6px 16px; border-radius:100px; border:1px solid var(--border2); background:transparent; color:var(--muted); cursor:pointer; transition:all .2s; }
        .sf-btn:hover { border-color:var(--sky); color:var(--sky); }
        .sf-btn.active { background:var(--sky); color:#000; border-color:var(--sky); }
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:.85rem; }
        .skill-pill {
          display:flex; align-items:center; gap:10px;
          background:var(--card); border:1px solid var(--border);
          border-radius:12px; padding:14px 16px;
          transition:transform .25s,border-color .25s,box-shadow .25s;
          cursor:default;
        }
        .skill-pill:hover { transform:translateY(-4px); border-color:rgba(56,189,248,.3); box-shadow:0 8px 24px rgba(56,189,248,.08); }
        .skill-icon { font-size:1.2rem; flex-shrink:0; }
        .skill-name { font-size:.82rem; font-weight:600; color:var(--text); }
        .skill-cat-badge { font-size:.6rem; font-weight:700; color:var(--sky); text-transform:uppercase; letter-spacing:.08em; margin-top:2px; }

        /* ── PROJECTS ── */
        .proj-bg { background:var(--bg); }
        .proj-grid { display:flex; flex-direction:column; gap:2.5rem; }
        .proj-card {
          display:grid; grid-template-columns:auto 1fr;
          gap:2.5rem; align-items:start;
          background:var(--card); border:1px solid var(--border);
          border-radius:20px; padding:2.5rem;
          transition:border-color .3s,box-shadow .3s,transform .3s;
          position:relative; overflow:hidden;
        }
        .proj-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--color,var(--sky)),transparent); }
        .proj-card:hover { border-color:rgba(56,189,248,.2); box-shadow:0 20px 60px rgba(0,0,0,.4); transform:translateY(-4px); }
        .proj-num { font-size:4rem; font-weight:900; line-height:1; letter-spacing:-.05em; color:var(--border2); font-family:var(--font); min-width:80px; }
        .proj-body { display:flex; flex-direction:column; gap:.9rem; }
        .proj-tag { display:inline-flex; font-size:.68rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; padding:4px 12px; border-radius:100px; }
        .proj-title { font-size:1.3rem; font-weight:800; color:#fff; line-height:1.2; }
        .proj-desc { font-size:.88rem; color:var(--muted); line-height:1.8; max-width:640px; }
        .proj-bullets { display:flex; flex-direction:column; gap:4px; }
        .proj-bullet { font-size:.8rem; color:var(--faint); padding-left:12px; border-left:1px solid var(--border2); line-height:1.55; }
        .proj-stack { display:flex; flex-wrap:wrap; gap:6px; }
        .proj-tech { font-size:.7rem; font-weight:700; padding:3px 10px; border-radius:5px; border:1px solid; }
        .proj-links { display:flex; gap:.65rem; flex-wrap:wrap; padding-top:.5rem; border-top:1px solid var(--border); }
        .p-link { display:inline-flex; align-items:center; gap:5px; font-family:var(--font); font-size:.78rem; font-weight:700; text-decoration:none; padding:7px 14px; border-radius:8px; border:1px solid var(--border2); color:var(--muted); transition:all .2s; }
        .p-link:hover { border-color:var(--sky); color:var(--sky); }
        .p-link-live { color:#000 !important; border-color:transparent !important; }

        /* ── CERTIFICATIONS ── */
        .cert-bg { background:var(--bg2); }
        .cert-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:1.5rem; }
        .cert-card {
          background:var(--card); border:1px solid var(--border);
          border-radius:18px; padding:2rem;
          transition:transform .25s,box-shadow .25s,border-color .25s;
          position:relative; overflow:hidden;
        }
        .cert-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; border-radius:0 0 18px 18px; }
        .cert-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(0,0,0,.4); border-color:var(--border2); }
        .cert-icon-wrap { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin-bottom:1.2rem; }
        .cert-title { font-size:1rem; font-weight:800; color:#fff; margin-bottom:4px; }
        .cert-issuer { font-size:.83rem; font-weight:600; margin-bottom:3px; }
        .cert-sub { font-size:.78rem; color:var(--faint); margin-bottom:8px; }
        .cert-date { font-size:.74rem; color:var(--faint); }
        .cert-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(34,197,94,.1); border:1px solid rgba(34,197,94,.25); color:#4ade80; font-size:.67rem; font-weight:800; padding:3px 11px; border-radius:100px; letter-spacing:.1em; margin-top:10px; }

        /* ── CONTACT ── */
        .contact-bg { background:var(--bg); }
        .contact-grid { display:grid; grid-template-columns:1fr 1.3fr; gap:4rem; align-items:start; }
        .c-heading { font-size:1.6rem; font-weight:800; color:#fff; margin-bottom:1rem; line-height:1.2; }
        .c-desc { font-size:.95rem; color:var(--muted); line-height:1.9; margin-bottom:2rem; }
        .soc-item { display:flex; align-items:center; gap:14px; padding:14px 18px; border-radius:14px; background:var(--card); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:600; font-size:.88rem; margin-bottom:.8rem; transition:all .22s; }
        .soc-item:hover { border-color:rgba(56,189,248,.35); background:rgba(56,189,248,.05); transform:translateX(5px); }
        .soc-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
        .soc-label { font-weight:700; color:#fff; font-size:.88rem; }
        .soc-sub { font-size:.74rem; color:var(--faint); margin-top:1px; }

        /* form */
        .form-box { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:2.5rem; }
        .form-title { font-size:1.15rem; font-weight:800; color:#fff; margin-bottom:1.5rem; }
        .form-row2 { display:grid; grid-template-columns:1fr 1fr; gap:.85rem; }
        .form-group { display:flex; flex-direction:column; gap:5px; margin-bottom:.85rem; }
        .form-label { font-size:.72rem; font-weight:700; color:var(--muted); letter-spacing:.06em; text-transform:uppercase; }
        .form-inp {
          font-family:var(--font); font-size:.9rem;
          background:rgba(255,255,255,.04); border:1.5px solid var(--border);
          border-radius:10px; padding:12px 15px; color:var(--text);
          outline:none; transition:border-color .2s,box-shadow .2s; width:100%;
        }
        .form-inp:focus { border-color:var(--sky); box-shadow:0 0 0 3px rgba(56,189,248,.1); }
        .form-inp::placeholder { color:var(--faint); }
        .form-submit { width:100%; font-family:var(--font); font-size:.95rem; font-weight:700; background:var(--sky); color:#000; border:none; border-radius:10px; padding:14px; cursor:pointer; transition:transform .2s,box-shadow .2s,opacity .2s; margin-top:.4rem; box-shadow:0 0 20px rgba(56,189,248,.25); }
        .form-submit:hover { transform:translateY(-2px); box-shadow:0 0 36px rgba(56,189,248,.4); }
        .form-submit:disabled { opacity:.65; cursor:not-allowed; transform:none; }
        .alert-ok { background:rgba(34,197,94,.1); border:1px solid rgba(34,197,94,.3); color:#4ade80; border-radius:10px; padding:12px 16px; font-size:.87rem; font-weight:700; margin-bottom:1rem; }
        .alert-err { background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.3); color:#f87171; border-radius:10px; padding:12px 16px; font-size:.87rem; font-weight:700; margin-bottom:1rem; }

        /* ── FOOTER ── */
        .footer { background:var(--bg); border-top:1px solid var(--border); padding:3rem clamp(1.5rem,6vw,6rem); }
        .footer-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; }
        .footer-logo { font-size:1.3rem; font-weight:900; background:linear-gradient(90deg,#fff,var(--sky)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .footer-links { display:flex; gap:1.8rem; }
        .footer-link { font-family:var(--font); font-size:.82rem; font-weight:600; color:var(--faint); text-decoration:none; transition:color .2s; }
        .footer-link:hover { color:var(--sky); }
        .footer-copy { font-size:.78rem; color:var(--faint); }

        /* ── RESPONSIVE ── */
        @media(max-width:900px) { .proj-card { grid-template-columns:1fr !important; } .proj-num { font-size:2.5rem; } .contact-grid { grid-template-columns:1fr !important; } .form-row2 { grid-template-columns:1fr !important; } }
        @media(max-width:768px) { .hero-inner { grid-template-columns:1fr !important; text-align:center; padding-bottom:3rem; } .hero-btns { justify-content:center; } .stats { justify-content:center; } .hero-divider { margin:2rem auto; } .nav-ul { display:none !important; } .hbg { display:flex !important; } .avcol { order:-1; margin:0 auto; } .footer-inner { flex-direction:column; text-align:center; } .footer-links { justify-content:center; } }
      `}</style>

      <div style={{ fontFamily:"var(--font)" }}>

        {/* ══ NAV ══ */}
        <nav className="nav">
          <div className="nav-logo">AJ.</div>
          <ul className="nav-ul">
            {NAV_LINKS.map(l => <li key={l} className={`nav-li${active===l?" on":""}`} onClick={()=>go(l)}>{l}</li>)}
          </ul>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="nav-cta">Resume ↗</a>
            <div className="hbg" onClick={()=>setMenu(o=>!o)}>
              <span style={{ transform:menu?"rotate(45deg) translate(5px,5px)":"none" }} />
              <span style={{ opacity:menu?0:1 }} />
              <span style={{ transform:menu?"rotate(-45deg) translate(5px,-5px)":"none" }} />
            </div>
          </div>
        </nav>
        {menu && (
          <div className="mob-menu">
            {NAV_LINKS.map(l => <div key={l} className="mob-li" onClick={()=>go(l)}>{l}</div>)}
          </div>
        )}

        {/* ══ HERO ══ */}
        <section id="about" className="hero">
          {/* decorative grid lines */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(56,189,248,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.025) 1px,transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }} />
          {/* top glow bar */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,var(--sky) 40%,var(--purple) 70%,transparent)", opacity:.5 }} />

          <div className="hero-inner">
            <div>
              <div className="hero-tag">
                <span className="hero-dot" />
                <span className="hero-tag-txt">Open to Opportunities</span>
              </div>

              <h1 className="hero-name">Anand J</h1>

              <div className="hero-role">
                <span>{typed}</span>
                <span className="hero-cursor" />
              </div>

              <p className="hero-desc">
                Motivated MERN Stack Developer with hands-on experience building scalable full-stack
                web applications. Strong in component-based architecture, REST API design, and MongoDB
                database modeling.
              </p>

              <div className="hero-btns">
                <button className="btn-solid" onClick={()=>go("Projects")}>View Projects →</button>
                <button className="btn-ghost" onClick={()=>go("Contact")}>Get In Touch</button>
              </div>

              <div className="hero-divider" />

              <div className="stats">
                {[["3","MERN Projects"],["10+","APIs Built"],["7.59","CGPA B.Tech"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="stat-n">{n}</div>
                    <div className="stat-l">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* avatar */}
            <div className="avatar-float avcol">
              <div className="avatar-wrap">
                <div className="av-glow" />
                <div className="av-ring" />
                <div className="av-img">
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="Anand J" />
                    : <div className="av-placeholder">👨‍💻</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" className="sec skills-bg">
          <div className="sec-inner">
            <Reveal>
              <div className="sec-eyebrow">What I work with</div>
              <h2 className="sec-h2">Technical Skills</h2>
            </Reveal>

            {/* filter tabs */}
            <Reveal delay={0.05}>
              <div className="skill-filter">
                {skillCats.map(c => (
                  <button key={c} className={`sf-btn${activeSkillCat===c?" active":""}`} onClick={()=>setActiveSkillCat(c)}>{c}</button>
                ))}
              </div>
            </Reveal>

            <div className="skills-grid">
              {filteredSkills.map((s,i) => (
                <Reveal key={s.name} delay={i*0.04}>
                  <div className="skill-pill">
                    <span className="skill-icon">{s.icon}</span>
                    <div>
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-cat-badge">{s.cat}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="projects" className="sec proj-bg">
          <div className="sec-inner">
            <Reveal>
              <div className="sec-eyebrow">What I've built</div>
              <h2 className="sec-h2">Projects</h2>
            </Reveal>

            <div className="proj-grid">
              {PROJECTS.map((p,i) => (
                <Reveal key={p.title} delay={i*0.1}>
                  <div className="proj-card" style={{ "--color": p.color }}>
                    <div className="proj-num">{p.num}</div>
                    <div className="proj-body">
                      {/* tag */}
                      <div>
                        <span className="proj-tag" style={{ background:`${p.color}15`, color:p.color, border:`1px solid ${p.color}30` }}>{p.tag}</span>
                      </div>
                      <div className="proj-title">{p.title}</div>
                      <p className="proj-desc">{p.desc}</p>

                      {/* highlights */}
                      <div className="proj-bullets">
                        {p.highlights.map(h => <div key={h} className="proj-bullet" style={{ borderLeftColor:`${p.color}40` }}>{h}</div>)}
                      </div>

                      {/* stack */}
                      <div>
                        <div style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--faint)", marginBottom:"8px" }}>Tech Stack</div>
                        <div className="proj-stack">
                          {p.stack.map(s => (
                            <span key={s} className="proj-tech" style={{ background:`${p.color}0d`, borderColor:`${p.color}30`, color:p.color }}>{s}</span>
                          ))}
                        </div>
                      </div>

                      {/* links */}
                      <div className="proj-links">
                        <a href={p.github_fe} target="_blank" rel="noreferrer" className="p-link">
                          <GH /> {p.github_be ? "Frontend" : "GitHub"}
                        </a>
                        {p.github_be && (
                          <a href={p.github_be} target="_blank" rel="noreferrer" className="p-link">
                            <GH /> Backend
                          </a>
                        )}
                        {p.live !== "#" ? (
                          <a href={p.live} target="_blank" rel="noreferrer" className="p-link p-link-live" style={{ background:p.color }}>
                            ↗ Live Demo
                          </a>
                        ) : (
                          <span className="p-link" style={{ opacity:.5, cursor:"default" }}>🔒 Coming Soon</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CERTIFICATIONS ══ */}
        <section id="certifications" className="sec cert-bg">
          <div className="sec-inner">
            <Reveal>
              <div className="sec-eyebrow">Credentials</div>
              <h2 className="sec-h2">Certifications</h2>
            </Reveal>
            <div className="cert-grid">
              {CERTS.map((c,i) => (
                <Reveal key={c.title} delay={i*0.1}>
                  <div className="cert-card" style={{ borderColor:`${c.color}20` }}>
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:c.color, borderRadius:"0 0 18px 18px", opacity:.6 }} />
                    <div className="cert-icon-wrap" style={{ background:`${c.color}15`, border:`1px solid ${c.color}30` }}>
                      <span style={{ fontSize:"1.5rem" }}>{i===0?"🏆":"🎓"}</span>
                    </div>
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-issuer" style={{ color:c.color }}>{c.issuer}</div>
                    <div className="cert-sub">{c.sub}</div>
                    <div className="cert-date">{c.date}</div>
                    <div className="cert-badge">✓ Verified</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="sec contact-bg">
          <div className="sec-inner">
            <Reveal>
              <div className="sec-eyebrow">Let's connect</div>
              <h2 className="sec-h2">Get In Touch</h2>
            </Reveal>

            <div className="contact-grid">
              {/* left */}
              <Reveal delay={0.05}>
                <div>
                  <div className="c-heading">Let's build<br />something great.</div>
                  <p className="c-desc">I'm actively looking for fresher MERN Stack / Full-Stack developer opportunities. Feel free to reach out for positions, collaborations, or just to say hi!</p>

                  {[
                    { icon:"✉",  label:"Email",    sub:"anandjayakumardae@gmail.com", href:"mailto:anandjayakumardae@gmail.com", bg:"rgba(56,189,248,.1)" },
                    { icon:"💼", label:"LinkedIn",  sub:"linkedin.com/in/anand-j",      href:"https://www.linkedin.com/in/anand-j/",    bg:"rgba(29,78,216,.15)" },
                    { icon:"🐙", label:"GitHub",    sub:"github.com/Anand12082001",     href:"https://github.com/Anand12082001",        bg:"rgba(255,255,255,.06)" },
                    { icon:"📄", label:"Resume",    sub:"View / Download",              href:RESUME_URL,                                bg:"rgba(52,211,153,.1)" },
                    { icon:"📍", label:"Location",  sub:"Salem, Tamil Nadu, India",      href:null,                                     bg:"rgba(167,139,250,.1)" },
                  ].map(({ icon, label, sub, href, bg }) => (
                    <a key={label} href={href||undefined} target={href&&!href.startsWith("mailto")?"_blank":undefined} rel="noreferrer" className="soc-item" style={{ cursor:href?"pointer":"default" }}>
                      <span className="soc-icon" style={{ background:bg }}>{icon}</span>
                      <div>
                        <div className="soc-label">{label}</div>
                        <div className="soc-sub">{sub}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* right — form */}
              <Reveal delay={0.1}>
                <div className="form-box">
                  <div className="form-title">Send a Message</div>
                  {sent && <div className="alert-ok">✓ Message sent! I'll reply within 24 hours.</div>}
                  {err  && <div className="alert-err">⚠ {err}</div>}
                  <form onSubmit={fs}>
                    <div className="form-row2">
                      <div className="form-group">
                        <label className="form-label">Name *</label>
                        <input className="form-inp" name="name" placeholder="Your name" value={form.name} onChange={fc} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input className="form-inp" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={fc} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input className="form-inp" name="subject" placeholder="Job Opportunity / Collaboration" value={form.subject} onChange={fc} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea className="form-inp" name="message" placeholder="Write your message..." value={form.message} onChange={fc} rows={5} style={{ resize:"vertical" }} />
                    </div>
                    <button type="submit" className="form-submit" disabled={loading}>
                      {loading ? "Sending…" : "Send Message →"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="footer">
          {/* top line */}
          <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,var(--sky) 40%,var(--purple) 70%,transparent)", opacity:.3, marginTop:"-3rem" }} />
          <div className="footer-inner">
            <div>
              <div className="footer-logo">AJ.</div>
              <div className="footer-copy" style={{ marginTop:"4px" }}>MERN Stack Developer · Salem, Tamil Nadu</div>
            </div>
            <div className="footer-links">
              {[["GitHub","https://github.com/Anand12082001"],["LinkedIn","https://www.linkedin.com/in/anand-j/"],["Resume",RESUME_URL]].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noreferrer" className="footer-link">{l}</a>
              ))}
            </div>
            <div className="footer-copy">© {new Date().getFullYear()} Anand J · All rights reserved</div>
          </div>
        </footer>

      </div>
    </>
  );
}
