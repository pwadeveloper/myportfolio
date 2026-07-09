import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, type Project } from '../data/projects'
import './ProjectPage.css'

gsap.registerPlugin(ScrollTrigger)

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
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      // ── Quote slide: pin it, raise the history images, then blur the text away
      const quote = root.querySelector('.project__quote')
      if (quote) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: quote,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.6,
          },
        })
        timeline
          .fromTo(
            quote.querySelectorAll('.project__quote-img'),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.55, stagger: 0.12, ease: 'none' },
          )
          .to(
            quote.querySelector('.project__quote-text'),
            { filter: 'blur(16px)', opacity: 0, duration: 0.35, ease: 'none' },
            0.62,
          )
      }

      // ── Case-study slides: content rises in, then blur-fades out past the viewport
      root.querySelectorAll<HTMLElement>('.project__section').forEach((section) => {
        const inner = section.querySelectorAll('.project__section-side, .project__section-main, .project__stats')
        gsap.fromTo(
          inner,
          { opacity: 0, y: 64 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 78%', end: 'top 45%', scrub: 0.5 },
          },
        )
        gsap.to(inner, {
          filter: 'blur(14px)',
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: { trigger: section, start: 'bottom 38%', end: 'bottom 8%', scrub: 0.5 },
        })

        const figure = section.querySelector('.project__section-figure img')
        if (figure) {
          gsap.fromTo(
            figure,
            { yPercent: 18, scale: 0.94, opacity: 0 },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: figure, start: 'top 92%', end: 'top 45%', scrub: 0.5 },
            },
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [project])

  return (
    <article className="project" ref={rootRef}>
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
            <p className="project__meta-label">{project.role ?? 'Design & Direction'}</p>
            <p>Mudia Imasuen</p>
          </div>
          {project.liveUrl && (
            <a className="project__cta" href={project.liveUrl} target="_blank" rel="noopener">
              View Live Project
            </a>
          )}
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
          {project.intro ? (
            project.intro.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)
          ) : (
            <>
              <p>
                A visual journey through {project.name} — {project.category.toLowerCase()}. Here,
                every screen becomes a reflection of intent: a dialogue between vision and form.
              </p>
              <p>
                In these pages, ideas take shape through color and texture, capturing the quiet
                rhythm of the work. Each piece stands as both question and answer — an exploration
                of what design reveals where words cannot. (Placeholder copy — replace with the
                real case study.)
              </p>
            </>
          )}
        </div>
      </footer>

      {project.slideIntro && (
        <section className="project__quote" aria-label={`${project.name} introduction`}>
          <p className="project__quote-label">{project.name}</p>
          <h2 className="project__quote-text">{project.slideIntro.text}</h2>
          <div className="project__quote-images">
            {project.slideIntro.images.map((image) => (
              <img
                key={image.src}
                className="project__quote-img"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
        </section>
      )}

      {project.sections && (
        <div className="project__body">
          {project.sections.map((section, i) => (
            <section className="project__section" key={section.heading}>
              <div className="project__section-side">
                <p className="project__section-index">/{String(i + 1).padStart(2, '0')}</p>
                <p className="project__section-kicker">{section.kicker}</p>
              </div>
              <div className="project__section-main">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
              {section.image && (
                <figure className="project__section-figure">
                  <img src={section.image.src} alt={section.image.alt} loading="lazy" />
                  {section.image.caption && <figcaption>{section.image.caption}</figcaption>}
                </figure>
              )}
            </section>
          ))}

          {project.stats && (
            <section className="project__section project__section--stats">
              <div className="project__section-side">
                <p className="project__section-index">/{String(project.sections.length + 1).padStart(2, '0')}</p>
                <p className="project__section-kicker">Results</p>
              </div>
              <div className="project__stats">
                <div>
                  <h3>{project.stats.beforeLabel}</h3>
                  <ul>
                    {project.stats.before.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="project__stats-after">
                  <h3>{project.stats.afterLabel}</h3>
                  <ul>
                    {project.stats.after.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <p className="project__back">
            <a href="#">← Return to selected works</a>
          </p>
        </div>
      )}

      {project.slideIntro && (
        <img
          className="project__cmyk"
          src="/images/cmyk-strip.svg"
          alt=""
          aria-hidden="true"
          width={96}
          height={14}
        />
      )}
    </article>
  )
}
