import { useEffect, useState } from 'react'
import './Hero.css'

const SELECTED_WORK = [
  'Printivo',
  'Speedy Transfer',
  'Welkum-U',
  'Invoice, by bloc',
  'WorkWise',
  'TravelWahoo',
]

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tzAbbr =
    new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? timeZone

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now)

  return `{${tzAbbr} — ${time}}`
}

export default function Hero() {
  const clock = useClock()

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__frame">
        <h1 className="hero__headline">
          MUDIA IMASUEN, FILMMAKER
          <br />
          &amp; <span className="hero__headline--fat">DESIGNER</span> BASED IN
          <br />
          KADUNA
        </h1>

        <img
          className="hero__portrait"
          src="/images/portrait-mosaic.png"
          alt="Mosaic portrait of Mudia Imasuen"
          width={497}
          height={676}
        />

        <div className="hero__work">
          <p className="hero__label">Selected work</p>
          <ul className="hero__work-list">
            {SELECTED_WORK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="hero__clock">{clock}</p>
      </div>
    </section>
  )
}
