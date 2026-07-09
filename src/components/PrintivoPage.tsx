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

      // ── Story section: copy reveals up, images float in with a lasting drift
      gsap.fromTo(
        '.printivo__story-copy > *',
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__story', start: 'top 62%' },
        },
      )
      gsap.utils.toArray<HTMLElement>('.printivo__story-img').forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 90 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: 0.25 + i * 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.printivo__story', start: 'top 55%' },
            onComplete: () => {
              gsap.to(img, {
                y: '+=12',
                duration: 3.2 + i * 0.9,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
              })
            },
          },
        )
      })
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

      <section className="printivo__story" aria-label="Printivo background and goal">
        <img
          className="printivo__story-img printivo__story-img--press"
          src="/images/projects/printivo/press-dither.png"
          alt="Dithered illustration of a Gutenberg-style printing press"
          width={154}
          height={190}
        />
        <div className="printivo__story-copy">
          <p>
            A good point as any in history to observe would be the Gutenberg printing press of
            1440. Despite the popularity of print technology and its obvious positive effects in
            the past centuries, there is still a lot of work to be done in making this technology
            easily accessible to individuals and small businesses in Nigeria, especially when they
            have no desire to compromise on quality while working within a reasonable budget.
          </p>
          <p>
            In 2003, Printivo.com, Nigeria&rsquo;s first web to print platform was launched to give
            everyone easy access to quality prints for stationaries and merchandise. Over the
            years, it has successfully served over 10,000 customers, but like all things, there is
            always room for improvement.
          </p>
          <div className="printivo__goal">
            <h2>The Goal?</h2>
            <p>Improve the digital experience of new and existing Printivo customers.</p>
          </div>
        </div>
        <img
          className="printivo__story-img printivo__story-img--printer"
          src="/images/projects/printivo/large-format-printer.jpg"
          alt="Large-format printer producing colorful banners"
          width={413}
          height={338}
        />
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
