'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function WeddingPage() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const dividerBgRef = useRef<HTMLDivElement>(null)
  const sectionParallaxRef = useRef<HTMLDivElement>(null)

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleParallax = () => {
      const scrollY = window.scrollY

      if (heroBgRef?.current) {
        heroBgRef.current.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`
      }

      if (dividerBgRef?.current) {
        const dividerSection = dividerBgRef.current.closest('.image-divider')
        if (dividerSection) {
          const rect = dividerSection.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top / window.innerHeight - 0.5) * 60
            dividerBgRef.current.style.transform = `translateY(${offset}px)`
          }
        }
      }

      if (sectionParallaxRef?.current) {
        const sec = sectionParallaxRef.current.closest('.section--image')
        if (sec) {
          const rect = sec.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top / window.innerHeight - 0.5) * 50
            sectionParallaxRef.current.style.transform = `translateY(${offset}px)`
          }
        }
      }
    }
    window.addEventListener('scroll', handleParallax, { passive: true })
    handleParallax()
    return () => window.removeEventListener('scroll', handleParallax)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate], .timeline-item, .address-card, .info-item')
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry?.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el: Element) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav className={`main-nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollToSection('willkommen')}>
            ☘ Alte Wassermühle
          </button>
          <button
            className="nav-toggle"
            aria-label="Menü öffnen"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links${mobileMenuOpen ? ' open' : ''}`}>
            <li><button onClick={() => scrollToSection('willkommen')}>Willkommen</button></li>
            <li><button onClick={() => scrollToSection('ort-zeit')}>Ort &amp; Zeit</button></li>
            <li><button onClick={() => scrollToSection('ablauf')}>Ablauf</button></li>
            <li><button onClick={() => scrollToSection('adressen')}>Adressen</button></li>
            <li><button onClick={() => scrollToSection('infos')}>Infos</button></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="willkommen" className="hero">
        <div
          ref={heroBgRef}
          className="hero-bg"
          style={{ backgroundImage: "url('/images/01_hero_watermill.jpg')" }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-script">Wir heiraten</p>
          <h1 className="hero-title">Alte Wassermühle</h1>
          <div className="hero-divider">
            <svg width="120" height="20" viewBox="0 0 120 20">
              <path d="M0 10 Q30 0 60 10 Q90 20 120 10" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <p className="hero-date">26. Juni 2026 · Mauterndorf</p>
          <button className="hero-btn" onClick={() => scrollToSection('ort-zeit')}>
            Mehr erfahren
          </button>
        </div>
        <div className="scroll-hint">
          <svg width="24" height="36" viewBox="0 0 24 36">
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="#fff" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="10" r="2" fill="#fff" className="scroll-dot" />
          </svg>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="welcome-text" className="section section--cream">
        <div className="container">
          <div className="section-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" stroke="#8b7355" strokeWidth="1.5" />
              <path d="M24 12v24M12 24h24" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="24" cy="24" r="6" stroke="#c9a96e" strokeWidth="1.5" />
            </svg>
          </div>
          <h2 className="section-title">Herzlich Willkommen</h2>
          <p className="section-subtitle">Liebe Familie, liebe Freunde</p>
          <div className="welcome-text">
            <p>Wir freuen uns von ganzem Herzen, euch zu unserem besonderen Tag einladen zu dürfen. An einem Ort, der so zeitlos und romantisch ist wie unsere Liebe – der Alten Wassermühle.</p>
            <p>Zwischen dem sanften Rauschen des Wassers und der Schönheit der Salzburger Berge möchten wir mit euch gemeinsam feiern, lachen und unvergessliche Erinnerungen schaffen.</p>
            <p>Auf dieser Seite findet ihr alle wichtigen Informationen rund um unseren großen Tag. Wir können es kaum erwarten, diesen Moment mit euch zu teilen!</p>
          </div>
        </div>
      </section>

      {/* Location & Time */}
      <section id="ort-zeit" className="section section--image">
        <div
          ref={sectionParallaxRef}
          className="section-parallax"
          style={{ backgroundImage: "url('/images/04_mauterndorf_lungau.jpg')" }}
        />
        <div className="section-parallax-overlay" />
        <div className="container">
          <h2 className="section-title section-title--light">Ort &amp; Zeit</h2>
          <div className="cards-row">
            <div className="card card--glass">
              <div className="card-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="5" y="8" width="30" height="27" rx="3" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M5 16h30" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M13 5v6M27 5v6" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="20" cy="25" r="3" fill="#c9a96e" />
                </svg>
              </div>
              <h3>Datum</h3>
              <p className="card-highlight">Freitag, 26. Juni 2026</p>
            </div>
            <div className="card card--glass">
              <div className="card-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="15" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M20 12v9l6 4" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Uhrzeit</h3>
              <p className="card-highlight">11:00 Uhr</p>
              <p className="card-sub">Trauung</p>
            </div>
            <div className="card card--glass">
              <div className="card-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4C13 4 6 10 6 18c0 10 14 18 14 18s14-8 14-18c0-8-7-14-14-14z" stroke="#8b7355" strokeWidth="1.5" />
                  <circle cx="20" cy="17" r="5" stroke="#c9a96e" strokeWidth="1.5" />
                </svg>
              </div>
              <h3>Ort</h3>
              <p className="card-highlight">Gemeindeamt Mauterndorf</p>
              <p className="card-sub">Markt 52, 5570 Mauterndorf</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="ablauf" className="section section--cream">
        <div className="container">
          <div className="section-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#8b7355" strokeWidth="1.5" />
              <path d="M24 12v13l8 5" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="section-title">Ablauf des Tages</h2>
          <p className="section-subtitle">So stellen wir uns unseren großen Tag vor</p>

          <div className="timeline">
            {[
              { time: '10:30', title: 'Ankommen & Willkommen', desc: 'Ankunft der Gäste am Gemeindeamt Mauterndorf. Zeit zum Ankommen, Begrüßen und Platznehmen.' },
              { time: '11:00', title: 'Trauung', desc: 'Die standesamtliche Trauung – der feierliche Höhepunkt unseres Tages.' },
              { time: '11:45', title: 'Sektempfang & Gratulation', desc: 'Stoßt mit uns an! Bei Sekt und kleinen Häppchen feiern wir gemeinsam den Beginn unseres neuen Lebensabschnitts.' },
              { time: '13:00', title: 'Festessen', desc: 'Gemeinsames Mittagessen auf der Oberfeldalm am Grosseck/Speiereck – genießt regionale Köstlichkeiten in urigem Almambiente mit Bergpanorama.' },
              { time: '15:00', title: 'Kaffee & Kuchen', desc: 'Die Hochzeitstorte wird angeschnitten! Dazu gibt es Kaffee, Kuchen und süße Leckereien.' },
              { time: '17:00', title: 'Spiele & Überraschungen', desc: 'Freie Zeit für Hochzeitsspiele, Fotos und besondere Momente miteinander.' },
              { time: '19:00', title: 'Abendessen & Feier', desc: 'Das Abendprogramm beginnt – mit gutem Essen, Musik, Tanz und Fröhlichkeit bis in die Nacht.' },
            ].map((item: { time: string; title: string; desc: string }, i: number) => (
              <div key={i} className="timeline-item">
                <div className="timeline-time">{item?.time ?? ''}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3>{item?.title ?? ''}</h3>
                  <p>{item?.desc ?? ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Divider - Oberfeldalm */}
      <div className="image-divider">
        <div
          ref={dividerBgRef}
          className="image-divider-bg"
          style={{ backgroundImage: "url('/images/06_oberfeldalm.jpg')" }}
        />
        <div className="image-divider-overlay" />
        <div className="image-divider-text">
          <p className="script-text">Oberfeldalm am Grosseck/Speiereck – hier wird gefeiert!</p>
        </div>
      </div>

      {/* Important Addresses */}
      <section id="adressen" className="section section--white">
        <div className="container">
          <div className="section-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C16 4 9 10 9 20c0 14 15 24 15 24s15-10 15-24c0-10-7-16-15-16z" stroke="#8b7355" strokeWidth="1.5" />
              <circle cx="24" cy="19" r="6" stroke="#c9a96e" strokeWidth="1.5" />
            </svg>
          </div>
          <h2 className="section-title">Wichtige Adressen</h2>
          <p className="section-subtitle">Alles, was ihr für die Anreise braucht</p>

          <div className="address-grid">
            <div className="address-card">
              <div className="address-card-header">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 24V8a2 2 0 012-2h16a2 2 0 012 2v16" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M4 24h20M10 6V4M18 6V4M9 12h10M9 16h6" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h3>Trauungsort</h3>
              </div>
              <p className="address-name">Gemeindeamt Mauterndorf</p>
              <p className="address-detail">Markt 52<br />5570 Mauterndorf</p>
              <a
                href="https://maps.google.com/?q=Gemeindeamt+Mauterndorf+Markt+52+5570"
                target="_blank"
                rel="noopener noreferrer"
                className="address-link"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                In Google Maps öffnen
              </a>
            </div>

            <div className="address-card">
              <div className="address-card-header">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="10" width="22" height="14" rx="2" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M3 10l11 7 11-7" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M7 6h14v4H7z" stroke="#8b7355" strokeWidth="1.5" />
                </svg>
                <h3>Parkplätze</h3>
              </div>
              <p className="address-name">Öffentlicher Parkplatz Mauterndorf</p>
              <p className="address-detail">Kostenlose Parkplätze stehen in unmittelbarer Nähe des Gemeindeamts zur Verfügung.</p>
            </div>

            <div className="address-card">
              <div className="address-card-header">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 22h20M6 22V10l8-6 8 6v12" stroke="#8b7355" strokeWidth="1.5" />
                  <rect x="11" y="16" width="6" height="6" stroke="#8b7355" strokeWidth="1.5" />
                </svg>
                <h3>Übernachtung</h3>
              </div>
              <p className="address-name">Unterkünfte in Mauterndorf</p>
              <p className="address-detail">Wir empfehlen, frühzeitig ein Zimmer zu buchen. Einige Vorschläge:</p>
              <ul className="address-list">
                <li>Hotel &amp; Gasthof Neuwirt</li>
                <li>Pension Häuserl im Wald</li>
                <li>Landhaus Rustika</li>
              </ul>
              <p className="address-note">
                Weitere Optionen findet ihr auf{' '}
                <a href="https://www.booking.com/city/at/mauterndorf.html" target="_blank" rel="noopener noreferrer">
                  Booking.com
                </a>
              </p>
            </div>

            <div className="address-card">
              <div className="address-card-header">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="6" stroke="#8b7355" strokeWidth="1.5" />
                  <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#8b7355" strokeWidth="1.5" />
                </svg>
                <h3>Taxi</h3>
              </div>
              <p className="address-name">Taxi-Service Lungau</p>
              <p className="address-detail">Für eine sichere Heimfahrt am Abend empfehlen wir, vorab ein Taxi zu reservieren.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section id="infos" className="section section--sage">
        <div className="container">
          <div className="section-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#8b7355" strokeWidth="1.5" />
              <path d="M24 20v12M24 14v2" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="section-title">Weitere Informationen</h2>
          <p className="section-subtitle">Gut zu wissen</p>

          <div className="info-grid">
            {[
              {
                title: 'Dresscode',
                text: 'Festlich elegant – fühlt euch wohl und feiert mit uns! Bedenkt, dass Teile der Feier im Freien stattfinden können.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M8 28V12a2 2 0 012-2h16a2 2 0 012 2v16" stroke="#8b7355" strokeWidth="1.5" />
                    <path d="M14 10V6M22 10V6" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 18h4l2 3 4-8 2 5h4" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: 'Rückmeldung',
                text: (<>Bitte gebt uns bis spätestens <strong>15. Mai 2026</strong> Bescheid, ob ihr dabei seid – per Telefon, Nachricht oder E-Mail.</>),
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M18 6C12 6 6 11 6 18c0 8 12 14 12 14s12-6 12-14c0-7-6-12-12-12z" stroke="#8b7355" strokeWidth="1.5" />
                    <path d="M14 16l3 3 5-6" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: 'Kontakt',
                text: (<>Bei Fragen erreicht ihr uns jederzeit:<br /><strong>E-Mail:</strong> <a href="mailto:hochzeit@example.com">hochzeit@example.com</a><br /><strong>Telefon:</strong> <a href="tel:+43000000000">+43 (0) 000 000 000</a></>),
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect x="5" y="10" width="26" height="18" rx="2" stroke="#8b7355" strokeWidth="1.5" />
                    <path d="M5 14l13 8 13-8" stroke="#8b7355" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: 'Geschenke',
                text: 'Die größte Freude ist uns eure Anwesenheit! Wer uns dennoch etwas schenken möchte – über einen Beitrag zu unserer Hochzeitsreise freuen wir uns sehr.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect x="8" y="4" width="20" height="28" rx="3" stroke="#8b7355" strokeWidth="1.5" />
                    <circle cx="18" cy="26" r="2" fill="#c9a96e" />
                    <path d="M14 8h8" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Kinder',
                text: 'Eure Kinder sind herzlich willkommen! Für die kleinen Gäste wird es eine Spielecke geben.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="14" r="5" stroke="#8b7355" strokeWidth="1.5" />
                    <circle cx="10" cy="18" r="3" stroke="#8b7355" strokeWidth="1.2" />
                    <circle cx="26" cy="18" r="3" stroke="#8b7355" strokeWidth="1.2" />
                    <path d="M18 19v4" stroke="#c9a96e" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: 'Anreise',
                text: 'Mauterndorf liegt im wunderschönen Lungau, Salzburger Land. Über die A10 (Tauernautobahn) erreicht ihr uns bequem.',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="12" stroke="#8b7355" strokeWidth="1.5" />
                    <path d="M14 14l4 4-4 4M18 18h6" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((item: any, i: number) => (
              <div key={i} className="info-item">
                <div className="info-icon">{item?.icon}</div>
                <h3>{item?.title ?? ''}</h3>
                <p>{item?.text ?? ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-bg" style={{ backgroundImage: "url('/images/03_wedding_table.jpg')" }} />
        <div className="footer-overlay" />
        <div className="footer-content">
          <p className="footer-script">Wir freuen uns auf euch!</p>
          <div className="footer-divider">
            <svg width="80" height="14" viewBox="0 0 80 14">
              <path d="M0 7 Q20 0 40 7 Q60 14 80 7" stroke="#c9a96e" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <p className="footer-date">26. Juni 2026 · Mauterndorf</p>
          <p className="footer-copy">Mit Liebe gestaltet ❤</p>
        </div>
      </footer>
    </>
  )
}
