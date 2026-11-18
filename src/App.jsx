import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  ArrowDown, ArrowUpRight, Asterisk, Check, Mail, Menu, MoveRight, Sparkles, X,
} from 'lucide-react'
import {
  getAbout, getContact, getEducation, getExperience, getFooter, getHero, getNavigation,
  getProfile, getProjectCategories, getProjectsByCategory, getProjectsSection, getSkills, getTicker,
} from './data/portfolioData.js'
import { getIcon } from './data/icons.js'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A11 11 0 0 1 12 6.13c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05a4.45 4.45 0 0 1 1.19 3.09c0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark() {
  return <span>in</span>
}

/** Footer social icons, keyed by the `platform` value used in portfolio.json. */
const socialIcons = { github: GitHubIcon, linkedin: LinkedInMark }

/** How styled heading segments in portfolio.json are rendered (CSS targets these tags). */
const segmentTags = { highlight: 'span', emphasis: 'em' }

/**
 * Renders a heading from portfolio.json. `lines` is an array of lines (joined with <br />);
 * each line is a string, a segment, or an array of strings/segments, where a segment is
 * `{ "text": "...", "style": "highlight" | "emphasis" }`.
 */
function RichText({ lines }) {
  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {[].concat(line).map((segment, segmentIndex) => {
        if (typeof segment === 'string') return <Fragment key={segmentIndex}>{segment}</Fragment>
        const Tag = segmentTags[segment.style] ?? Fragment
        return <Tag key={segmentIndex}>{segment.text}</Tag>
      })}
    </Fragment>
  ))
}

function App() {
  const [activeCategory, setActiveCategory] = useState(getProjectCategories()[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formSent, setFormSent] = useState(false)

  const profile = getProfile()
  const navigation = getNavigation()
  const hero = getHero()
  const ticker = getTicker()
  const projectsSection = getProjectsSection()
  const projectCategories = getProjectCategories()
  const about = getAbout()
  const skills = getSkills()
  const experience = getExperience()
  const education = getEducation()
  const contact = getContact()
  const footer = getFooter()

  // The ticker repeats its leading phrases so the strip stays filled while it scrolls.
  const tickerPhrases = [...ticker, ...ticker.slice(0, 2)]

  const visibleProjects = useMemo(() => getProjectsByCategory(activeCategory), [activeCategory])

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
        <a className="brand" href="#top" aria-label="Back to top" onClick={closeMenu}><span>{profile.initial}</span> {profile.brandLabel}</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navigation.links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a className="nav-cta" href={navigation.cta.href} onClick={closeMenu}>{navigation.cta.label} <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-kicker"><Asterisk size={18} /> {hero.kicker}</div>
          <h1><RichText lines={hero.heading} /></h1>
          <div className="hero-bottom">
            <p>{hero.intro}</p>
            <a className="circle-link" href="#work" aria-label="View selected work"><ArrowDown /></a>
          </div>
          <div className="hero-orbit" aria-hidden="true">{hero.orbitWords.map((word) => <span key={word}>{word}</span>)}</div>
        </section>

        <div className="ticker" aria-hidden="true"><div>{tickerPhrases.map((phrase, index) => <Fragment key={index}>{index > 0 && ' '}{phrase} <Asterisk /></Fragment>)}</div></div>

        <section className="work-section section-pad" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">{projectsSection.eyebrow}</p><h2><RichText lines={projectsSection.heading} /></h2></div>
            <p className="section-intro">{projectsSection.intro}</p>
          </div>
          <div className="filters" role="group" aria-label="Filter projects">
            {projectCategories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => {
              const Icon = getIcon(project.icon)
              return (
                <article className={`project-card ${project.accent}`} key={project.id}>
                  <button className="project-visual" onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} project details`}>
                    <span className="project-number">{project.id}</span><Icon className="project-icon" strokeWidth={1.25} /><span className="project-open"><ArrowUpRight /></span>
                  </button>
                  <div className="project-copy">
                    <div className="project-meta"><span>{project.category}</span><span>{project.type}</span></div>
                    <h3>{project.title}</h3><p>{project.summary}</p>
                    <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-stamp" aria-hidden="true"><Sparkles /><span>{about.stamp}</span></div>
          <div className="about-copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2><RichText lines={about.heading} /></h2>
            <div className="about-body">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(about.resume.emailSubject)}`}>{about.resume.label} <Mail size={18} /></a>
          </div>
        </section>

        <section className="skills-section section-pad">
          <p className="eyebrow">{skills.eyebrow}</p>
          <div className="skill-list">
            {skills.items.map((skill, index) => {
              const Icon = getIcon(skill.icon)
              return <div className="skill-row" key={skill.title}><span className="skill-index">{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{skill.title}</h3><p>{skill.description}</p></div>
            })}
          </div>
        </section>

        <section className="journey-section experience-section section-pad" id="experience">
          <div className="section-heading journey-heading">
            <div><p className="eyebrow">{experience.eyebrow}</p><h2><RichText lines={experience.heading} /></h2></div>
            <p className="section-intro">{experience.intro}</p>
          </div>
          <div className="history-column history-wide">
            <div className="history-label"><span>{experience.listLabel}</span><span>{experience.items.length} {experience.countLabel}</span></div>
            {experience.items.map((item) => <article className="history-item" key={`${item.period}-${item.role}`}><span className="history-period">{item.period}</span><div><h3>{item.role}</h3><h4>{[item.company, item.location].filter(Boolean).join(' · ')}</h4><p>{item.description}</p></div></article>)}
          </div>
        </section>

        <section className="education-section section-pad" id="education">
          <div className="section-heading journey-heading">
            <div><p className="eyebrow">{education.eyebrow}</p><h2><RichText lines={education.heading} /></h2></div>
            <p className="section-intro">{education.intro}</p>
          </div>
          <div className="history-column history-wide">
            <div className="history-label"><span>{education.listLabel}</span><span>{education.items.length} {education.countLabel}</span></div>
            {education.items.map((item) => <article className="history-item" key={`${item.period}-${item.degree}`}><span className="history-period">{item.period}</span><div><h3>{item.degree}</h3><h4>{item.college}</h4><p>{item.description}</p></div></article>)}
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">{contact.eyebrow}</p><h2><RichText lines={contact.heading} /></h2>
            <p>{contact.intro}</p>
            <a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={18} /></a>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>{contact.form.nameLabel}<input type="text" name="name" placeholder={contact.form.namePlaceholder} required /></label>
            <label>{contact.form.emailLabel}<input type="email" name="email" placeholder={contact.form.emailPlaceholder} required /></label>
            <label>{contact.form.messageLabel}<textarea name="message" placeholder={contact.form.messagePlaceholder} rows="4" required /></label>
            <button type="submit">{contact.form.submitLabel} <MoveRight /></button>
            {formSent && <p className="form-success" role="status"><Check size={18} /> {contact.form.successMessage}</p>}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span>{profile.initial}</span> {profile.brandLabel}</a>
        <p>© {new Date().getFullYear()} · {footer.tagline}</p>
        <div className="socials">
          {footer.socials.map((social) => {
            const SocialIcon = socialIcons[social.platform]
            return <a key={social.url} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>{SocialIcon ? <SocialIcon /> : social.label}</a>
          })}
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
        </div>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}>
          <div className={`project-modal ${selectedProject.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X /></button>
            <p>{selectedProject.category} · {selectedProject.id}</p><h2 id="project-modal-title">{selectedProject.title}</h2><p className="modal-summary">{selectedProject.summary}</p>
            <div className="tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-note"><strong>{projectsSection.modal.noteTitle}</strong><span>{projectsSection.modal.noteText}</span></div>
            <button className="modal-contact" onClick={() => { setSelectedProject(null); window.location.hash = 'contact' }}>{projectsSection.modal.contactLabel} <ArrowUpRight /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
