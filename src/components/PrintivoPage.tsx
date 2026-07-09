import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PrintivoPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function PrintivoPage() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.printivo__slide',
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.6,
        },
      })
      timeline
        // the trailing dots resolve as the story starts moving
        .to('.printivo__quote-dots', { opacity: 0, duration: 0.08, ease: 'none' }, 0.05)
        .fromTo(
          '.printivo__img--press',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.5, ease: 'none' },
          0.1,
        )
        .fromTo(
          '.printivo__img--scholar',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.5, ease: 'none' },
          0.22,
        )
        // text blur-fades away to make way for the next section
        .to(
          '.printivo__quote',
          { filter: 'blur(16px)', opacity: 0, duration: 0.28, ease: 'none' },
          0.72,
        )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <article className="printivo" ref={rootRef}>
      <header className="printivo__topbar">
        <a className="printivo__brand" href="#">
          Mudia Imasuen<sup>®</sup>
        </a>
        <span className="printivo__project-no">Project No. 01</span>
        <nav className="printivo__nav" aria-label="Site">
          <a href="#">Home</a>
          <a href="#">Work</a>
          <a href="#">Archive</a>
        </nav>
        <a className="printivo__contact" href="mailto:sirmudiadavid@gmail.com">
          Get in Touch
        </a>
      </header>

      <p className="printivo__label">Printivo</p>

      <section className="printivo__slide" aria-label="Printivo introduction">
        <h1 className="printivo__quote">
          It is common knowledge how much print technology changed the world.
          <span className="printivo__quote-dots">..</span>
        </h1>
        <div className="printivo__images">
          <img
            className="printivo__img printivo__img--scholar"
            src="/images/projects/printivo/history-scholar.webp"
            alt="A scholar reading among books in a 17th-century study"
            width={662}
            height={593}
          />
          <img
            className="printivo__img printivo__img--press"
            src="/images/projects/printivo/history-press.webp"
            alt="Engraving of an early printing workshop"
            width={1258}
            height={593}
          />
        </div>
      </section>

      <img
        className="printivo__cmyk"
        src="/images/cmyk-strip.svg"
        alt=""
        aria-hidden="true"
        width={96}
        height={14}
      />
    </article>
  )
}
