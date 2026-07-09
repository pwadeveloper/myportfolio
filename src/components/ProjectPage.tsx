import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS, type Project } from '../data/projects'
import './ProjectPage.css'

/** Live clock pinned to Mudia's timezone (Kaduna — WAT, UTC+1). */
function useKadunaClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Lagos',
  }).format(now)
}

interface ProjectPageProps {
  project: Project
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const time = useKadunaClock()
  const index = PROJECTS.indexOf(project) + 1
  const number = String(index).padStart(2, '0')

  return (
    <article className="project">
      <header className="project__topbar">
        <a className="project__brand" href="#">
          Mudia Imasuen<sup>®</sup>
        </a>
        <div className="project__topbar-meta">
          <span>Project No. {number}</span>
          <span>2025</span>
        </div>
        <nav className="project__nav" aria-label="Site">
          <a href="#">Home</a>
          <a href="#">Work</a>
          <a href="#">Archive</a>
        </nav>
        <a className="project__contact" href="mailto:sirmudiadavid@gmail.com">
          Get in Touch
        </a>
      </header>

      <div className="project__heading">
        <div>
          <p className="project__number">/{number}</p>
          <motion.h1
            className="project__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 32 }}
          >
            {project.name}
          </motion.h1>
        </div>
        <div className="project__meta">
          <div>
            <p className="project__meta-label">Part {index}/{PROJECTS.length}</p>
            <p>{project.category}</p>
          </div>
          <div>
            <p className="project__meta-label">Design &amp; Direction</p>
            <p>Mudia Imasuen</p>
          </div>
          <a className="project__cta" href={project.url === `#${project.slug}` ? '#' : project.url}>
            View Live Project
          </a>
        </div>
      </div>

      <motion.img
        className="project__hero"
        src={project.imageWide}
        alt={`${project.name} hero`}
        width={1600}
        height={640}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <footer className="project__footer">
        <p className="project__location">
          Kaduna, Nigeria
          <br />
          {time} (+1 WAT)
        </p>
        <div className="project__intro">
          <p>
            A visual journey through {project.name} — {project.category.toLowerCase()}. Here, every
            screen becomes a reflection of intent: a dialogue between vision and form.
          </p>
          <p>
            In these pages, ideas take shape through color and texture, capturing the quiet rhythm
            of the work. Each piece stands as both question and answer — an exploration of what
            design reveals where words cannot. (Placeholder copy — replace with the real case
            study.)
          </p>
        </div>
      </footer>
    </article>
  )
}
