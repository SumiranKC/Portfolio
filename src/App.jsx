import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown, ArrowUpRight, Asterisk, BrainCircuit, Brush, Check, Code2,
  Layers3, Mail, Menu, MoveRight, Sparkles, X,
} from 'lucide-react'

const projectCategories = ['All', 'Web Development', 'Graphic Design', 'ML / AI', 'Other']

const projects = [
  { id: '01', title: 'Commerce, Reimagined', category: 'Web Development', summary: 'A fast, accessible storefront concept with thoughtful product discovery and a frictionless checkout flow.', tags: ['React', 'Node.js', 'UX'], accent: 'coral', icon: Code2 },
  { id: '02', title: 'Northbound Identity', category: 'Graphic Design', summary: 'A flexible brand system built around bold typography, modular layouts, and a confident visual voice.', tags: ['Branding', 'Print', 'Figma'], accent: 'blue', icon: Brush },
  { id: '03', title: 'Vision QC', category: 'ML / AI', summary: 'A computer-vision concept that identifies manufacturing defects and surfaces clear quality insights.', tags: ['Python', 'PyTorch', 'CV'], accent: 'lime', icon: BrainCircuit },
  { id: '04', title: 'Money, Clearly', category: 'Other', summary: 'A personal-finance product concept that turns complex spending data into calm, actionable guidance.', tags: ['Product', 'Research', 'Strategy'], accent: 'yellow', icon: Sparkles },
  { id: '05', title: 'Afterdark Festival', category: 'Web Development', summary: 'An immersive event site with kinetic type, responsive schedules, and a playful ticket journey.', tags: ['React', 'Motion', 'CMS'], accent: 'purple', icon: Code2 },
  { id: '06', title: 'Signal / Noise', category: 'Graphic Design', summary: 'An editorial campaign exploring information overload through layered type and expressive composition.', tags: ['Editorial', 'Art Direction', 'Adobe'], accent: 'pink', icon: Brush },
  { id: '07', title: 'Ask Atlas', category: 'ML / AI', summary: 'A retrieval-augmented assistant concept designed to make complex internal knowledge easy to explore.', tags: ['LLM', 'RAG', 'FastAPI'], accent: 'cyan', icon: BrainCircuit },
  { id: '08', title: 'Open Components', category: 'Other', summary: 'A growing collection of inclusive interface patterns, documented for designers and developers alike.', tags: ['Open Source', 'A11y', 'Systems'], accent: 'orange', icon: Layers3 },
]

const skills = [
  { title: 'Build', detail: 'React, JavaScript, Node.js, APIs, responsive systems', icon: Code2 },
  { title: 'Design', detail: 'Brand identity, UI/UX, art direction, motion, prototyping', icon: Brush },
  { title: 'Intelligence', detail: 'Python, ML workflows, LLM applications, data storytelling', icon: BrainCircuit },
]

const experience = [
  { period: '2024 — Present', role: 'Your Current Role', company: 'Company Name · Melbourne, AU', detail: 'Add a concise overview of your responsibilities, the teams you collaborate with, and the value your work creates.' },
  { period: '2022 — 2024', role: 'Previous Role', company: 'Company Name · Location', detail: 'Describe a meaningful achievement, the products or campaigns you shaped, and the tools you used to deliver them.' },
  { period: '2020 — 2022', role: 'Earlier Role / Internship', company: 'Company Name · Location', detail: 'Show how this experience contributed to your craft, confidence, and multidisciplinary way of working.' },
]

const education = [
  { period: '2020 — 2024', title: 'Degree or Qualification', place: 'University or Institution Name', detail: 'Major / specialisation · Awards, societies, or a relevant capstone project.' },
  { period: '2024', title: 'Professional Certification', place: 'Learning Provider', detail: 'Add a focused course, certification, or bootcamp that strengthens your professional story.' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formSent, setFormSent] = useState(false)

  const visibleProjects = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    document.body.style.overflow = selectedProject || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedProject, menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSent(true)
    event.currentTarget.reset()
    window.setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top" onClick={closeMenu}><span>S</span> / PORTFOLIO</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-kicker"><Asterisk size={18} /> Multidisciplinary maker · Melbourne</div>
          <h1>I build <span>digital</span><br />things with <em>feeling.</em></h1>
          <div className="hero-bottom">
            <p>Web developer, graphic designer, and AI explorer creating useful experiences at the intersection of code, design, and curiosity.</p>
            <a className="circle-link" href="#work" aria-label="View selected work"><ArrowDown /></a>
          </div>
          <div className="hero-orbit" aria-hidden="true"><span>WEB</span><span>DESIGN</span><span>AI / ML</span><span>IDEAS</span></div>
        </section>

        <div className="ticker" aria-hidden="true"><div>AVAILABLE FOR GOOD IDEAS <Asterisk /> WEB DEVELOPMENT <Asterisk /> GRAPHIC DESIGN <Asterisk /> AI / ML <Asterisk /> CREATIVE TECHNOLOGY <Asterisk /> AVAILABLE FOR GOOD IDEAS <Asterisk /> WEB DEVELOPMENT <Asterisk /></div></div>

        <section className="work-section section-pad" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">01 / Selected work</p><h2>Different tools.<br />One point of view.</h2></div>
            <p className="section-intro">A cross-section of web, visual, intelligent, and experimental work. These sample cards are ready to be replaced with your real projects.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter projects">
            {projectCategories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => {
              const Icon = project.icon
              return (
                <article className={`project-card ${project.accent}`} key={project.id}>
                  <button className="project-visual" onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} project details`}>
                    <span className="project-number">{project.id}</span><Icon className="project-icon" strokeWidth={1.25} /><span className="project-open"><ArrowUpRight /></span>
                  </button>
                  <div className="project-copy">
                    <div className="project-meta"><span>{project.category}</span><span>Concept / Case study</span></div>
                    <h3>{project.title}</h3><p>{project.summary}</p>
                    <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-stamp" aria-hidden="true"><Sparkles /><span>THINK · MAKE · REFINE ·</span></div>
          <div className="about-copy">
            <p className="eyebrow">02 / About me</p>
            <h2>Part developer.<br />Part designer.<br /><em>Fully curious.</em></h2>
            <div className="about-body">
              <p>I care about the full shape of an idea: how it works, how it looks, and how it makes someone feel. My practice moves between interfaces, visual identities, and intelligent products.</p>
              <p>Whether I’m refining a design system or prototyping with machine learning, I bring the same mix of clarity, craft, and experimentation to the work.</p>
            </div>
            <a className="text-link" href="mailto:hello@yourname.com?subject=Résumé request">Request résumé <Mail size={18} /></a>
          </div>
        </section>

        <section className="skills-section section-pad">
          <p className="eyebrow">What I bring</p>
          <div className="skill-list">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return <div className="skill-row" key={skill.title}><span className="skill-index">0{index + 1}</span><Icon /><h3>{skill.title}</h3><p>{skill.detail}</p></div>
            })}
          </div>
        </section>

        <section className="journey-section section-pad" id="experience">
          <div className="section-heading journey-heading">
            <div><p className="eyebrow">03 / The journey</p><h2>Experience &<br />education.</h2></div>
            <p className="section-intro">A place for the roles, lessons, and turning points that shaped how you work today.</p>
          </div>
          <div className="history-columns">
            <div className="history-column">
              <div className="history-label"><span>Work history</span><span>{experience.length} roles</span></div>
              {experience.map((item) => <article className="history-item" key={`${item.period}-${item.role}`}><span className="history-period">{item.period}</span><div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.detail}</p></div></article>)}
            </div>
            <div className="history-column education-column">
              <div className="history-label"><span>Education</span><span>{education.length} chapters</span></div>
              {education.map((item) => <article className="history-item" key={`${item.period}-${item.title}`}><span className="history-period">{item.period}</span><div><h3>{item.title}</h3><h4>{item.place}</h4><p>{item.detail}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">04 / Get in touch</p><h2>Have an idea?<br /><em>Let’s make it real.</em></h2>
            <p>Tell me what you’re building, what you need, or simply say hello. I’d love to hear from you.</p>
            <a href="mailto:hello@yourname.com">hello@yourname.com <ArrowUpRight size={18} /></a>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name<input type="text" name="name" placeholder="Your name" required /></label>
            <label>Email<input type="email" name="email" placeholder="you@example.com" required /></label>
            <label>What can we make together?<textarea name="message" placeholder="A little about your project..." rows="4" required /></label>
            <button type="submit">Send message <MoveRight /></button>
            {formSent && <p className="form-success" role="status"><Check size={18} /> Thanks! Connect this form to Formspree or your API to receive submissions.</p>}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span>S</span> / PORTFOLIO</a>
        <p>© {new Date().getFullYear()} · Designed & built with care.</p>
        <div className="socials"><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><span>GH</span></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span>in</span></a><a href="mailto:hello@yourname.com" aria-label="Email"><Mail /></a></div>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}>
          <div className={`project-modal ${selectedProject.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X /></button>
            <p>{selectedProject.category} · {selectedProject.id}</p><h2 id="project-modal-title">{selectedProject.title}</h2><p className="modal-summary">{selectedProject.summary}</p>
            <div className="tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-note"><strong>Your case study goes here.</strong><span>Add the challenge, your process, final outcome, project images, and live links when you replace this sample project.</span></div>
            <button className="modal-contact" onClick={() => { setSelectedProject(null); window.location.hash = 'contact' }}>Discuss a similar project <ArrowUpRight /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
