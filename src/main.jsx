import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import profilePhoto from './assets/profile.png';
import {
  ArrowDownRight, ArrowUpRight, Menu, X, Github, Linkedin, Mail,
  Code2, Braces, Database, Cpu, Sparkles, Terminal, GraduationCap,
  BriefcaseBusiness, MoveUpRight, Send, ExternalLink, CheckCircle2, AlertCircle
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    number: '01',
    type: 'MACHINE LEARNING · RECOMMENDATION',
    title: 'Hotel Recommendation System',
    description: 'A multi-criteria recommendation project exploring how hotel descriptions, reviews, ratings, and user preferences can work together.',
    tags: ['Python', 'PyTorch', 'Sentence-Transformers', 'PostgreSQL'],
    tone: 'project-orange',
    mark: 'H/',
    status: 'PROJECT',
    details: 'The proposed approach explores semantic embeddings, DeepFM + MLP scoring, and Dempster–Shafer evidence fusion. Update this card with the exact implementation status and a repository link when available.',
  },
  {
    number: '02',
    type: 'BACKEND DEVELOPMENT',
    title: 'Spring Boot Practice',
    description: 'A Java backend learning project focused on REST-style application structure and managing records.',
    tags: ['Java', 'Spring Boot', 'Maven', 'H2'],
    tone: 'project-blue',
    mark: '{ }',
    status: 'LEARNING PROJECT',
    details: 'Use this card to describe the endpoints and features you have actually completed. No repository link is included until you provide one.',
  },
  {
    number: '03',
    type: 'DATA & AI LEARNING',
    title: 'PySpark Learning Lab',
    description: 'Hands-on practice with DataFrames, schemas, joins, null handling, aggregations, and data transformations.',
    tags: ['Python', 'PySpark', 'DataFrames', 'SQL'],
    tone: 'project-lilac',
    mark: 'df.',
    status: 'LEARNING JOURNEY',
    details: 'This section represents your learning work rather than a finished production project. Add specific exercises or a public repository as you build them.',
  },
];

const skills = [
  { icon: Braces, name: 'Java', level: 'Programming' },
  { icon: Code2, name: 'Python', level: 'Programming' },
  { icon: Terminal, name: 'React', level: 'Frontend development' },
  { icon: Code2, name: 'Spring Boot', level: 'Backend development' },
  { icon: Database, name: 'Pandas', level: 'Data analysis' },
  { icon: Cpu, name: 'PySpark', level: 'Currently learning' },
  { icon: Sparkles, name: 'Generative AI', level: 'Currently learning' },
  { icon: Database, name: 'SQL', level: 'Database fundamentals' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm(current => ({ ...current, [name]: value }));
  };

  const submitContactForm = async (event) => {
    event.preventDefault();
    setContactStatus({ type: '', message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setContactStatus({ type: 'error', message: 'The contact form is not configured yet. Please use the LinkedIn link below for now.' });
      return;
    }

    setSending(true);
    try {
      // Send the visitor's message to your inbox first.
      await emailjs.send(serviceId, templateId, {
        from_name: contactForm.name,
        from_email: contactForm.email,
        reply_to: contactForm.email,
        message: contactForm.message,
        to_name: 'Manoj',
      }, { publicKey });

      // Optional: send an automatic thank-you email if an auto-reply template is configured.
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
      if (autoReplyTemplateId) {
        try {
          await emailjs.send(serviceId, autoReplyTemplateId, {
            to_email: contactForm.email,
            to_name: contactForm.name,
          }, { publicKey });
        } catch (autoReplyError) {
          // The original message was sent, so an auto-reply failure should not mark it as failed.
          console.error('EmailJS auto-reply error:', autoReplyError);
        }
      }

      setContactStatus({ type: 'success', message: 'Message sent successfully! Thanks for reaching out.' });
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS contact form error:', error);
      setContactStatus({ type: 'error', message: 'Could not send your message. Please try again or contact me on LinkedIn.' });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a href="#home" className="brand" onClick={closeMenu} aria-label="Manoj home">
          <span className="brand-mark">M<span>.</span></span>
          <span className="brand-name">MANOJ<span> / PORTFOLIO</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#contact" className="nav-contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR LEARNING & COLLABORATION</div>
            <h1>Building ideas<br />into <span className="orange-word">digital</span><br /><span className="outline-word">experiences.</span></h1>
            <p className="hero-intro">I’m Manoj — a Computer Science student who enjoys building software and exploring the world of data and Generative AI.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href="#about">A little about me <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-footnote"><span className="mono">01 / 04</span><span className="footnote-line" /><span>CODE · LEARN · BUILD</span></div>
          </div>
          <div className="hero-art profile-photo-wrap" aria-label="Manoj's profile photo">
            <img
              src={profilePhoto}
              alt="Manoj Kumar"
              className="profile-photo"
              style={{
                width: 'min(78%, 360px)',
                aspectRatio: '1 / 1',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
                border: '4px solid #f97316',
                boxShadow: '0 0 42px rgba(249, 115, 22, 0.22)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'block',
              }}
            />
          </div>
          <div className="hero-index"><span>SCROLL TO DISCOVER</span><div className="scroll-stem" /></div>
        </section>

        <section className="ticker" aria-label="Areas of interest">
          <div className="ticker-track">
            {['SOFTWARE DEVELOPMENT', 'DATA & PYTHON', 'GENERATIVE AI', 'CURIOUS BY DEFAULT', 'SOFTWARE DEVELOPMENT', 'DATA & PYTHON', 'GENERATIVE AI'].map((item, i) => (
              <span key={`${item}-${i}`}>{item}<b>✳</b></span>
            ))}
          </div>
        </section>

        <section className="about section-wrap section-space" id="about">
          <div className="section-kicker reveal"><span>01</span> / ABOUT ME</div>
          <div className="about-grid">
            <h2 className="section-heading reveal">Curiosity is<br />my <span className="orange-word">starting</span><br />point.</h2>
            <div className="about-body reveal">
              <p className="lead">I’m pursuing a B.E. in Computer Science and Engineering at <strong>Thiagarajar College of Engineering, Madurai.</strong></p>
              <p>I like understanding how things work — from backend APIs and web interfaces to data processing and emerging AI tools. Right now, I’m strengthening my Python and data skills while exploring Generative AI and PySpark.</p>
              <p>This portfolio is a living record of what I’m learning, building, and improving — one project at a time.</p>
              <a href="#journey" className="text-link">More about my journey <MoveUpRight size={16} /></a>
            </div>
          </div>
          <div className="about-stats reveal">
            <div className="stat"><span className="stat-number">CSE</span><span className="stat-label">Undergraduate</span></div>
            <div className="stat"><span className="stat-number">2023—27</span><span className="stat-label">Expected degree timeline</span></div>
            <div className="stat"><span className="stat-number">AI + SWE</span><span className="stat-label">Areas I’m exploring</span></div>
          </div>
        </section>

        <section className="skills section-wrap section-space" id="skills">
          <div className="section-kicker reveal"><span>02</span> / TOOLKIT</div>
          <div className="skills-heading-row reveal">
            <h2 className="section-heading">Tools I use.<br /><span className="muted-heading">Skills I’m growing.</span></h2>
            <p>My current toolkit is a mix of programming foundations, application development, and data/AI learning.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return <article className="skill-card reveal" key={skill.name} style={{ '--delay': `${i * 45}ms` }}>
                <div className="skill-icon"><Icon size={20} strokeWidth={1.7} /></div>
                <div><h3>{skill.name}</h3><p>{skill.level}</p></div>
                <span className="skill-arrow"><ArrowUpRight size={16} /></span>
              </article>;
            })}
          </div>
          <p className="skill-note"><span className="orange-dot" /> I’m still learning and improving — this list reflects my current focus, not a claim of expert-level proficiency.</p>
        </section>

        <section className="work section-wrap section-space" id="work">
          <div className="section-kicker reveal"><span>03</span> / SELECTED WORK</div>
          <div className="work-heading reveal">
            <h2 className="section-heading">A few things<br />in <span className="orange-word">progress.</span></h2>
            <p>Projects and learning work that reflect what I’m interested in building. Details can evolve as each project develops.</p>
          </div>
          <div className="project-list">
            {projects.map((project, i) => (
              <article className={`project-card ${project.tone} reveal`} key={project.number}>
                <div className="project-topline"><span>{project.number} / {project.type}</span><span className="project-status">{project.status}</span></div>
                <div className="project-content">
                  <div className="project-text">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="project-visual"><span>{project.mark}</span><i /><b>{project.number}</b></div>
                </div>
                <details className="project-details">
                  <summary>Project notes <ArrowUpRight size={15} /></summary>
                  <p>{project.details}</p>
                </details>
              </article>
            ))}
          </div>
          <div className="projects-foot reveal"><span className="mono">MORE TO COME</span><span className="footnote-line" /><span>Learning in public, one step at a time.</span></div>
        </section>

        <section className="journey section-wrap section-space" id="journey">
          <div className="section-kicker reveal"><span>04</span> / THE JOURNEY</div>
          <div className="journey-grid">
            <div className="journey-intro reveal">
              <h2 className="section-heading">The next<br />chapter is <span className="orange-word">loading.</span></h2>
              <p>I’m building on my software development foundation while moving deeper into data and AI engineering.</p>
              <div className="journey-stamp"><Sparkles size={17} /> ALWAYS A WORK IN PROGRESS</div>
            </div>
            <div className="timeline">
              <article className="timeline-item reveal">
                <div className="timeline-marker"><GraduationCap size={17} /></div>
                <div className="timeline-meta">2023 — 2027 · EDUCATION</div>
                <h3>B.E. Computer Science & Engineering</h3>
                <p>Thiagarajar College of Engineering, Madurai</p>
              </article>
              <article className="timeline-item reveal">
                <div className="timeline-marker"><BriefcaseBusiness size={17} /></div>
                <div className="timeline-meta">CAREER MILESTONE</div>
                <h3>Selected for TCS Digital</h3>
                <p>A milestone in my campus placement journey and a starting point for my professional growth.</p>
              </article>
              <article className="timeline-item reveal">
                <div className="timeline-marker"><Cpu size={17} /></div>
                <div className="timeline-meta">CURRENT FOCUS</div>
                <h3>Python, PySpark & Generative AI</h3>
                <p>Strengthening Python and data processing fundamentals while exploring AI concepts and tools.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-panel reveal">
            <div className="contact-top"><span className="mono">05 / CONTACT</span><span className="contact-star">✳</span></div>
            <h2>Have an idea?<br /><span>Let’s make it</span><br />real-ish.</h2>
            <p>Interested in collaborating, sharing project feedback, or talking about software and AI? Reach out.</p>
            <form className="contact-form" onSubmit={submitContactForm}>
              <div className="contact-fields-row">
                <label className="contact-field">
                  <span>Your name</span>
                  <input name="name" value={contactForm.name} onChange={updateContactField} placeholder="e.g. Arun Kumar" autoComplete="name" required maxLength={100} />
                </label>
                <label className="contact-field">
                  <span>Your email</span>
                  <input type="email" name="email" value={contactForm.email} onChange={updateContactField} placeholder="you@example.com" autoComplete="email" required maxLength={200} />
                </label>
              </div>
              <label className="contact-field">
                <span>Message</span>
                <textarea name="message" value={contactForm.message} onChange={updateContactField} placeholder="Tell me a little about what you have in mind..." rows={5} required minLength={5} maxLength={4000} />
              </label>
              <button className="button button-primary contact-button" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'} {sending ? null : <Send size={16} />}
              </button>
              {contactStatus.message && <p className={`contact-status ${contactStatus.type}`} role="status">{contactStatus.type === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}{contactStatus.message}</p>}
              <span className="contact-hint">Your details are used only to respond to your message. The form needs EmailJS setup before it can send messages.</span>
            </form>
            <div className="social-links" aria-label="Social profiles">
              <a href="https://www.linkedin.com/in/manoj--t/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={13} /></a>
              <a href="https://leetcode.com/u/MANOJ_DEVELOPER/" target="_blank" rel="noreferrer"><Code2 size={17} /> LeetCode <ExternalLink size={13} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a href="#home" className="brand footer-brand"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MANOJ<span> / PORTFOLIO</span></span></a>
        <span className="footer-copy">DESIGNED TO GROW · © {year} MANOJ</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/manoj--t/" target="_blank" rel="noreferrer" aria-label="Manoj on LinkedIn"><Linkedin size={17} /></a>
          <a href="https://leetcode.com/u/MANOJ_DEVELOPER/" target="_blank" rel="noreferrer" aria-label="Manoj on LeetCode"><Code2 size={17} /></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={17} /></a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
