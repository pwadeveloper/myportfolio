import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SOUND, loadSounds, playSound } from '../lib/sound'
import './PrintivoPage.css'

gsap.registerPlugin(ScrollTrigger)

// Research sticky notes: tilt, folded corner and glow are baked into the
// PNGs; each card carries its own hover sound from the kit. Array order maps
// to the layout slots — 1-3 down the left side, 4-6 down the right.
const INQUIRY_NOTES = [
  {
    src: '/images/projects/printivo/note-6.png',
    width: 327,
    height: 254,
    alt: 'Sticky note: users clearly want to know if they could get Printivo to create the designs for them and what that entails.',
    sound: SOUND.TYPE,
  },
  {
    src: '/images/projects/printivo/note-1.png',
    width: 327,
    height: 252,
    alt: 'Sticky note: users will like to be able to clearly see details on each product on the platform.',
    sound: SOUND.TAP,
  },
  {
    src: '/images/projects/printivo/note-4.png',
    width: 318,
    height: 224,
    alt: 'Sticky note: users keep calling to complete their orders over the phone and send files via WhatsApp.',
    sound: SOUND.NOTIFICATION,
  },
  {
    src: '/images/projects/printivo/note-5.png',
    width: 317,
    height: 232,
    alt: 'Sticky note from the tech team: we have to limit the frequency of orders being placed without print files.',
    sound: SOUND.TOGGLE_ON,
  },
  {
    src: '/images/projects/printivo/note-2.png',
    width: 328,
    height: 254,
    alt: 'Sticky note: the homepage needs to be less busy so that users can easily navigate it.',
    sound: SOUND.SWIPE,
  },
  {
    src: '/images/projects/printivo/note-3.png',
    width: 316,
    height: 221,
    alt: 'Sticky note: users complain about the search function on the website and the results it returns.',
    sound: SOUND.SELECT,
  },
]

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

      // ── Contextual inquiry: centered copy cascades up, then the sticky
      // notes materialize one by one in a random order — a reverse blur
      // dissolve, sharpening out of a heavy blur as they fade in.
      gsap.fromTo(
        '.printivo__inquiry-copy > *',
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__inquiry', start: 'top 62%' },
        },
      )
      gsap.fromTo(
        '.printivo__note',
        { opacity: 0, y: 26, filter: 'blur(30px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power2.out',
          stagger: { each: 0.32, from: 'random' },
          scrollTrigger: { trigger: '.printivo__inquiry', start: 'top 55%' },
        },
      )

      // ── Well defined goals: folder drifts in and keeps floating, the
      // heading/copy cascade up, then each goal list ticks through its items
      gsap.fromTo(
        '.printivo__folder',
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__goals', start: 'top 62%' },
          onComplete: () => {
            gsap.to('.printivo__folder', {
              y: '+=14',
              duration: 3.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          },
        },
      )
      gsap.fromTo(
        '.printivo__goals-heading, .printivo__goals-intro, .printivo__goals-footnote',
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.printivo__goals', start: 'top 45%' },
        },
      )
      gsap.utils.toArray<HTMLElement>('.printivo__goals-list').forEach((list, i) => {
        gsap.fromTo(
          list.querySelectorAll('h3, li'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.25 + i * 0.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.printivo__goals', start: 'top 45%' },
          },
        )
      })
    }, root)

    // Fetch the audio sprite early so the first hover plays without a hitch.
    loadSounds()

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

      <section className="printivo__inquiry" aria-label="Contextual inquiry research">
        <div className="printivo__inquiry-copy">
          <h2 className="printivo__inquiry-heading">....and some more research</h2>
          <p className="printivo__inquiry-label">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="6.4" />
              <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
              <path d="M12 2.2v3.1M12 18.7v3.1M2.2 12h3.1M18.7 12h3.1" />
            </svg>
            A bit of contextual Inquiry
          </p>
          <p>
            I observed the new users (participants off Twitter), to observe how they made use of
            the platform while asking them to think (speak) out loud as they navigated the
            platform. The task I gave them was to order either a business card, a face-mask or a
            mug (these are part of our most ordered products based on the data on our analytics).
          </p>
          <p>
            Overall I found out that there was a lot of difficulty in performing a simple end to
            end purchase on the platform and that had to be worked on.
          </p>
        </div>
        {INQUIRY_NOTES.map((note, i) => (
          <div className={`printivo__note printivo__note--${i + 1}`} key={note.sound}>
            <img
              className="printivo__note-img"
              src={note.src}
              alt={note.alt}
              width={note.width}
              height={note.height}
              loading="lazy"
              onMouseEnter={() => playSound(note.sound)}
            />
          </div>
        ))}
      </section>

      <section className="printivo__goals" aria-label="Well defined goals">
        {/* Frosted-glass folder built from layered divs: paper sheets sit
            behind a translucent front pocket whose backdrop-filter blurs
            them — stand-in until the real icon asset lands. */}
        <div className="printivo__folder" aria-hidden="true">
          <div className="printivo__folder-back" />
          <div className="printivo__folder-sheet printivo__folder-sheet--a" />
          <div className="printivo__folder-sheet printivo__folder-sheet--b" />
          <div className="printivo__folder-sheet printivo__folder-sheet--c" />
          <div className="printivo__folder-front" />
        </div>

        <h2 className="printivo__goals-heading">Well defined goals.</h2>

        <div className="printivo__goals-grid">
          <p className="printivo__goals-intro">
            When I was done with all my interviews, I compiled it into a UX audit and had a
            meeting with the Printivo team, we went over all the data and decided on goals for
            the redesign/rebuild that will help us increase platform value, grow the customer
            base and increase conversion and reduce bounce rate. Put simply we planned to:
          </p>
          <div className="printivo__goals-list">
            <h3>1.&ensp;Increase Conversion</h3>
            <ol>
              <li>Create a more intuitive and delightful design</li>
              <li>The new platform should convert leads to purchases</li>
              <li>The new platform should reduce churn/bounce rates</li>
            </ol>
          </div>
          <div className="printivo__goals-list">
            <h3>2.&ensp;Improve Customer Satisfaction</h3>
            <ol>
              <li>Quicker task completion</li>
              <li>Less User frustrations/confusion</li>
              <li>A more intuitive way of finding relevant information</li>
              <li>
                Improve delivery speed<span className="printivo__goals-star">*</span>
              </li>
            </ol>
          </div>
        </div>

        <p className="printivo__goals-footnote">
          <span className="printivo__goals-star">*</span>This was to improve off-platform
          experience and we ended up building infrastructure to help make this possible as well
          as scale our services.
        </p>
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
