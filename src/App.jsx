import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];
const RESUME_URL = "https://drive.google.com/file/d/1f1Y9wJ4yRp8qK5n9Kb5J0ndommUZsYFr/view?usp=sharing";
const PROFILE_IMAGE = "/Anand.png";

// ── EmailJS Config ──────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_u1txvzs";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_3tiac9e";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "0EuleLIVzHzhHTvyq";
// ─────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────

const SKILLS_MAIN = [
  { name: "React.js",       icon: "⚛" },
  { name: "JavaScript",     icon: "JS" },
  { name: "Node.js",        icon: "🟢" },
  { name: "Express.js",     icon: "🚂" },
  { name: "MongoDB",        icon: "🍃" },
  { name: "Tailwind CSS",   icon: "🎨" },
  { name: "HTML5",          icon: "📄" },
  { name: "CSS3",           icon: "💅" },
];

const SKILLS_MORE = [
  { name: "React Hooks",     icon: "🪝" },
  { name: "React Router v6", icon: "🔀" },
  { name: "JWT Auth",        icon: "🔐" },
  { name: "REST API",        icon: "🔌" },
  { name: "Mongoose ODM",    icon: "📦" },
  { name: "Git / GitHub",    icon: "🐙" },
  { name: "Postman",         icon: "📮" },
  { name: "Axios",           icon: "📡" },
  { name: "Netlify",         icon: "🚀" },
  { name: "Render",          icon: "☁" },
];

const PROJECTS = [
  {
    num: "01",
    title: "College Placement Management System",
    type: "FULL-STACK · MERN",
    desc: "A production-grade, role-based full-stack web application that digitizes and manages student placements and company recruitment workflows. Features JWT authentication with role-specific access control for Student, TPO, and Admin.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Axios"],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "https://sparkling-vacherin-edc492.netlify.app/",
  },
  {
    num: "02",
    title: "Invoice Builder",
    type: "FULL-STACK · MERN",
    desc: "A full-stack invoice management app to create, edit, preview, and export professional invoices with real-time total and tax calculation. Features dynamic React form components with controlled state and full CRUD support.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    github_fe: "https://github.com/Anand12082001",
    github_be: "https://github.com/Anand12082001",
    live: "https://velvety-lily-fbab4f.netlify.app/",
  },
  {
    num: "03",
    title: "Movie Review App",
    type: "FRONTEND · REACT",
    desc: "A responsive React application to search, explore and review movies powered by the OMDB public API. Real-time search with debounced input, movie detail cards, and a clean Tailwind CSS responsive UI.",
    stack: ["React.js", "Tailwind CSS", "React Hooks", "OMDB API"],
    github_fe: "https://github.com/Anand12082001/Project_2_movieReview.git",
    github_be: null,
    live: "https://gleaming-tapioca-a677cc.netlify.app/",
  },
];

const CERTS = [
  { title: "MERN Stack Development", issuer: "GUVI — Geek Networks", detail: "Full-Stack Web Development Certification Program · Dec 2025" },
  { title: "Version Control — Git & GitHub", issuer: "GUVI — Geek Networks", detail: "Branching, pull requests & collaborative workflows · 2025" },
];

/* helpers */
function useVisible(t = 0.1) {
  const ref = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, v] = useVisible();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)", transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const GH = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LINE = ({ my = "3rem" }) => (
  <div style={{ width: "100%", height: "1px", background: "#1a1a1a", margin: `${my} 0` }} />
);

export default function App() {
  const [active, setActive] = useState("About");
  const [typed, setTyped]   = useState("");
  const [menu, setMenu]     = useState(false);
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);
  const [skillTab, setSkillTab] = useState("main");

  const roles  = ["MERN Stack Developer", "Full Stack Developer", "React.js Engineer"];
  const rIdx   = useRef(0);
  const cIdx   = useRef(0);
  const isDel  = useRef(false);

  /* typing */
  useEffect(() => {
    const tick = () => {
      const cur = roles[rIdx.current];
      if (!isDel.current) {
        setTyped(cur.slice(0, cIdx.current + 1));
        cIdx.current++;
        if (cIdx.current === cur.length) { isDel.current = true; setTimeout(tick, 2000); return; }
      } else {
        setTyped(cur.slice(0, cIdx.current - 1));
        cIdx.current--;
        if (cIdx.current === 0) { isDel.current = false; rIdx.current = (rIdx.current + 1) % roles.length; }
      }
      setTimeout(tick, isDel.current ? 45 : 90);
    };
    const t = setTimeout(tick, 800);
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

  const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  /* form */
  const fc = e => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setErr(""); };
  const fs = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setErr("Please fill in all required fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr("Enter a valid email address."); return; }
    setLoading(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: form.name, from_email: form.email, subject: form.subject || `Portfolio message from ${form.name}`, message: form.message }, EMAILJS_PUBLIC_KEY);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 7000);
    } catch { setErr("Send failed. Email me: anandjayakumardae@gmail.com"); }
    finally { setLoading(false); }
  };

  const W = "max-width:1200px;margin:0 auto;padding:0 clamp(1.5rem,6vw,7rem)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }

        :root {
          --font-sans : Calibri, 'DM Sans', 'Segoe UI', sans-serif;
          --font-serif: 'DM Serif Display', Georgia, serif;
          --bg        : #faf9f7;
          --bg2       : #f3f1ed;
          --ink       : #111111;
          --ink2      : #333333;
          --ink3      : #666666;
          --ink4      : #999999;
          --line      : #1a1a1a;
          --accent    : #111111;
          --white     : #ffffff;
          --border    : #e0ddd8;
        }

        body { font-family:var(--font-sans); background:var(--bg); color:var(--ink); overflow-x:hidden; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:var(--ink); }

        /* ══ NAV ══ */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:500;
          height:70px; display:flex; align-items:center; justify-content:space-between;
          padding:0 clamp(1.5rem,5vw,5rem);
          background:rgba(250,249,247,.95);
          backdrop-filter:blur(12px);
          border-bottom:1px solid var(--border);
        }
        .nav-logo { font-family:var(--font-serif); font-size:1.5rem; font-weight:400; color:var(--ink); letter-spacing:-.01em; }
        .nav-logo span { color:var(--ink3); }
        .nav-ul { display:flex; gap:2.2rem; list-style:none; }
        .nav-li { cursor:pointer; font-size:.82rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:var(--ink3); transition:color .2s; font-family:var(--font-sans); }
        .nav-li:hover, .nav-li.on { color:var(--ink); }
        .nav-li.on { border-bottom:1.5px solid var(--ink); padding-bottom:2px; }
        .nav-cta { font-family:var(--font-sans); font-size:.82rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--white); background:var(--ink); border:none; border-radius:4px; padding:10px 22px; cursor:pointer; text-decoration:none; display:inline-block; transition:opacity .2s; }
        .nav-cta:hover { opacity:.8; }
        .hbg { display:none; flex-direction:column; gap:5px; cursor:pointer; }
        .hbg span { display:block; width:22px; height:1.5px; background:var(--ink); border-radius:1px; transition:.3s; }
        .mob-menu { position:fixed; top:70px; left:0; right:0; z-index:499; background:var(--bg); border-bottom:1px solid var(--border); padding:1.5rem 2rem 2rem; display:flex; flex-direction:column; gap:1rem; }
        .mob-li { font-family:var(--font-sans); font-size:1rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase; color:var(--ink3); cursor:pointer; padding:8px 0; border-bottom:1px solid var(--border); }
        .mob-li:hover { color:var(--ink); }

        /* ══ HERO ══ */
        .hero { min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:90px clamp(1.5rem,6vw,7rem) 0; background:var(--bg); position:relative; overflow:hidden; }
        .hero-inner { max-width:1200px; margin:0 auto; width:100%; display:grid; grid-template-columns:1fr auto; gap:4rem; align-items:center; padding-bottom:6rem; }
        .hero-eyebrow { font-size:.75rem; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--ink3); margin-bottom:1.2rem; }
        .hi { font-family:var(--font-sans); font-size:clamp(1.1rem,2vw,1.4rem); font-weight:300; color:var(--ink3); margin-bottom:-.5rem; font-style:italic; }
        .hero-name { font-family:var(--font-serif); font-size:clamp(4rem,10vw,8rem); font-weight:400; line-height:.92; letter-spacing:-.03em; color:var(--ink); margin-bottom:1.2rem; }
        .hero-role { font-size:clamp(.95rem,1.8vw,1.2rem); font-weight:400; color:var(--ink3); margin-bottom:2rem; min-height:1.8em; font-style:italic; }
        .hero-role em { color:var(--ink); font-style:normal; font-weight:600; }
        .cursor { display:inline-block; width:2px; height:.95em; background:var(--ink); margin-left:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
        .hero-desc { font-size:1rem; line-height:1.85; color:var(--ink3); max-width:480px; margin-bottom:2.5rem; font-weight:400; }
        .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; align-items:center; }
        .btn-dark { font-family:var(--font-sans); font-size:.82rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--white); background:var(--ink); border:none; border-radius:4px; padding:13px 28px; cursor:pointer; transition:opacity .2s; text-decoration:none; display:inline-block; }
        .btn-dark:hover { opacity:.8; }
        .btn-outline { font-family:var(--font-sans); font-size:.82rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--ink); background:transparent; border:1.5px solid var(--ink); border-radius:4px; padding:12px 26px; cursor:pointer; transition:all .2s; }
        .btn-outline:hover { background:var(--ink); color:var(--white); }

        /* avatar */
        .av-wrap { position:relative; flex-shrink:0; animation:float 6s ease-in-out infinite; }
        .av-circle {
          width:clamp(180px,18vw,260px); height:clamp(180px,18vw,260px);
          border-radius:50%; overflow:hidden;
          border:2px solid var(--border);
          background:var(--bg2);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 40px rgba(0,0,0,.08);
        }
        .av-circle img { width:100%; height:100%; object-fit:cover; display:block; }
        .av-placeholder { font-size:clamp(3rem,7vw,5rem); }
        /* decorative label on avatar */
        .av-tag { position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--white); font-size:.65rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:5px 14px; border-radius:100px; white-space:nowrap; }

        /* hero stats row */
        .hero-stats { display:flex; gap:3rem; flex-wrap:wrap; padding-top:2.5rem; border-top:1px solid var(--border); margin-top:2.5rem; }
        .hs-n { font-family:var(--font-serif); font-size:2rem; font-weight:400; color:var(--ink); }
        .hs-l { font-size:.72rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--ink4); margin-top:2px; }

        /* ══ SECTION WRAPPER ══ */
        .sec { padding:6rem 0; }
        .sec-w { max-width:1200px; margin:0 auto; padding:0 clamp(1.5rem,6vw,7rem); }

        /* section header — editorial style */
        .sec-tag { font-size:.68rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--ink3); margin-bottom:.5rem; }
        .sec-h { font-family:var(--font-serif); font-size:clamp(2rem,4vw,3.2rem); font-weight:400; color:var(--ink); line-height:1.05; margin-bottom:0; letter-spacing:-.02em; }
        .sec-h em { font-style:italic; color:var(--ink3); }

        /* ══ ABOUT (inside hero) ══ */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
        .about-label { font-size:.68rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--ink3); margin-bottom:1rem; }
        .about-body { font-size:.96rem; line-height:1.85; color:var(--ink2); }

        /* ══ SKILLS ══ */
        .skills-bg { background:var(--bg); }
        .skills-header { display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem; margin-bottom:3rem; }
        .skill-tabs { display:flex; gap:0; border:1px solid var(--border); border-radius:5px; overflow:hidden; }
        .skill-tab { font-family:var(--font-sans); font-size:.75rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:8px 18px; background:transparent; border:none; cursor:pointer; color:var(--ink3); transition:all .2s; }
        .skill-tab.on { background:var(--ink); color:var(--white); }
        .skills-label { font-size:.68rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--ink3); margin-bottom:1.5rem; padding-bottom:.75rem; border-bottom:1px solid var(--border); }
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:.7rem; }
        .skill-item { display:flex; flex-direction:column; align-items:center; gap:.5rem; padding:1.4rem 1rem; border:1px solid var(--border); border-radius:6px; background:var(--white); transition:all .25s; cursor:default; text-align:center; }
        .skill-item:hover { border-color:var(--ink); box-shadow:0 4px 20px rgba(0,0,0,.06); transform:translateY(-3px); }
        .skill-icon { font-size:1.6rem; line-height:1; }
        .skill-nm { font-size:.8rem; font-weight:600; color:var(--ink); letter-spacing:.02em; }

        /* ══ PROJECTS ══ */
        .proj-bg { background:var(--bg2); }
        .proj-list { display:flex; flex-direction:column; }
        .proj-item { display:grid; grid-template-columns:100px 1fr; gap:3rem; padding:3.5rem 0; border-bottom:1px solid var(--border); transition:opacity .2s; }
        .proj-item:first-child { border-top:1px solid var(--border); }
        .proj-item:hover { opacity:.85; }
        .proj-num { font-family:var(--font-serif); font-size:3.5rem; font-weight:400; color:var(--border); line-height:1; letter-spacing:-.03em; padding-top:.3rem; }
        .proj-body { display:flex; flex-direction:column; gap:1rem; }
        .proj-type { font-size:.65rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ink3); }
        .proj-title { font-family:var(--font-serif); font-size:clamp(1.4rem,2.5vw,2rem); font-weight:400; color:var(--ink); line-height:1.2; }
        .proj-desc { font-size:.9rem; color:var(--ink3); line-height:1.8; max-width:620px; }
        .proj-stack { display:flex; flex-wrap:wrap; gap:.45rem; }
        .proj-tech { font-size:.7rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--ink3); border:1px solid var(--border); padding:4px 11px; border-radius:3px; background:var(--white); }
        .proj-links { display:flex; gap:.8rem; flex-wrap:wrap; padding-top:.5rem; }
        .p-link { display:inline-flex; align-items:center; gap:6px; font-family:var(--font-sans); font-size:.78rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; text-decoration:none; color:var(--ink3); border-bottom:1px solid var(--border); padding-bottom:2px; transition:all .2s; }
        .p-link:hover { color:var(--ink); border-bottom-color:var(--ink); }
        .p-link-live { color:var(--white) !important; background:var(--ink); border:none !important; padding:8px 18px; border-radius:4px; }
        .p-link-live:hover { opacity:.8; }

        /* ══ CERTIFICATIONS ══ */
        .cert-bg { background:var(--bg); }
        .cert-list { display:flex; flex-direction:column; }
        .cert-item { display:grid; grid-template-columns:1fr auto; align-items:center; gap:2rem; padding:2.2rem 0; border-bottom:1px solid var(--border); }
        .cert-item:first-child { border-top:1px solid var(--border); }
        .cert-title { font-family:var(--font-serif); font-size:1.25rem; font-weight:400; color:var(--ink); margin-bottom:4px; }
        .cert-issuer { font-size:.82rem; font-weight:600; color:var(--ink3); letter-spacing:.04em; }
        .cert-detail { font-size:.8rem; color:var(--ink4); margin-top:3px; }
        .cert-badge { display:inline-flex; align-items:center; gap:5px; font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#16a34a; background:#f0fdf4; border:1px solid #bbf7d0; padding:5px 13px; border-radius:100px; white-space:nowrap; }

        /* ══ CONTACT ══ */
        .contact-bg { background:var(--bg2); }
        .contact-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:5rem; align-items:start; }
        .contact-big { font-family:var(--font-serif); font-size:clamp(1.5rem,3vw,2.2rem); font-weight:400; color:var(--ink); line-height:1.3; margin-bottom:1.5rem; }
        .contact-desc { font-size:.95rem; color:var(--ink3); line-height:1.85; margin-bottom:2.5rem; }
        .contact-items { display:flex; flex-direction:column; gap:.1rem; }
        .c-item { display:flex; align-items:center; justify-content:space-between; padding:1.1rem 0; border-bottom:1px solid var(--border); text-decoration:none; color:var(--ink); transition:all .2s; }
        .c-item:first-child { border-top:1px solid var(--border); }
        .c-item:hover .c-arrow { transform:translate(4px,-4px); }
        .c-item:hover { opacity:.7; }
        .c-label { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ink3); }
        .c-val { font-size:.9rem; font-weight:500; color:var(--ink); }
        .c-arrow { transition:transform .2s; color:var(--ink3); font-size:.9rem; }

        /* form */
        .form-wrap { background:var(--white); border:1px solid var(--border); border-radius:8px; padding:2.5rem; }
        .form-title { font-family:var(--font-serif); font-size:1.5rem; font-weight:400; color:var(--ink); margin-bottom:1.8rem; }
        .f-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .f-group { display:flex; flex-direction:column; gap:6px; margin-bottom:1.1rem; }
        .f-label { font-size:.68rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ink3); }
        .f-inp { font-family:var(--font-sans); font-size:.92rem; background:var(--bg); border:1px solid var(--border); border-radius:4px; padding:11px 14px; color:var(--ink); outline:none; transition:border-color .2s; width:100%; }
        .f-inp:focus { border-color:var(--ink); }
        .f-inp::placeholder { color:var(--ink4); }
        .f-submit { width:100%; font-family:var(--font-sans); font-size:.82rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; background:var(--ink); color:var(--white); border:none; border-radius:4px; padding:14px; cursor:pointer; transition:opacity .2s; margin-top:.4rem; }
        .f-submit:hover { opacity:.8; }
        .f-submit:disabled { opacity:.5; cursor:not-allowed; }
        .alert-ok  { background:#f0fdf4; border:1px solid #bbf7d0; color:#16a34a; border-radius:4px; padding:11px 15px; font-size:.85rem; font-weight:600; margin-bottom:1rem; }
        .alert-err { background:#fff1f2; border:1px solid #fecdd3; color:#e11d48; border-radius:4px; padding:11px 15px; font-size:.85rem; font-weight:600; margin-bottom:1rem; }

        /* ══ FOOTER ══ */
        .footer { background:var(--ink); padding:3rem clamp(1.5rem,6vw,7rem); }
        .footer-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; }
        .footer-logo { font-family:var(--font-serif); font-size:1.4rem; font-weight:400; color:var(--white); }
        .footer-links { display:flex; gap:2rem; }
        .footer-link { font-family:var(--font-sans); font-size:.75rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.45); text-decoration:none; transition:color .2s; }
        .footer-link:hover { color:var(--white); }
        .footer-copy { font-size:.75rem; color:rgba(255,255,255,.3); }

        /* ══ RESPONSIVE ══ */
        @media(max-width:900px) { .hero-inner { grid-template-columns:1fr !important; } .about-grid { grid-template-columns:1fr !important; } .proj-item { grid-template-columns:1fr !important; } .proj-num { display:none; } .contact-grid { grid-template-columns:1fr !important; } .f-row { grid-template-columns:1fr !important; } }
        @media(max-width:768px) { .nav-ul { display:none !important; } .hbg { display:flex !important; } .avcol { order:-1; margin:0 auto; } .hero-btns { flex-direction:column; align-items:flex-start; } .hero-stats { gap:2rem; } .footer-inner { flex-direction:column; text-align:center; } .footer-links { justify-content:center; } }
      `}</style>

      <div style={{ fontFamily: "var(--font-sans)" }}>

        {/* ══════ NAV ══════ */}
        <nav className="nav">
          <div className="nav-logo">Anand <span>J.</span></div>
          <ul className="nav-ul">
            {NAV_LINKS.map(l => <li key={l} className={`nav-li${active === l ? " on" : ""}`} onClick={() => go(l)}>{l}</li>)}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="nav-cta">Resume ↗</a>
            <div className="hbg" onClick={() => setMenu(o => !o)}>
              <span style={{ transform: menu ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menu ? 0 : 1 }} />
              <span style={{ transform: menu ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </div>
          </div>
        </nav>
        {menu && (
          <div className="mob-menu">
            {NAV_LINKS.map(l => <div key={l} className="mob-li" onClick={() => go(l)}>{l}</div>)}
          </div>
        )}

        {/* ══════ HERO ══════ */}
        <section id="about" className="hero">
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow">Portfolio — 2026</div>
              <div className="hi">Hi, I am</div>
              <h1 className="hero-name">Anand J.</h1>
              <div className="hero-role">
                <em>{typed}</em>
                <span className="cursor" />
              </div>
              <p className="hero-desc">
                Motivated MERN Stack Developer with hands-on experience building scalable full-stack web applications.
                Strong in component-based architecture, REST API design, and MongoDB database modeling.
                Actively seeking a full-stack developer role.
              </p>
              <div className="hero-btns">
                <button className="btn-dark" onClick={() => go("Projects")}>View Projects</button>
                <button className="btn-outline" onClick={() => go("Contact")}>Contact Me</button>
              </div>
              <div className="hero-stats">
                {[["3", "Projects built"], ["10+", "APIs developed"], ["7.59", "CGPA — B.Tech"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="hs-n">{n}</div>
                    <div className="hs-l">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* avatar */}
            <div className="av-wrap avcol">
              <div className="av-circle">
                {PROFILE_IMAGE
                  ? <img src={PROFILE_IMAGE} alt="Anand J" />
                  : <div className="av-placeholder">👨‍💻</div>
                }
              </div>
              <div className="av-tag">MERN Developer</div>
            </div>
          </div>

          {/* About strip inside hero section */}
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "0 clamp(1.5rem,6vw,7rem)", paddingBottom: "5rem" }}>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
              <div className="about-grid">
                <div>
                  <div className="about-label">About Me</div>
                  <p className="about-body">
                    I'm a <strong>MERN Stack Developer</strong> from Salem, Tamil Nadu, with a B.Tech in
                    Artificial Intelligence & Data Science (CGPA: 7.59). I specialize in building scalable
                    full-stack applications using React.js, Node.js, Express.js, and MongoDB — with a strong
                    focus on clean code, REST architecture, and component-based design.
                  </p>
                </div>
                <div>
                  <div className="about-label">Education</div>
                  <p className="about-body">
                    <strong>Mahendra Engineering College</strong><br />
                    B.Tech — Artificial Intelligence and Data Science<br />
                    2022 – 2025 · CGPA: 7.59<br /><br />
                    Certified in MERN Stack Development & Version Control via GUVI — Geek Networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ SKILLS ══════ */}
        <section id="skills" className="sec skills-bg">
          <div className="sec-w">
            <FadeUp>
              <div className="skills-header">
                <div>
                  <div className="sec-tag">What I work with</div>
                  <h2 className="sec-h">Technical <em>Skills</em></h2>
                </div>
                <div className="skill-tabs">
                  <button className={`skill-tab${skillTab === "main" ? " on" : ""}`} onClick={() => setSkillTab("main")}>Core</button>
                  <button className={`skill-tab${skillTab === "more" ? " on" : ""}`} onClick={() => setSkillTab("more")}>Tools & More</button>
                </div>
              </div>
            </FadeUp>

            <div className="skills-label">{skillTab === "main" ? "CURRENTLY USING" : "TOOLS & OTHER SKILLS"}</div>
            <div className="skills-grid">
              {(skillTab === "main" ? SKILLS_MAIN : SKILLS_MORE).map((s, i) => (
                <FadeUp key={s.name} delay={i * 0.05}>
                  <div className="skill-item">
                    <span className="skill-icon">{s.icon}</span>
                    <span className="skill-nm">{s.name}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ PROJECTS ══════ */}
        <section id="projects" className="sec proj-bg">
          <div className="sec-w">
            <FadeUp>
              <div className="sec-tag">What I've built</div>
              <h2 className="sec-h" style={{ marginBottom: "0" }}>Selected <em>Projects</em></h2>
            </FadeUp>

            <div className="proj-list">
              {PROJECTS.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.08}>
                  <div className="proj-item">
                    <div className="proj-num">{p.num}</div>
                    <div className="proj-body">
                      <div className="proj-type">{p.type}</div>
                      <div className="proj-title">{p.title}</div>
                      <p className="proj-desc">{p.desc}</p>
                      <div className="proj-stack">
                        {p.stack.map(s => <span key={s} className="proj-tech">{s}</span>)}
                      </div>
                      <div className="proj-links">
                        <a href={p.github_fe} target="_blank" rel="noreferrer" className="p-link">
                          <GH size={13} /> {p.github_be ? "Frontend Repo" : "GitHub"}
                        </a>
                        {p.github_be && (
                          <a href={p.github_be} target="_blank" rel="noreferrer" className="p-link">
                            <GH size={13} /> Backend Repo
                          </a>
                        )}
                        {p.live !== "#" && (
                          <a href={p.live} target="_blank" rel="noreferrer" className="p-link p-link-live">
                            ↗ Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CERTIFICATIONS ══════ */}
        <section id="certifications" className="sec cert-bg">
          <div className="sec-w">
            <FadeUp>
              <div className="sec-tag">Credentials</div>
              <h2 className="sec-h" style={{ marginBottom: "0" }}>Certifi<em>cations</em></h2>
            </FadeUp>

            <div className="cert-list">
              {CERTS.map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.08}>
                  <div className="cert-item">
                    <div>
                      <div className="cert-title">{c.title}</div>
                      <div className="cert-issuer">{c.issuer}</div>
                      <div className="cert-detail">{c.detail}</div>
                    </div>
                    <div className="cert-badge">✓ Verified</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CONTACT ══════ */}
        <section id="contact" className="sec contact-bg">
          <div className="sec-w">
            <FadeUp>
              <div className="sec-tag">Let's connect</div>
              <h2 className="sec-h" style={{ marginBottom: "3rem" }}>Get In <em>Touch</em></h2>
            </FadeUp>

            <div className="contact-grid">
              {/* left */}
              <FadeUp delay={0.05}>
                <div>
                  <div className="contact-big">Let's build something<br />great together.</div>
                  <p className="contact-desc">
                    I'm actively looking for fresher MERN Stack or Full-Stack developer opportunities.
                    Feel free to reach out for positions, collaborations, or just to say hello.
                  </p>

                  <div className="contact-items">
                    {[
                      { label: "Email", val: "anandjayakumardae@gmail.com", href: "mailto:anandjayakumardae@gmail.com" },
                      { label: "LinkedIn", val: "linkedin.com/in/anand-j", href: "https://www.linkedin.com/in/anand-j/" },
                      { label: "GitHub", val: "github.com/Anand12082001", href: "https://github.com/Anand12082001" },
                      { label: "Resume", val: "View / Download", href: RESUME_URL },
                      { label: "Location", val: "Salem, Tamil Nadu, India", href: null },
                    ].map(({ label, val, href }) => (
                      <a key={label} href={href || undefined} target={href && !href.startsWith("mailto") ? "_blank" : undefined} rel="noreferrer" className="c-item" style={{ cursor: href ? "pointer" : "default", textDecoration: "none" }}>
                        <div>
                          <div className="c-label">{label}</div>
                          <div className="c-val">{val}</div>
                        </div>
                        {href && <span className="c-arrow">↗</span>}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* right — form */}
              <FadeUp delay={0.1}>
                <div className="form-wrap">
                  <div className="form-title">Send a Message</div>
                  {sent && <div className="alert-ok">✓ Message sent! I'll reply within 24 hours.</div>}
                  {err && <div className="alert-err">⚠ {err}</div>}
                  <form onSubmit={fs}>
                    <div className="f-row">
                      <div className="f-group">
                        <label className="f-label">Name *</label>
                        <input className="f-inp" name="name" placeholder="Your name" value={form.name} onChange={fc} />
                      </div>
                      <div className="f-group">
                        <label className="f-label">Email *</label>
                        <input className="f-inp" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={fc} />
                      </div>
                    </div>
                    <div className="f-group">
                      <label className="f-label">Subject</label>
                      <input className="f-inp" name="subject" placeholder="Job Opportunity / Collaboration" value={form.subject} onChange={fc} />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Message *</label>
                      <textarea className="f-inp" name="message" placeholder="Write your message..." value={form.message} onChange={fc} rows={5} style={{ resize: "vertical" }} />
                    </div>
                    <button type="submit" className="f-submit" disabled={loading}>
                      {loading ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logo">Anand J.</div>
            <div className="footer-links">
              {[["GitHub", "https://github.com/Anand12082001"], ["LinkedIn", "https://www.linkedin.com/in/anand-j/"], ["Resume", RESUME_URL]].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="footer-link">{l}</a>
              ))}
            </div>
            <div className="footer-copy">© {new Date().getFullYear()} Anand J. All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  );
}
