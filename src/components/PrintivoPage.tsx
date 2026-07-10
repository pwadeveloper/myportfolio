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

// ── Flow slide: heading scramble + the Miro flowchart ───────
const FLOW_HEADING_FROM = 'Worked on a flow together'
const FLOW_HEADING_TO = 'and then we cleaned it up'

/* Scroll-scrubbed text scramble: characters resolve left to right while the
   unresolved tail shimmers through random glyphs. */
const SCRAMBLE_GLYPHS = 'abcdefghijklmnopqrstuvwxyz'
function scrambleText(from: string, to: string, p: number) {
  if (p <= 0) return from
  if (p >= 1) return to
  const len = Math.round(from.length + (to.length - from.length) * p)
  const resolved = Math.floor(p * 1.15 * to.length)
  let out = ''
  for (let i = 0; i < len; i++) {
    const target = i < to.length ? to[i] : ''
    if (i < resolved) out += target
    else if (target === ' ' || from[i] === ' ') out += ' '
    else out += SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0]
  }
  return out
}

/* The collaborative Miro flowchart, hand-placed on a 1920x570 stage (the
   design frame's flowchart region). Coordinates are px in that space. */
const FLOW_NODES: Array<{
  label: string
  x: number
  y: number
  w: number
  variant: 'cream' | 'light' | 'end'
  diamond?: boolean
  icon?: boolean
}> = [
  { label: 'Printivo.com', x: 242, y: 7, w: 185, variant: 'cream', icon: true },
  { label: 'Categories', x: 305, y: 115, w: 110, variant: 'light' },
  { label: 'Products', x: 307, y: 195, w: 89, variant: 'light' },
  { label: 'Select Product', x: 452, y: 159, w: 137, variant: 'light' },
  { label: 'Design Decision', x: 630, y: 101, w: 156, variant: 'cream', diamond: true },
  { label: 'Checkout Page', x: 962, y: 140, w: 143, variant: 'light' },
  { label: 'Contact/Shipping Details', x: 1126, y: 216, w: 168, variant: 'cream' },
  { label: 'Make Payment', x: 1330, y: 227, w: 140, variant: 'cream' },
  { label: 'Success', x: 1504, y: 227, w: 82, variant: 'cream' },
  { label: 'End', x: 1683, y: 288, w: 47, variant: 'end' },
  { label: 'Upload Design File', x: 628, y: 323, w: 172, variant: 'cream' },
  { label: 'Request For Design', x: 628, y: 390, w: 177, variant: 'cream' },
  { label: 'Design With Our Tool', x: 628, y: 456, w: 191, variant: 'cream' },
  { label: 'Pay Now, Upload Later', x: 628, y: 523, w: 207, variant: 'cream' },
  { label: 'Write Design Requirements', x: 858, y: 370, w: 133, variant: 'cream' },
  { label: 'Create Design', x: 858, y: 456, w: 136, variant: 'cream' },
  { label: 'Select Payment Option', x: 1126, y: 306, w: 147, variant: 'cream' },
]

/* Connector curves in the same 1920x570 space; pathLength=1 in the JSX lets
   the scrub timeline draw them with a plain dashoffset tween. */
const FLOW_EDGES = [
  'M334 54 C334 92, 360 96, 360 115',
  'M360 161 C360 172, 352 180, 352 195',
  'M396 218 C424 218, 426 182, 452 182',
  'M589 182 C606 182, 613 183, 630 183',
  'M708 266 C708 300, 664 330, 628 344',
  'M708 266 C702 330, 664 396, 628 412',
  'M708 266 C696 350, 660 462, 628 478',
  'M708 266 C692 380, 656 528, 628 545',
  'M800 345 C890 340, 930 205, 962 178',
  'M805 413 C828 413, 836 404, 858 402',
  'M991 385 C1040 368, 1046 240, 1024 186',
  'M819 479 C836 479, 840 479, 858 479',
  'M994 479 C1064 468, 1064 260, 1033 186',
  'M835 546 C1010 540, 1072 300, 1043 186',
  'M1105 163 C1160 168, 1184 186, 1210 216',
  'M1033 186 C1046 268, 1088 336, 1126 342',
  'M1200 286 C1200 292, 1200 300, 1200 306',
  'M1294 251 C1308 251, 1316 250, 1330 250',
  'M1470 250 C1483 250, 1491 250, 1504 250',
  'M1586 250 C1636 254, 1676 268, 1706 288',
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

      // ── Flow slide: pinned — the paragraph blurs away, the heading
      // scrambles into the punchline, and the flowchart draws itself in
      const flowHeading = root.querySelector<HTMLElement>('.printivo__flow-heading')
      const scramble = { p: 0 }
      const flowTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.printivo__flow',
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1,
        },
      })
      flowTl
        .to(
          '.printivo__flow-copy',
          { opacity: 0, filter: 'blur(14px)', duration: 0.2, ease: 'none' },
          0.06,
        )
        .to(
          scramble,
          {
            p: 1,
            duration: 0.3,
            ease: 'none',
            onUpdate: () => {
              if (flowHeading) {
                flowHeading.textContent = scrambleText(
                  FLOW_HEADING_FROM,
                  FLOW_HEADING_TO,
                  scramble.p,
                )
              }
            },
          },
          0.16,
        )
        .to(
          '.printivo__flow-miro',
          { opacity: 0, filter: 'blur(12px)', duration: 0.24, ease: 'none' },
          0.34,
        )
        .fromTo(
          '.printivo__flow-lines path',
          { strokeDashoffset: 1, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.4, stagger: 0.012, ease: 'none' },
          0.4,
        )
        .fromTo(
          '.printivo__flow-node',
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.018, ease: 'power2.out' },
          0.48,
        )
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
        <div className="printivo__goals-copy">
          <h2 className="printivo__goals-heading">Well defined goals.</h2>
          <p className="printivo__goals-intro">
            When I was done with all my interviews, I compiled it into a UX audit and had a
            meeting with the Printivo team, we went over all the data and decided on goals for
            the redesign/rebuild that will help us increase platform value, grow the customer
            base and increase conversion and reduce bounce rate. Put simply we planned to:
          </p>
        </div>

        <img
          className="printivo__folder"
          src="/images/projects/printivo/folder-image.png"
          alt=""
          aria-hidden="true"
          width={271}
          height={220}
          loading="lazy"
        />

        <div className="printivo__goals-lists">
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

      <section className="printivo__flow" aria-label="Worked on a flow together">
        <div className="printivo__flow-head">
          <h2 className="printivo__flow-heading">{FLOW_HEADING_FROM}</h2>
          <p className="printivo__flow-copy">
            We had a series of meetings where we then worked on different iterations of the user
            flow together, here is one of our collaborative flows on Miro that shows a proposed
            end to end actions of a customer who completes an order.
          </p>
        </div>
        <div className="printivo__flow-stage" aria-hidden="true">
          <img
            className="printivo__flow-miro"
            src="/images/projects/printivo/initial-exploration.png"
            alt=""
            width={6241}
            height={1191}
            loading="lazy"
          />
          <svg className="printivo__flow-lines" viewBox="0 0 1920 570" preserveAspectRatio="none">
            {FLOW_EDGES.map((d) => (
              <path key={d} d={d} pathLength={1} />
            ))}
          </svg>
          {FLOW_NODES.map((n) => (
            <span
              key={n.label}
              className={`printivo__flow-node printivo__flow-node--${n.variant}${
                n.diamond ? ' printivo__flow-node--diamond' : ''
              }`}
              style={{ left: `${n.x / 19.2}%`, top: `${n.y / 5.7}%`, width: `${n.w / 19.2}%` }}
            >
              {n.icon && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c-2.6 2.4-4 5.6-4 9s1.4 6.6 4 9c2.6-2.4 4-5.6 4-9s-1.4-6.6-4-9z" />
                </svg>
              )}
              {n.diamond ? <span>{n.label}</span> : n.label}
            </span>
          ))}
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
