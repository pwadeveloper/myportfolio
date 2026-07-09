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
          // a longer catch-up lag lets the springy eases settle with some inertia
          scrub: 1.1,
        },
      })
      timeline
        // the trailing dots resolve as the story starts moving
        .to('.printivo__quote-dots', { opacity: 0, duration: 0.08, ease: 'none' }, 0.05)
        // back.out overshoots past the resting line and settles — springy rise
        .fromTo(
          '.printivo__img--press',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.5, ease: 'back.out(1.8)' },
          0.1,
        )
        .fromTo(
          '.printivo__img--scholar',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.5, ease: 'back.out(2.2)' },
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

      // ── Role & Approach: copy reveals first, the team list follows on scroll
      gsap.fromTo(
        '.printivo__roles-copy > *',
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__roles', start: 'top 62%' },
        },
      )
      gsap.fromTo(
        '.printivo__team > *',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__team', start: 'top 78%' },
        },
      )

      // ── Project Timeline: panel rises with its mesh glow, bars stagger in
      gsap.fromTo(
        '.printivo__timeline-frame',
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__timeline', start: 'top 62%' },
        },
      )
      gsap.fromTo(
        '.printivo__tl-bar',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.printivo__timeline', start: 'top 45%' },
        },
      )

      // ── Research: both text columns cascade up, the eye video floats in
      gsap.fromTo(
        '.printivo__research-copy > *',
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__research', start: 'top 62%' },
        },
      )
      gsap.fromTo(
        '.printivo__research-video',
        { opacity: 0, y: 70, scale: 0.965 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__research', start: 'top 58%' },
        },
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

      <section className="printivo__roles" aria-label="Role, approach and team">
        <div className="printivo__roles-copy">
          <h2 className="printivo__roles-heading">My Role &amp; Approach</h2>
          <p>
            I was the lead product designer on this project, and I started by jumping on calls
            with folks from the marketing, customer care and tech department. I wanted to get a
            sense of what they had been dealing with so far, positive and negative feedback alike.
          </p>
          <p>
            I also got the marketing department to give me a list of our frequent customers so I
            could jump on a call with them to get feedback on their overall experience using the
            platform. A 2000 NGN coupon was approved to give as an incentive/reward to the
            customers who participated in my interview sessions.
          </p>
        </div>
        <div className="printivo__team">
          <p className="printivo__team-label">Team</p>
          <p><strong>1</strong> Product Designer (Me) 🥷</p>
          <p><strong>1</strong> Product Manager 👩🏽‍💼</p>
          <p><strong>2</strong> Front End Developers 🧑🏽‍💻 🧑🏽‍💻</p>
          <p><strong>2</strong> Backend Developers 🧑🏿‍💻 🧑🏿‍💻</p>
        </div>
      </section>

      <section className="printivo__timeline" aria-label="Project timeline">
        <div className="printivo__timeline-frame">
          <div className="printivo__timeline-glow" aria-hidden="true" />
          <div className="printivo__timeline-panel">
            <h2>Project Timeline</h2>
            <div className="printivo__tl-weeks" aria-hidden="true">
              <span>WK 1</span>
              <span>WK2</span>
              <span>WK3</span>
              <span>WK 4</span>
              <span>WK 5</span>
              <span>WK 6</span>
              <span>WK 7</span>
              <span>WK8</span>
              <span>WK9</span>
              <span>WK10-14</span>
            </div>
            <div className="printivo__tl-row">
              <span className="printivo__tl-bar" style={{ gridColumn: '1 / span 3' }}>
                Discovery Sessions / Problem Definition
              </span>
            </div>
            <div className="printivo__tl-row">
              <span className="printivo__tl-bar" style={{ gridColumn: '6 / span 5' }}>
                UX Audit of the existing platform
              </span>
              <span className="printivo__tl-bar" style={{ gridColumn: '13 / span 5' }}>
                High-Fidelity Prototype
              </span>
            </div>
            <div className="printivo__tl-row">
              <span
                className="printivo__tl-bar printivo__tl-bar--nowrap"
                style={{ gridColumn: '4 / span 6' }}
              >
                Research with the internal departments
              </span>
              <span className="printivo__tl-bar" style={{ gridColumn: '10 / span 3' }}>
                User flow
              </span>
              <span className="printivo__tl-bar" style={{ gridColumn: '17 / span 4' }}>
                Working with Developers
              </span>
            </div>
            <div className="printivo__tl-row">
              <span className="printivo__tl-bar" style={{ gridColumn: '5 / span 5' }}>
                Research with the platform users
              </span>
              <span className="printivo__tl-bar" style={{ gridColumn: '12 / span 3' }}>
                Explorations
              </span>
            </div>
            <div className="printivo__tl-row printivo__tl-row--empty" />
          </div>
        </div>
      </section>

      <section className="printivo__research" aria-label="Splitting the research participants">
        <div className="printivo__research-copy">
          <h2 className="printivo__research-heading">Splitting the research participants</h2>
          <p className="printivo__research-label">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h8A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 3 16.5z" />
              <path d="m16 10 4.1-2.4a.6.6 0 0 1 .9.6v7.6a.6.6 0 0 1-.9.6L16 14" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="8.2" r="3.2" />
              <path d="M3.6 19c.6-3 2.7-4.9 5.4-4.9s4.8 1.9 5.4 4.9" />
              <circle cx="16.6" cy="9.1" r="2.6" />
              <path d="M15.6 14.4c2.3.3 4.1 2 4.7 4.6" />
            </svg>
            Video Interviews with everyone
          </p>
          <p>
            As stated earlier, my research was internal and external, I aimed to understand how
            everyone interacted with the service both those who directly used it and those who
            served the users. So I jumped on various video calls for a couple of weeks just to get
            diverse insights.
          </p>
          <p>
            The tech department had the usual bugs to fix, such as a file not being attached to an
            order when the user request has been submitted for print, the customer care department
            kept getting calls from users calling to ask/confirm information they (the customer
            care reps) were sure was on the website already, or users complaining of getting the
            wrong results when they searched for a product (this was something we had to discuss
            in the tech department also).
          </p>
        </div>

        <video
          className="printivo__research-video"
          src="/vids/eyesplit.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="printivo__research-copy printivo__research-copy--right">
          <p>
            In addition to the customers I reached out to for interviews, I wanted to also observe
            people use the platform, so I sent out a tweet and got a handful of volunteers.
          </p>
          <p>
            My conversation with the customers revealed that they found the details on the product
            category page to be confusing and they also felt like they needed to be able to create
            designs themselves before they could use the platform, so they simply used the website
            to search for what they want to print before placing a call to customer care before
            sending their print file via WhatsApp (the customer care department confirmed this
            happens often).
          </p>
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
